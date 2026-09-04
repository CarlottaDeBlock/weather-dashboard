// API layer around Open-Meteo

const GEO_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';

export class ApiError extends Error {
  constructor(message, { code } = {}) {
    super(message);
    this.name = 'ApiError';
    this.code = code; 
  }
}

const GEO_LANGUAGES = ['en', 'de', 'fr', 'es', 'it', 'pt', 'ru', 'tr', 'hi'];

export async function searchCities(query, { count = 6, signal, language = 'en' } = {}) {
  const trimmed = query.trim();
  if (!trimmed) return [];
  const lang = GEO_LANGUAGES.includes(language) ? language : 'en';
  const url = `${GEO_URL}?name=${encodeURIComponent(trimmed)}&count=${count}&language=${lang}&format=json`;
  const data = await getJsonWithSignal(url, signal);
  return (data.results ?? []).map(normalisePlace);
}

export async function fetchWeather(place, { signal } = {}) {
  const params = new URLSearchParams({
    latitude: place.latitude,
    longitude: place.longitude,
    timezone: 'auto',
    current: [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'is_day',
      'precipitation',
      'weather_code',
      'cloud_cover',
      'surface_pressure',
      'wind_speed_10m',
      'wind_direction_10m',
      'wind_gusts_10m',
    ].join(','),
    daily: ['weather_code', 'temperature_2m_max', 'temperature_2m_min', 'sunrise', 'sunset', 'uv_index_max'].join(','),
    forecast_days: '5',
  });
  const data = await getJsonWithSignal(`${FORECAST_URL}?${params.toString()}`, signal);
  if (!data.current) {
    throw new ApiError('No weather data available for this location.', { code: 'not_found' });
  }
  return normaliseForecast(data, place);
}

async function getJsonWithSignal(url, signal) {
  let res;
  try {
    res = await fetch(url, { signal });
  } catch (err) {
    if (err.name === 'AbortError') throw err;
    throw new ApiError('Could not reach the weather service. Check your connection.', {
      code: 'network',
    });
  }
  if (!res.ok) throw new ApiError(`Weather service responded with ${res.status}.`, { code: 'server' });
  return res.json();
}

function normalisePlace(r) {
  return {
    id: r.id,
    name: r.name,
    latitude: r.latitude,
    longitude: r.longitude,
    country: r.country,
    countryCode: r.country_code,
    admin1: r.admin1,
    timezone: r.timezone,
  };
}

function normaliseForecast(data, place) {
  const c = data.current;
  const d = data.daily ?? {};
  return {
    place,
    timezone: data.timezone,
    current: {
      time: c.time,
      temperature: c.temperature_2m,
      apparentTemperature: c.apparent_temperature,
      humidity: c.relative_humidity_2m,
      precipitation: c.precipitation,
      weatherCode: c.weather_code,
      isDay: c.is_day === 1,
      cloudCover: c.cloud_cover,
      pressure: c.surface_pressure,
      windSpeed: c.wind_speed_10m,
      windDirection: c.wind_direction_10m,
      windGusts: c.wind_gusts_10m,
    },
    today: {
      tempMax: d.temperature_2m_max?.[0],
      tempMin: d.temperature_2m_min?.[0],
      sunrise: d.sunrise?.[0],
      sunset: d.sunset?.[0],
      uvIndexMax: d.uv_index_max?.[0],
    },
    daily: (d.time ?? []).map((time, i) => ({
      time,
      weatherCode: d.weather_code?.[i],
      tempMax: d.temperature_2m_max?.[i],
      tempMin: d.temperature_2m_min?.[i],
    })),
  };
}
