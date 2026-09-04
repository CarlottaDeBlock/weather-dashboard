export function Spinner({ label = 'Loading' }) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-3 py-16 text-slate-500 dark:text-slate-400"
      role="status"
      aria-live="polite"
    >
      <span
        className="h-10 w-10 animate-spin rounded-full border-4 border-slate-300 border-t-sky-500 dark:border-slate-700 dark:border-t-sky-400"
        aria-hidden="true"
      />
      <span className="text-sm">{label}…</span>
    </div>
  );
}

export function ErrorState({ title = 'Something went wrong', message, onRetry }) {
  return (
    <div
      className="flex flex-col items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-6 py-12 text-center dark:border-red-900/50 dark:bg-red-950/40"
      role="alert"
    >
      <span className="text-4xl" aria-hidden="true">
        ⚠️
      </span>
      <h2 className="text-lg font-semibold text-red-800 dark:text-red-200">{title}</h2>
      {message && <p className="max-w-sm text-sm text-red-700 dark:text-red-300">{message}</p>}
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 focus-visible:outline-red-600"
        >
          Try again
        </button>
      )}
    </div>
  );
}

export function EmptyState({ title, message, icon = '🔎' }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-slate-300 px-6 py-16 text-center dark:border-slate-700">
      <span className="text-4xl" aria-hidden="true">
        {icon}
      </span>
      <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-200">{title}</h2>
      {message && <p className="max-w-sm text-sm text-slate-500 dark:text-slate-400">{message}</p>}
    </div>
  );
}
