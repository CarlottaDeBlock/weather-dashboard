import { useWeather } from '../hooks/useWeather.js';
import { CurrentWeather } from './CurrentWeather.jsx';
import { WeatherStatsGrid } from './WeatherStatsGrid.jsx';
import { DailyForecast } from './DailyForecast.jsx';
import { EmptyState, ErrorState, Spinner } from './StatusMessage.jsx';

export function WeatherPanel({ place }) {
  const { status, data, error, refresh } = useWeather(place);

  if (!place) {
    return (
      <EmptyState
        title="Pick a city to get started"
        message="Search above or choose one of your favourites to see the current conditions."
        icon="🌍"
      />
    );
  }

  if (status === 'loading') return <Spinner label={`Loading weather for ${place.name}`} />;

  if (status === 'error') {
    return (
      <ErrorState
        title="Couldn't load the weather"
        message={error}
        onRetry={refresh}
      />
    );
  }

  if (!data) return <Spinner />;

  return (
    <div className="space-y-6">
      {status === 'refreshing' && (
        <p className="text-xs text-slate-400" role="status">
          Refreshing…
        </p>
      )}
      <div className="flex flex-col gap-6 xl:grid xl:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] xl:items-start">
        <CurrentWeather weather={data} className="xl:col-start-1 xl:row-start-1" />
        <WeatherStatsGrid
          weather={data}
          className="xl:col-start-2 xl:row-start-1 xl:row-span-2"
        />
        <DailyForecast daily={data.daily} className="xl:col-start-1 xl:row-start-2" />
      </div>
    </div>
  );
}
