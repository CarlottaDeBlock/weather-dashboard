import i18n from '../i18n/config.js';

// Date/time strings follow the active UI language (weekday names, AM/PM…).
function activeLocale() {
  return i18n.resolvedLanguage || i18n.language || 'en';
}

export function cToF(celsius) {
  return (celsius * 9) / 5 + 32;
}

export function formatTemperature(celsius, unit = 'celsius', { withDegree = true } = {}) {
  if (celsius == null || Number.isNaN(celsius)) return '--';
  const value = unit === 'fahrenheit' ? cToF(celsius) : celsius;
  const rounded = Math.round(value);
  return withDegree ? `${rounded}°${unit === 'fahrenheit' ? 'F' : 'C'}` : `${rounded}°`;
}

export function formatWind(kmh, unit = 'celsius') {
  if (kmh == null) return '--';
  if (unit === 'fahrenheit') return `${Math.round(kmh / 1.609)} mph`;
  return `${Math.round(kmh)} km/h`;
}

export function windDirection(degrees) {
  if (degrees == null) return '';
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return dirs[Math.round(degrees / 45) % 8];
}

export function formatTime(iso, timezone) {
  if (!iso) return '--';
  try {
    return new Date(iso).toLocaleTimeString(activeLocale(), {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: timezone || undefined,
    });
  } catch {
    return '--';
  }
}

export function formatDay(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString(activeLocale(), { weekday: 'short' });
}

export function formatLocationName(place) {
  if (!place) return '';
  return [place.name, place.admin1, place.country]
    .filter(Boolean)
    .filter((part, i, arr) => arr.indexOf(part) === i)
    .join(', ');
}
