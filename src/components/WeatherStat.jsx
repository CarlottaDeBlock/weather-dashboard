/** A single labelled metric tile (humidity, wind, pressure, …). */
export function WeatherStat({ icon, label, value, hint }) {
  return (
    <div className="rounded-xl bg-white/70 p-4 dark:bg-slate-800/60">
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
        <span aria-hidden="true">{icon}</span>
        {label}
      </div>
      <div className="mt-1 text-xl font-semibold text-slate-900 dark:text-slate-50">{value}</div>
      {hint && <div className="text-xs text-slate-400">{hint}</div>}
    </div>
  );
}
