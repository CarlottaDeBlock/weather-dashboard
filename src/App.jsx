import { useEffect, useState } from 'react';
import { Header } from './components/Header.jsx';
import { SearchBar } from './components/SearchBar.jsx';
import { FavouritesBar } from './components/FavouritesBar.jsx';
import { WeatherPanel } from './components/WeatherPanel.jsx';
import { useSettings } from './context/SettingsContext.jsx';
import { useLocalStorage } from './hooks/useLocalStorage.js';

const DEFAULT_PLACE = {
  id: 2950159,
  name: 'Berlin',
  latitude: 52.52437,
  longitude: 13.41053,
  country: 'Germany',
  countryCode: 'DE',
  admin1: 'Berlin',
  timezone: 'Europe/Berlin',
};

export default function App() {
  const { favourites } = useSettings();
  // Remember the last viewed city across refreshes too.
  const [selectedPlace, setSelectedPlace] = useLocalStorage('weather:lastPlace', null);

  // On first load, fall back to a favourite or a sensible default.
  useEffect(() => {
    if (!selectedPlace) {
      setSelectedPlace(favourites[0] ?? DEFAULT_PLACE);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mx-auto flex min-h-screen max-w-4xl flex-col gap-6 px-4 py-6 sm:py-10">
      <Header />

      <div className="flex flex-col gap-3">
        <SearchBar onSelect={setSelectedPlace} />
        <FavouritesBar selectedPlace={selectedPlace} onSelect={setSelectedPlace} />
      </div>

      <main className="flex-1">
        <WeatherPanel place={selectedPlace} />
      </main>

      <footer className="pt-4 text-center text-xs text-slate-400">
        Data from{' '}
        <a
          href="https://open-meteo.com/"
          target="_blank"
          rel="noreferrer"
          className="underline hover:text-slate-600 dark:hover:text-slate-200"
        >
          Open-Meteo
        </a>
        . Built with React, Vite &amp; Tailwind CSS.
      </footer>
    </div>
  );
}
