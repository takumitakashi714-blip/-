import { Suspense, useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { MUSCLE_MESH_PATTERNS } from '../data/muscleGroups'
import type { MuscleKey } from '../data/muscleGroups'

const MODEL_URL = `${import.meta.env.BASE_URL}anatomy.glb`

const PRIMARY_EMISSIVE = new THREE.Color('#ff2b1a')
const SECONDARY_EMISSIVE = new THREE.Color('#ff8a3d')

type Highlight = 'primary' | 'secondary'

function muscleKeyForMesh(name: string): MuscleKey | null {
  const normalized = name.toLowerCase().replace(/_/g, ' ')
  for (const key of Object.keys(MUSCLE_MESH_PATTERNS) as MuscleKey[]) {
    if (MUSCLE_MESH_PATTERNS[key].some((pattern) => normalized.includes(pattern))) return key
  }
  return null
}

function AnatomyScene({ primary, secondary }: { primary: MuscleKey[]; secondary: MuscleKey[] }) {
  const { scene } = useGLTF(MODEL_URL)
  const { camera } = useThree()
  const controlsRef = useRef<OrbitControlsImpl>(null)
  const fittedRef = useRef(false)

  // Each mesh's material may be shared across many of the 467 parts, so clone
  // per mesh before mutating emissive — otherwise highlighting one muscle
  // would light up everything sharing that material.
  useMemo(() => {
    scene.traverse((obj) => {
      const mesh = obj as THREE.Mesh
      if (!mesh.isMesh || !mesh.material) return
      const mat = (mesh.material as THREE.MeshStandardMaterial).clone()
      // Flatten the glossy "wet tissue" look of the raw medical asset into
      // something closer to an illustration — less unsettling in a fitness
      // app than a literally skinned, shiny muscle surface.
      mat.roughness = Math.max(mat.roughness, 0.75)
      mat.metalness = 0
      mesh.userData.baseEmissive = mat.emissive.clone()
      mesh.userData.baseEmissiveIntensity = mat.emissiveIntensity
      mesh.material = mat
    })
  }, [scene])

  const highlighted = useMemo(() => {
    const entries: { mesh: THREE.Mesh; level: Highlight }[] = []
    scene.traverse((obj) => {
      const mesh = obj as THREE.Mesh
      if (!mesh.isMesh) return
      const key = muscleKeyForMesh(mesh.name)
      if (!key) return
      if (primary.includes(key)) entries.push({ mesh, level: 'primary' })
      else if (secondary.includes(key)) entries.push({ mesh, level: 'secondary' })
    })
    return entries
  }, [scene, primary, secondary])

  useEffect(() => {
    scene.traverse((obj) => {
      const mesh = obj as THREE.Mesh
      if (!mesh.isMesh) return
      const mat = mesh.material as THREE.MeshStandardMaterial
      const base = mesh.userData.baseEmissive as THREE.Color | undefined
      if (base) mat.emissive.copy(base)
      mat.emissiveIntensity = (mesh.userData.baseEmissiveIntensity as number) ?? 0
    })
    for (const { mesh, level } of highlighted) {
      const mat = mesh.material as THREE.MeshStandardMaterial
      mat.emissive.copy(level === 'primary' ? PRIMARY_EMISSIVE : SECONDARY_EMISSIVE)
    }
  }, [scene, highlighted])

  useFrame(({ clock }) => {
    // Fit the camera to the model on the first real render frame, once the
    // GLTF's node transforms have actually propagated through the scene
    // graph — computing this in a mount effect is too early (matrixWorld is
    // still stale) and produces a camera stuck inside the geometry.
    if (!fittedRef.current && controlsRef.current) {
      // The source model is Z-up (its standing height runs along Z, not Y),
      // so rotate it onto the standard Y-up/Z-forward axes Three.js cameras
      // expect — otherwise the camera ends up staring straight down the
      // body's long axis instead of across it.
      scene.rotation.x = -Math.PI / 2
      scene.updateMatrixWorld(true)

      // Hide parts that read as unsettling rather than informative.
      // Note: we deliberately do NOT crop the head by height — doing so
      // leaves a hollow neck cavity that the deep spinal/neck muscles poke
      // through from behind, which looks worse than the face. Instead we
      // remove only the thin facial-expression muscles (eyes/mouth), while
      // leaving the jaw muscles (temporalis/masseter) to keep the head's
      // shape recognizable, plus the hand/foot/digit tendons — including
      // ones that physically belong to the forearm/shin (e.g. "flexor
      // digitorum") — whose long thin strands fan out into finger/toe claws.
      const DIGIT_PATTERNS = [
        'digiti',
        'digitorum',
        'pollicis',
        'hallucis',
        'palmaris',
        'lumbrical',
        'interosse',
        'carpi',
        'retinaculum',
        'palmar',
        'plantar',
        'calcaneal',
        'opponens',
        'of left hand',
        'of right hand',
        'of left foot',
        'of right foot',
      ]
      const FACE_PATTERNS = [
        'frontalis',
        'orbicularis',
        'zygomaticus',
        'levator labii',
        'depressor labii',
        'depressor anguli',
        'risorius',
        'mentalis',
        'procerus',
        'nasalis',
        'corrugator',
        'buccinator',
        'levator anguli',
      ]
      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh
        if (!mesh.isMesh) return
        const normalized = mesh.name.toLowerCase().replace(/_/g, ' ')
        if (
          DIGIT_PATTERNS.some((pattern) => normalized.includes(pattern)) ||
          FACE_PATTERNS.some((pattern) => normalized.includes(pattern))
        ) {
          mesh.visible = false
        }
      })

      // Re-measure from only what's still visible so the camera frames the
      // trimmed body tightly.
      const box = new THREE.Box3()
      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh
        if (mesh.isMesh && mesh.visible) box.expandByObject(mesh)
      })
      const center = box.getCenter(new THREE.Vector3())
      const size = box.getSize(new THREE.Vector3())

      const persp = camera as THREE.PerspectiveCamera
      const fov = (persp.fov * Math.PI) / 180
      const dist = (Math.max(size.y, size.x) / 2 / Math.tan(fov / 2)) * 1.35
      camera.position.set(center.x, center.y, center.z + dist)
      persp.near = Math.max(dist / 100, 0.01)
      persp.far = dist * 10
      persp.updateProjectionMatrix()
      controlsRef.current.target.copy(center)
      controlsRef.current.update()
      fittedRef.current = true
    }

    if (highlighted.length === 0) return
    const pulse = 0.5 + Math.sin(clock.elapsedTime * 3) * 0.5
    for (const { mesh, level } of highlighted) {
      const mat = mesh.material as THREE.MeshStandardMaterial
      mat.emissiveIntensity = level === 'primary' ? 0.8 + pulse * 1.0 : 0.3 + pulse * 0.4
    }
  })

  return (
    <>
      <primitive object={scene} />
      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        enableDamping
        dampingFactor={0.1}
        autoRotate
        autoRotateSpeed={1.1}
        minPolarAngle={0.15}
        maxPolarAngle={Math.PI - 0.15}
      />
    </>
  )
}

export function MuscleBody3D({
  primary,
  secondary = [],
}: {
  primary: MuscleKey[]
  secondary?: MuscleKey[]
}) {
  return (
    <Canvas camera={{ position: [0, 0, 1000], fov: 32 }} dpr={[1, 2]}>
      <ambientLight intensity={0.85} />
      <directionalLight position={[300, 500, 400]} intensity={1.2} />
      <directionalLight position={[-300, 100, -400]} intensity={0.4} />
      <Suspense fallback={null}>
        <AnatomyScene primary={primary} secondary={secondary} />
      </Suspense>
    </Canvas>
  )
}

useGLTF.preload(MODEL_URL)
