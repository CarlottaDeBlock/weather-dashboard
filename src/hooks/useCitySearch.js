import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { searchCities } from '../api/openMeteo.js';
import { useDebouncedValue } from './useDebouncedValue.js';

export function useCitySearch(query) {
  const debouncedQuery = useDebouncedValue(query, 350);
  const { i18n } = useTranslation();
  const language = i18n.resolvedLanguage || i18n.language || 'en';
  const [state, setState] = useState({ status: 'idle', results: [], errorCode: null });

  useEffect(() => {
    const trimmed = debouncedQuery.trim();
    if (trimmed.length < 2) {
      setState({ status: 'idle', results: [], errorCode: null });
      return;
    }

    const controller = new AbortController();
    setState((s) => ({ ...s, status: 'loading', errorCode: null }));

    searchCities(trimmed, { signal: controller.signal, language })
      .then((results) => {
        setState({
          status: results.length ? 'success' : 'empty',
          results,
          errorCode: null,
        });
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setState({ status: 'error', results: [], errorCode: err.code ?? 'network' });
      });

    return () => controller.abort();
  }, [debouncedQuery, language]);

  return state;
}
