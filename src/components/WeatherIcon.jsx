import { describeWeather } from '../lib/weatherCodes.js';

/** Emoji weather glyph with an accessible label. */
export function WeatherIcon({ code, isDay = true, className = 'text-5xl' }) {
  const { label, icon } = describeWeather(code, isDay);
  return (
    <span role="img" aria-label={label} className={className}>
      {icon}
    </span>
  );
}
