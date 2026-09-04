// Maps WMO weather interpretation codes (used by Open-Meteo) to a
// human-readable label and an emoji icon. Day/night aware where it matters.
// Reference: https://open-meteo.com/en/docs

const CODES = {
  0: { label: 'Clear sky', day: '☀️', night: '🌙' },
  1: { label: 'Mainly clear', day: '🌤️', night: '🌙' },
  2: { label: 'Partly cloudy', day: '⛅', night: '☁️' },
  3: { label: 'Overcast', day: '☁️', night: '☁️' },
  45: { label: 'Fog', day: '🌫️', night: '🌫️' },
  48: { label: 'Depositing rime fog', day: '🌫️', night: '🌫️' },
  51: { label: 'Light drizzle', day: '🌦️', night: '🌧️' },
  53: { label: 'Moderate drizzle', day: '🌦️', night: '🌧️' },
  55: { label: 'Dense drizzle', day: '🌧️', night: '🌧️' },
  56: { label: 'Light freezing drizzle', day: '🌧️', night: '🌧️' },
  57: { label: 'Dense freezing drizzle', day: '🌧️', night: '🌧️' },
  61: { label: 'Slight rain', day: '🌦️', night: '🌧️' },
  63: { label: 'Moderate rain', day: '🌧️', night: '🌧️' },
  65: { label: 'Heavy rain', day: '🌧️', night: '🌧️' },
  66: { label: 'Light freezing rain', day: '🌧️', night: '🌧️' },
  67: { label: 'Heavy freezing rain', day: '🌧️', night: '🌧️' },
  71: { label: 'Slight snow', day: '🌨️', night: '🌨️' },
  73: { label: 'Moderate snow', day: '🌨️', night: '🌨️' },
  75: { label: 'Heavy snow', day: '❄️', night: '❄️' },
  77: { label: 'Snow grains', day: '🌨️', night: '🌨️' },
  80: { label: 'Slight rain showers', day: '🌦️', night: '🌧️' },
  81: { label: 'Moderate rain showers', day: '🌧️', night: '🌧️' },
  82: { label: 'Violent rain showers', day: '⛈️', night: '⛈️' },
  85: { label: 'Slight snow showers', day: '🌨️', night: '🌨️' },
  86: { label: 'Heavy snow showers', day: '❄️', night: '❄️' },
  95: { label: 'Thunderstorm', day: '⛈️', night: '⛈️' },
  96: { label: 'Thunderstorm with slight hail', day: '⛈️', night: '⛈️' },
  99: { label: 'Thunderstorm with heavy hail', day: '⛈️', night: '⛈️' },
};

const FALLBACK = { label: 'Unknown', day: '❓', night: '❓' };

export function describeWeather(code, isDay = true) {
  const entry = CODES[code] ?? FALLBACK;
  return { label: entry.label, icon: isDay ? entry.day : entry.night };
}
