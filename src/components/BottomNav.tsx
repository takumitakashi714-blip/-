import { NavLink } from 'react-router-dom'

const TABS = [
  { to: '/', label: '記録', icon: '📝', end: true },
  { to: '/routines', label: 'メニュー', icon: '📋', end: false },
  { to: '/history', label: '履歴', icon: '📈', end: false },
  { to: '/body', label: '体重', icon: '⚖️', end: false },
  { to: '/muscles', label: '部位', icon: '💪', end: false },
]

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 inset-x-0 border-t border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur pb-[env(safe-area-inset-bottom)]">
      <ul className="flex justify-around">
        {TABS.map((tab) => (
          <li key={tab.to} className="flex-1">
            <NavLink
              to={tab.to}
              end={tab.end}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 py-2 text-xs ${
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                    : 'text-gray-500 dark:text-gray-400'
                }`
              }
            >
              <span className="text-lg leading-none">{tab.icon}</span>
              {tab.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
