export function PageHeader({ title }: { title: string }) {
  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur px-4 py-3">
      <h1 className="text-lg font-bold text-gray-900 dark:text-gray-50">{title}</h1>
    </header>
  )
}
