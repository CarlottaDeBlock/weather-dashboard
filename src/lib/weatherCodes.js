const ICONS = {
  0: { day: '☀️', night: '🌙' },
  1: { day: '🌤️', night: '🌙' },
  2: { day: '⛅', night: '☁️' },
  3: { day: '☁️', night: '☁️' },
  45: { day: '🌫️', night: '🌫️' },
  48: { day: '🌫️', night: '🌫️' },
  51: { day: '🌦️', night: '🌧️' },
  53: { day: '🌦️', night: '🌧️' },
  55: { day: '🌧️', night: '🌧️' },
  56: { day: '🌧️', night: '🌧️' },
  57: { day: '🌧️', night: '🌧️' },
  61: { day: '🌦️', night: '🌧️' },
  63: { day: '🌧️', night: '🌧️' },
  65: { day: '🌧️', night: '🌧️' },
  66: { day: '🌧️', night: '🌧️' },
  67: { day: '🌧️', night: '🌧️' },
  71: { day: '🌨️', night: '🌨️' },
  73: { day: '🌨️', night: '🌨️' },
  75: { day: '❄️', night: '❄️' },
  77: { day: '🌨️', night: '🌨️' },
  80: { day: '🌦️', night: '🌧️' },
  81: { day: '🌧️', night: '🌧️' },
  82: { day: '⛈️', night: '⛈️' },
  85: { day: '🌨️', night: '🌨️' },
  86: { day: '❄️', night: '❄️' },
  95: { day: '⛈️', night: '⛈️' },
  96: { day: '⛈️', night: '⛈️' },
  99: { day: '⛈️', night: '⛈️' },
};

export function weatherIcon(code, isDay = true) {
  const entry = ICONS[code];
  if (!entry) return '❓';
  return isDay ? entry.day : entry.night;
}

export function weatherLabelKey(code) {
  return ICONS[code] ? `wmo.${code}` : 'wmo.unknown';
}
