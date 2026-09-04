import { useTranslation } from 'react-i18next';
import { useSettings } from '../context/SettingsContext.jsx';
import { formatTemperature, formatTime, formatWind, windDirection } from '../lib/format.js';
import { WeatherStat } from './WeatherStat.jsx';

export function WeatherStatsGrid({ weather, className = '' }) {
  const { unit } = useSettings();
  const { t } = useTranslation();
  const { current, today, timezone } = weather;

  const stats = [
    {
      id: 'feelsLike',
      icon: '🌡️',
      label: t('stats.feelsLike'),
      value: formatTemperature(current.apparentTemperature, unit),
    },
    {
      id: 'humidity',
      icon: '💧',
      label: t('stats.humidity'),
      value: `${Math.round(current.humidity)}%`,
    },
    {
      id: 'wind',
      icon: '💨',
      label: t('stats.wind'),
      value: formatWind(current.windSpeed, unit),
      hint: t('stats.windHint', {
        direction: windDirection(current.windDirection),
        gusts: formatWind(current.windGusts, unit),
      }),
    },
    {
      id: 'precipitation',
      icon: '🌧️',
      label: t('stats.precipitation'),
      value: `${current.precipitation ?? 0} mm`,
    },
    {
      id: 'cloudCover',
      icon: '☁️',
      label: t('stats.cloudCover'),
      value: `${Math.round(current.cloudCover)}%`,
    },
    {
      id: 'pressure',
      icon: '📊',
      label: t('stats.pressure'),
      value: `${Math.round(current.pressure)} hPa`,
    },
    {
      id: 'uvIndex',
      icon: '🔆',
      label: t('stats.uvIndex'),
      value: today.uvIndexMax != null ? Math.round(today.uvIndexMax) : '--',
    },
    {
      id: 'sun',
      icon: '🌅',
      label: t('stats.sun'),
      value: `${formatTime(today.sunrise, timezone)} / ${formatTime(today.sunset, timezone)}`,
    },
  ];

  return (
    <div
      className={`grid h-full auto-rows-fr grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-2 ${className}`}
    >
      {stats.map(({ id, ...rest }) => (
        <WeatherStat key={id} {...rest} />
      ))}
    </div>
  );
}
