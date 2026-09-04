import { useSettings, favouriteKey } from '../context/SettingsContext.jsx';
import { formatLocationName } from '../lib/format.js';

/** Horizontal list of saved cities; clicking one loads its weather. */
export function FavouritesBar({ selectedPlace, onSelect }) {
  const { favourites, removeFavourite } = useSettings();

  if (!favourites.length) {
    return (
      <p className="text-sm text-slate-500 dark:text-slate-400">
        No favourites yet — search for a city and tap the star to save it.
      </p>
    );
  }

  return (
    <ul className="flex flex-wrap gap-2" aria-label="Favourite cities">
      {favourites.map((place) => {
        const active = selectedPlace && favouriteKey(selectedPlace) === favouriteKey(place);
        return (
          <li key={favouriteKey(place)}>
            <div
              className={`flex items-center gap-1 rounded-full border px-1 py-0.5 text-sm transition ${
                active
                  ? 'border-sky-400 bg-sky-50 dark:bg-sky-950/40'
                  : 'border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-900'
              }`}
            >
              <button
                type="button"
                onClick={() => onSelect(place)}
                className="rounded-full px-2 py-1"
                title={formatLocationName(place)}
              >
                {place.name}
              </button>
              <button
                type="button"
                onClick={() => removeFavourite(place)}
                aria-label={`Remove ${place.name} from favourites`}
                className="rounded-full px-1.5 text-slate-400 hover:text-red-500"
              >
                ×
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
