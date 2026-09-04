import { useTranslation } from 'react-i18next';
import { useSettings, favouriteKey } from '../context/SettingsContext.jsx';
import { formatLocationName } from '../lib/format.js';

export function FavouritesBar({ selectedPlace, onSelect }) {
  const { favourites, removeFavourite } = useSettings();
  const { t } = useTranslation();

  return (
    <section aria-label={t('favourites.heading')} className="space-y-2">
      <h2 className="flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        <span className="text-amber-500" aria-hidden="true">
          ★
        </span>
        {t('favourites.heading')}
      </h2>

      {favourites.length === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-300 px-3 py-3 text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
          {t('favourites.empty')}
        </p>
      ) : (
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1">
          {favourites.map((place) => {
            const active =
              selectedPlace && favouriteKey(selectedPlace) === favouriteKey(place);
            return (
              <li key={favouriteKey(place)} className="group relative">
                <button
                  type="button"
                  onClick={() => onSelect(place)}
                  aria-current={active ? 'true' : undefined}
                  className={`flex w-full items-center gap-3 rounded-xl border bg-white p-3 pr-9 text-left shadow-sm transition hover:shadow-md dark:bg-slate-900 ${
                    active
                      ? 'border-sky-400 ring-2 ring-sky-400/40'
                      : 'border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600'
                  }`}
                >
                  <span
                    className={`text-lg ${active ? 'text-amber-500' : 'text-amber-400'}`}
                    aria-hidden="true"
                  >
                    ★
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-semibold text-slate-900 dark:text-slate-50">
                      {place.name}
                    </span>
                    <span className="block truncate text-xs text-slate-500 dark:text-slate-400">
                      {[place.admin1, place.country].filter(Boolean).join(', ')}
                    </span>
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => removeFavourite(place)}
                  aria-label={t('favourites.remove', { city: formatLocationName(place) })}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 opacity-100 transition hover:bg-slate-100 hover:text-red-500 focus-visible:opacity-100 dark:hover:bg-slate-800 sm:opacity-0 sm:group-hover:opacity-100"
                >
                  <span aria-hidden="true">✕</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
