import { UnitToggle } from './UnitToggle.jsx';

export function Header() {
  return (
    <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2">
        <span className="text-2xl" aria-hidden="true">
          ⛅
        </span>
        <h1 className="text-xl font-bold tracking-tight">Weather Dashboard</h1>
      </div>
      <UnitToggle />
    </header>
  );
}
