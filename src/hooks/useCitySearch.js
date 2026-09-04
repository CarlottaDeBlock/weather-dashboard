import { useEffect, useState } from 'react';
import { searchCities } from '../api/openMeteo.js';
import { useDebouncedValue } from './useDebouncedValue.js';

/** Debounced city autocomplete backed by the Open-Meteo geocoding API. */
export function useCitySearch(query) {
  const debouncedQuery = useDebouncedValue(query, 350);
  const [state, setState] = useState({ status: 'idle', results: [], error: null });

  useEffect(() => {
    const trimmed = debouncedQuery.trim();
    if (trimmed.length < 2) {
      setState({ status: 'idle', results: [], error: null });
      return;
    }

    const controller = new AbortController();
    setState((s) => ({ ...s, status: 'loading', error: null }));

    searchCities(trimmed, { signal: controller.signal })
      .then((results) => {
        setState({
          status: results.length ? 'success' : 'empty',
          results,
          error: null,
        });
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setState({ status: 'error', results: [], error: err.message });
      });

    return () => controller.abort();
  }, [debouncedQuery]);

  return state;
}
