import { useSettings } from '../context/SettingsContext.jsx';
import {
  formatTemperature,
  formatTime,
  formatWind,
  windDirection,
} from '../lib/format.js';
import { WeatherStat } from './WeatherStat.jsx';

/** Responsive grid of secondary weather metrics. */
export function WeatherStatsGrid({ weather, className = '' }) {
  const { unit } = useSettings();
  const { current, today, timezone } = weather;

  const stats = [
    {
      icon: '🌡️',
      label: 'Feels like',
      value: formatTemperature(current.apparentTemperature, unit),
    },
    { icon: '💧', label: 'Humidity', value: `${Math.round(current.humidity)}%` },
    {
      icon: '💨',
      label: 'Wind',
      value: formatWind(current.windSpeed, unit),
      hint: `${windDirection(current.windDirection)} · gusts ${formatWind(current.windGusts, unit)}`,
    },
    { icon: '🌧️', label: 'Precipitation', value: `${current.precipitation ?? 0} mm` },
    { icon: '☁️', label: 'Cloud cover', value: `${Math.round(current.cloudCover)}%` },
    { icon: '📊', label: 'Pressure', value: `${Math.round(current.pressure)} hPa` },
    {
      icon: '🔆',
      label: 'UV index',
      value: today.uvIndexMax != null ? Math.round(today.uvIndexMax) : '--',
    },
    {
      icon: '🌅',
      label: 'Sunrise / Sunset',
      value: `${formatTime(today.sunrise, timezone)} / ${formatTime(today.sunset, timezone)}`,
    },
  ];

  return (
    <div
      className={`grid h-full auto-rows-fr grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-2 ${className}`}
    >
      {stats.map((s) => (
        <WeatherStat key={s.label} {...s} />
      ))}
    </div>
  );
}
