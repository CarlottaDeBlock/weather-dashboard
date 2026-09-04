import { useTranslation } from 'react-i18next';
import { UnitToggle } from './UnitToggle.jsx';
import { LanguageSwitcher } from './LanguageSwitcher.jsx';

export function Header() {
  const { t } = useTranslation();

  return (
    <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2">
        <span className="text-2xl" aria-hidden="true">
          ⛅
        </span>
        <h1 className="text-xl font-bold tracking-tight">{t('app.title')}</h1>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <LanguageSwitcher />
        <UnitToggle />
      </div>
    </header>
  );
}
