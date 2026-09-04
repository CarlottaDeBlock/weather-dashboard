import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGUAGES } from '../i18n/config.js';

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const current = i18n.resolvedLanguage || i18n.language || 'en';

  return (
    <label className="inline-flex items-center gap-2 text-sm">
      <span className="sr-only">{t('controls.languageLabel')}</span>
      <span aria-hidden="true">🌐</span>
      <select
        value={current}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
        aria-label={t('controls.languageLabel')}
        className="rounded-full border border-slate-300 bg-white px-3 py-1.5 font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
      >
        {SUPPORTED_LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </select>
    </label>
  );
}
