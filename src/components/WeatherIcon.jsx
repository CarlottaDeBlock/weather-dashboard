import { describeWeather } from '../lib/weatherCodes.js';

export function WeatherIcon({ code, isDay = true, className = 'text-5xl' }) {
  const { label, icon } = describeWeather(code, isDay);
  return (
    <span role="img" aria-label={label} className={className}>
      {icon}
    </span>
  );
}
