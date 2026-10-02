import { Suspense, lazy } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { BottomNav } from './components/BottomNav'
import { LogPage } from './pages/LogPage'
import { RoutinesPage } from './pages/RoutinesPage'
import { HistoryPage } from './pages/HistoryPage'
import { BodyPage } from './pages/BodyPage'

const MusclePage = lazy(() => import('./pages/MusclePage').then((m) => ({ default: m.MusclePage })))

function App() {
  return (
    <HashRouter>
      <div className="min-h-dvh flex flex-col bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <div className="flex-1 pb-16">
          <Routes>
            <Route path="/" element={<LogPage />} />
            <Route path="/routines" element={<RoutinesPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/body" element={<BodyPage />} />
            <Route
              path="/muscles"
              element={
                <Suspense fallback={<div className="p-4 text-center text-gray-400">読み込み中…</div>}>
                  <MusclePage />
                </Suspense>
              }
            />
          </Routes>
        </div>
        <BottomNav />
      </div>
    </HashRouter>
  )
}

export default App
