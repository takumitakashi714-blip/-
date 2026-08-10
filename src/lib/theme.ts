export function initTheme(): void {
  const root = document.documentElement
  const media = window.matchMedia('(prefers-color-scheme: dark)')

  function computeIsDark(): boolean {
    const stamp = root.getAttribute('data-theme')
    if (stamp === 'dark') return true
    if (stamp === 'light') return false
    return media.matches
  }

  function apply(): void {
    root.classList.toggle('dark', computeIsDark())
  }

  apply()
  media.addEventListener('change', apply)
  new MutationObserver(apply).observe(root, { attributes: true, attributeFilter: ['data-theme'] })
}
