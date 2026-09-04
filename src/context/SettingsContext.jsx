import { createContext, useCallback, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

const SettingsContext = createContext(null);

const UNIT_KEY = 'weather:unit';
const FAVOURITES_KEY = 'weather:favourites';

export function SettingsProvider({ children }) {
  const [unit, setUnit] = useLocalStorage(UNIT_KEY, 'celsius');
  const [favourites, setFavourites] = useLocalStorage(FAVOURITES_KEY, []);

  const toggleUnit = useCallback(
    () => setUnit((u) => (u === 'celsius' ? 'fahrenheit' : 'celsius')),
    [setUnit],
  );

  const isFavourite = useCallback(
    (place) => favourites.some((f) => favouriteKey(f) === favouriteKey(place)),
    [favourites],
  );

  const toggleFavourite = useCallback(
    (place) => {
      if (!place) return;
      setFavourites((list) => {
        const key = favouriteKey(place);
        const exists = list.some((f) => favouriteKey(f) === key);
        if (exists) return list.filter((f) => favouriteKey(f) !== key);
        return [...list, pickFavouriteFields(place)];
      });
    },
    [setFavourites],
  );

  const removeFavourite = useCallback(
    (place) =>
      setFavourites((list) => list.filter((f) => favouriteKey(f) !== favouriteKey(place))),
    [setFavourites],
  );

  const value = useMemo(
    () => ({ unit, setUnit, toggleUnit, favourites, isFavourite, toggleFavourite, removeFavourite }),
    [unit, setUnit, toggleUnit, favourites, isFavourite, toggleFavourite, removeFavourite],
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within a SettingsProvider');
  return ctx;
}

export function favouriteKey(place) {
  if (place?.id != null) return `id:${place.id}`;
  return `geo:${place?.latitude?.toFixed(3)},${place?.longitude?.toFixed(3)}`;
}

function pickFavouriteFields(place) {
  const { id, name, latitude, longitude, country, countryCode, admin1, timezone } = place;
  return { id, name, latitude, longitude, country, countryCode, admin1, timezone };
}
