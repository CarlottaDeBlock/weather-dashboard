import { useEffect, useId, useRef, useState } from 'react';
import { useCitySearch } from '../hooks/useCitySearch.js';
import { formatLocationName } from '../lib/format.js';

export function SearchBar({ onSelect }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef(null);
  const listboxId = useId();

  const { status, results, error } = useCitySearch(query);

  useEffect(() => setActiveIndex(-1), [results]);

  useEffect(() => {
    function onClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  function choose(place) {
    onSelect(place);
    setQuery('');
    setOpen(false);
  }

  function onKeyDown(e) {
    if (!open || !results.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      choose(results[activeIndex]);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  }

  const showDropdown = open && query.trim().length >= 2;

  return (
    <div ref={containerRef} className="relative w-full">
      <label htmlFor="city-search" className="sr-only">
        Search for a city
      </label>
      <div className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 shadow-sm focus-within:border-sky-400 dark:border-slate-700 dark:bg-slate-900">
        <span aria-hidden="true" className="text-slate-400">
          🔍
        </span>
        <input
          id="city-search"
          type="text"
          role="combobox"
          autoComplete="off"
          aria-expanded={showDropdown}
          aria-controls={listboxId}
          aria-activedescendant={activeIndex >= 0 ? `${listboxId}-opt-${activeIndex}` : undefined}
          placeholder="Search for a city…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
        />
        {status === 'loading' && (
          <span className="text-xs text-slate-400" role="status">
            …
          </span>
        )}
      </div>

      {showDropdown && (
        <ul
          id={listboxId}
          role="listbox"
          className="absolute z-20 mt-1 max-h-72 w-full overflow-auto rounded-xl border border-slate-200 bg-white py-1 shadow-lg dark:border-slate-700 dark:bg-slate-900"
        >
          {status === 'error' && (
            <li className="px-3 py-2 text-sm text-red-600 dark:text-red-400">{error}</li>
          )}
          {status === 'empty' && (
            <li className="px-3 py-2 text-sm text-slate-500">No cities match “{query}”.</li>
          )}
          {results.map((place, i) => (
            <li
              key={place.id ?? `${place.latitude},${place.longitude}`}
              id={`${listboxId}-opt-${i}`}
              role="option"
              aria-selected={i === activeIndex}
            >
              <button
                type="button"
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => choose(place)}
                className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition ${
                  i === activeIndex ? 'bg-sky-50 dark:bg-sky-950/40' : ''
                }`}
              >
                <span aria-hidden="true">📍</span>
                <span className="truncate">{formatLocationName(place)}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
