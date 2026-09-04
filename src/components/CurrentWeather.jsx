import { useTranslation } from 'react-i18next';
import { useSettings } from '../context/SettingsContext.jsx';
import { weatherLabelKey } from '../lib/weatherCodes.js';
import { formatLocationName, formatTemperature, formatTime } from '../lib/format.js';
import { WeatherIcon } from './WeatherIcon.jsx';
import { FavouriteButton } from './FavouriteButton.jsx';

export function CurrentWeather({ weather, className = '' }) {
  const { unit } = useSettings();
  const { t } = useTranslation();
  const { place, current, today, timezone } = weather;

  return (
    <section
      className={`animate-fade-in flex flex-col rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 p-6 text-white shadow-lg sm:p-8 ${className}`}
      aria-label={t('current.ariaLabel', { city: place.name })}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold">{place.name}</h2>
          <p className="text-sm text-white/80">{formatLocationName(place)}</p>
          <p className="mt-1 text-xs text-white/70">
            {t('current.updated', { time: formatTime(current.time, timezone) })}
          </p>
        </div>
        <FavouriteButton place={place} variant="light" />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
        <WeatherIcon code={current.weatherCode} isDay={current.isDay} className="text-6xl" />
        <div className="text-6xl font-bold tracking-tight">
          {formatTemperature(current.temperature, unit)}
        </div>
        <div className="text-lg text-white/90">{t(weatherLabelKey(current.weatherCode))}</div>
      </div>

      <div className="mt-6 flex flex-wrap gap-x-4 gap-y-1 text-sm text-white/80">
        <span>{t('current.high', { value: formatTemperature(today.tempMax, unit) })}</span>
        <span>{t('current.low', { value: formatTemperature(today.tempMin, unit) })}</span>
        <span>
          {t('stats.feelsLike')} {formatTemperature(current.apparentTemperature, unit)}
        </span>
      </div>
    </section>
  );
}
