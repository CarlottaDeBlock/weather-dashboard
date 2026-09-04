import { useSettings } from '../context/SettingsContext.jsx';
import { formatDay, formatTemperature } from '../lib/format.js';
import { WeatherIcon } from './WeatherIcon.jsx';

/** Short multi-day outlook. */
export function DailyForecast({ daily, className = '' }) {
  const { unit } = useSettings();
  if (!daily?.length) return null;

  return (
    <section aria-label="Multi-day forecast" className={className}>
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        Next days
      </h3>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {daily.map((day, i) => (
          <li
            key={day.time}
            className="flex flex-col items-center gap-1 rounded-xl bg-white/70 p-3 dark:bg-slate-800/60"
          >
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {i === 0 ? 'Today' : formatDay(day.time)}
            </span>
            <WeatherIcon code={day.weatherCode} className="text-3xl" />
            <span className="text-sm font-semibold">
              {formatTemperature(day.tempMax, unit, { withDegree: false })}
            </span>
            <span className="text-xs text-slate-400">
              {formatTemperature(day.tempMin, unit, { withDegree: false })}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
