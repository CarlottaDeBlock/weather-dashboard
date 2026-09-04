# Weather Dashboard

A frontend-only weather dashboard built with **React + Vite + Tailwind CSS**.
Pick a city, view its current conditions and a short outlook, switch between
Celsius and Fahrenheit, and save cities to your favourites. Favourites, the
chosen unit and the last viewed city are all persisted across page refreshes.

Weather data comes from the free, key-less [Open-Meteo](https://open-meteo.com/)
API (geocoding + forecast). No backend, no API key, no sign-up.

## Features

- **City search** with debounced autocomplete (keyboard navigable).
- **Current conditions**: temperature, "feels like", condition + icon, high/low,
  humidity, wind (speed, direction, gusts), precipitation, cloud cover,
  pressure, UV index, sunrise/sunset.
- **5-day outlook**.
- **°C / °F toggle** — conversion is done client-side, so switching units never
  refetches.
- **Multi-language UI** (English, Dutch, French, German) via `react-i18next`.
  Weekday/time formatting and the city-search results follow the chosen
  language too.
- **Favourites** — add/remove cities, jump between them from the favourites bar.
- **Persistence** via `localStorage` (unit, language, favourites, last city),
  synced across tabs.
- **Loading & error states** — spinner while loading, friendly messages for
  "city not found", network failures and API errors, with a retry button.
- **Responsive** layout (mobile → desktop) and **dark mode** (follows the OS).
- Accessibility: labelled controls, `aria-live` status regions, focus-visible
  rings, an ARIA combobox for search.

## Getting started

Requirements: **Node.js 18+** and **[pnpm](https://pnpm.io/installation)**
(`npm install -g pnpm`, or `corepack enable`).

```bash
# 1. Install dependencies
pnpm install

# 2. Start the dev server (http://localhost:5173)
pnpm dev

# 3. Production build + local preview
pnpm build
pnpm preview
```

## Project structure

The app is deliberately split into small, focused pieces rather than one large
component:

```
src/
├── api/
│   └── openMeteo.js          # API layer: geocoding + forecast, error normalisation
├── i18n/
│   ├── config.js             # i18next init, language list, <html lang> sync
│   └── locales/              # en / nl / fr / de translation dictionaries
├── context/
│   └── SettingsContext.jsx   # unit + favourites, persisted (shared app state)
├── hooks/
│   ├── useLocalStorage.js    # state mirrored to localStorage (+ cross-tab sync)
│   ├── useDebouncedValue.js  # generic debounce
│   ├── useCitySearch.js      # debounced geocoding search (language-aware)
│   └── useWeather.js         # loads weather for a place, exposes status + refresh
├── lib/
│   ├── format.js             # pure formatting/unit-conversion helpers
│   └── weatherCodes.js       # WMO weather-code → icon (labels live in i18n)
├── components/
│   ├── Header.jsx            # title + LanguageSwitcher + UnitToggle
│   ├── LanguageSwitcher.jsx  # language dropdown
│   ├── UnitToggle.jsx        # °C / °F segmented control
│   ├── SearchBar.jsx         # combobox + autocomplete dropdown
│   ├── FavouritesBar.jsx     # saved cities
│   ├── FavouriteButton.jsx   # star toggle
│   ├── WeatherPanel.jsx      # owns the request, switches loading/error/success
│   ├── CurrentWeather.jsx    # hero card
│   ├── WeatherStatsGrid.jsx  # secondary metrics grid
│   ├── WeatherStat.jsx       # single metric tile
│   ├── DailyForecast.jsx     # multi-day outlook
│   ├── WeatherIcon.jsx       # accessible emoji glyph
│   └── StatusMessage.jsx     # Spinner / ErrorState / EmptyState
├── App.jsx                   # layout + selected-city state
└── main.jsx                  # entry, wraps app in SettingsProvider
```

### Design notes

- **Separation of concerns**: network code lives in `api/`, cross-cutting state
  in `context/`, reusable logic in `hooks/`, pure helpers in `lib/`, and the UI
  is composed from presentational components. `App.jsx` only wires things
  together and holds the "which city is selected" state.
- **Unit handling**: all data is fetched in metric units and converted in
  `lib/format.js`. The toggle is instant and offline-safe.
- **State ownership**: `WeatherPanel` owns the fetch for the current place;
  `SettingsContext` owns unit + favourites; `i18n` owns the language (persisted
  by `i18next-browser-languagedetector`).
- **i18n**: components read copy with the `useTranslation` hook; weather-code
  labels are keyed by code in the dictionaries; API errors carry a `code` that
  maps to a translated message.

## Tech

React 18, Vite 5, Tailwind CSS 3, react-i18next, Open-Meteo API.
