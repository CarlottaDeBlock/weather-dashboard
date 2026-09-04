import { useSettings } from '../context/SettingsContext.jsx';

/** Star toggle that adds/removes the given place from favourites. */
export function FavouriteButton({ place, variant = 'default' }) {
  const { isFavourite, toggleFavourite } = useSettings();
  const active = isFavourite(place);

  const base =
    'inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium transition';
  const styles =
    variant === 'light'
      ? active
        ? 'bg-white text-amber-600'
        : 'bg-white/20 text-white hover:bg-white/30'
      : active
        ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300'
        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300';

  return (
    <button
      type="button"
      onClick={() => toggleFavourite(place)}
      aria-pressed={active}
      className={`${base} ${styles}`}
    >
      <span aria-hidden="true">{active ? '★' : '☆'}</span>
      {active ? 'Favourited' : 'Add to favourites'}
    </button>
  );
}
