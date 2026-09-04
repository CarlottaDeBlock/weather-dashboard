import { useTranslation } from 'react-i18next';
import { useWeather } from '../hooks/useWeather.js';
import { CurrentWeather } from './CurrentWeather.jsx';
import { WeatherStatsGrid } from './WeatherStatsGrid.jsx';
import { DailyForecast } from './DailyForecast.jsx';
import { EmptyState, ErrorState, Spinner } from './StatusMessage.jsx';

export function WeatherPanel({ place }) {
  const { status, data, error, errorCode, refresh } = useWeather(place);
  const { t } = useTranslation();

  if (!place) {
    return (
      <EmptyState
        title={t('empty.pickTitle')}
        message={t('empty.pickMessage')}
        icon="🌍"
      />
    );
  }

  if (status === 'loading') {
    return <Spinner label={t('status.loadingCity', { city: place.name })} />;
  }

  if (status === 'error') {
    return (
      <ErrorState
        title={t('errors.weatherTitle')}
        message={errorCode ? t(`errors.${errorCode}`, { defaultValue: error }) : error}
        retryLabel={t('errors.retry')}
        onRetry={refresh}
      />
    );
  }

  if (!data) return <Spinner label={t('status.loading')} />;

  return (
    <div className="space-y-6">
      {status === 'refreshing' && (
        <p className="text-xs text-slate-400" role="status">
          {t('status.refreshing')}…
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
