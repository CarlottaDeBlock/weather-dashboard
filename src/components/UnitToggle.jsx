import { useSettings } from '../context/SettingsContext.jsx';

export function UnitToggle() {
  const { unit, setUnit } = useSettings();

  return (
    <div
      className="inline-flex rounded-full border border-slate-300 bg-white p-1 text-sm font-medium dark:border-slate-700 dark:bg-slate-900"
      role="group"
      aria-label="Temperature unit"
    >
      {[
        { id: 'celsius', label: '°C' },
        { id: 'fahrenheit', label: '°F' },
      ].map((option) => {
        const active = unit === option.id;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => setUnit(option.id)}
            aria-pressed={active}
            className={`rounded-full px-3 py-1 transition ${
              active
                ? 'bg-sky-500 text-white'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
