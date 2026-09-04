import { useCallback, useEffect, useState } from 'react';
import { fetchWeather } from '../api/openMeteo.js';

export function useWeather(place) {
  const [state, setState] = useState({
    status: place ? 'loading' : 'idle',
    data: null,
    error: null,
    errorCode: null,
  });

  const load = useCallback(
    (signal) => {
      if (!place) {
        setState({ status: 'idle', data: null, error: null, errorCode: null });
        return;
      }
      setState((s) => ({ ...s, status: s.data ? 'refreshing' : 'loading', error: null }));
      fetchWeather(place, { signal })
        .then((data) => setState({ status: 'success', data, error: null, errorCode: null }))
        .catch((err) => {
          if (err.name === 'AbortError') return;
          setState({ status: 'error', data: null, error: err.message, errorCode: err.code ?? null });
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
