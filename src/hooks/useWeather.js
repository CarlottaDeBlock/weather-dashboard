import { useCallback, useEffect, useState } from 'react';
import { fetchWeather } from '../api/openMeteo.js';

/**
 * Loads current weather for the given place and exposes explicit
 * loading / error / success states plus a manual refresh.
 */
export function useWeather(place) {
  const [state, setState] = useState({ status: place ? 'loading' : 'idle', data: null, error: null });

  const load = useCallback(
    (signal) => {
      if (!place) {
        setState({ status: 'idle', data: null, error: null });
        return;
      }
      setState((s) => ({ ...s, status: s.data ? 'refreshing' : 'loading', error: null }));
      fetchWeather(place, { signal })
        .then((data) => setState({ status: 'success', data, error: null }))
        .catch((err) => {
          if (err.name === 'AbortError') return;
          setState({ status: 'error', data: null, error: err.message });
        });
    },
    [place],
  );

  useEffect(() => {
    const controller = new AbortController();
    load(controller.signal);
    return () => controller.abort();
  }, [load]);

  return { ...state, refresh: () => load() };
}
