import { useSettings } from '../context/SettingsContext.jsx';
import { describeWeather } from '../lib/weatherCodes.js';
import { formatLocationName, formatTemperature, formatTime } from '../lib/format.js';
import { WeatherIcon } from './WeatherIcon.jsx';
import { FavouriteButton } from './FavouriteButton.jsx';

/** Hero card: place name, big temperature, condition, favourite toggle. */
export function CurrentWeather({ weather }) {
  const { unit } = useSettings();
  const { place, current, today, timezone } = weather;
  const { label } = describeWeather(current.weatherCode, current.isDay);

  return (
    <section
      className="animate-fade-in rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 p-6 text-white shadow-lg sm:p-8"
      aria-label={`Current weather for ${place.name}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold">{place.name}</h2>
          <p className="text-sm text-white/80">{formatLocationName(place)}</p>
          <p className="mt-1 text-xs text-white/70">
            Updated {formatTime(current.time, timezone)}
          </p>
        </div>
        <FavouriteButton place={place} variant="light" />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
        <WeatherIcon code={current.weatherCode} isDay={current.isDay} className="text-6xl" />
        <div className="text-6xl font-bold tracking-tight">
          {formatTemperature(current.temperature, unit)}
        </div>
        <div className="text-lg text-white/90">{label}</div>
      </div>

      <div className="mt-4 flex gap-4 text-sm text-white/80">
        <span>H: {formatTemperature(today.tempMax, unit)}</span>
        <span>L: {formatTemperature(today.tempMin, unit)}</span>
        <span>Feels like {formatTemperature(current.apparentTemperature, unit)}</span>
      </div>
    </section>
  );
}
