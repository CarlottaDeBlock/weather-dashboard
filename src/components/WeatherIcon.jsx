import { useTranslation } from 'react-i18next';
import { weatherIcon, weatherLabelKey } from '../lib/weatherCodes.js';

export function WeatherIcon({ code, isDay = true, className = 'text-5xl' }) {
  const { t } = useTranslation();
  return (
    <span role="img" aria-label={t(weatherLabelKey(code))} className={className}>
      {weatherIcon(code, isDay)}
    </span>
  );
}
