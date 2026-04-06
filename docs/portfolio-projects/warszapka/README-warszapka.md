# Warszapka

A location-based city exploration game for Warsaw, built with React Native and Expo. Players discover parks and historical monuments across Warsaw's 18 districts, check in to locations, and earn XP points — all on an interactive map.

## What it does

Warszapka turns Warsaw into a game board. Open the app, explore the map, and check in to parks and monuments when you're within 50 meters. Each check-in rewards XP, your visits are tracked, and already-visited places are visually marked on the map. The app supports both anonymous play and Google sign-in for persistent cross-device progress.

## Features

**Map exploration**
- Interactive Google Map of Warsaw with a clean custom style (no transit clutter, no default POIs)
- Smart zoom behavior: zoomed out shows color-coded district boundaries with park counts; zoomed in switches to individual markers
- 264 parks and 1,636 monuments sourced from OpenStreetMap, pre-assigned to districts

**Check-ins**
- GPS-based proximity check (≤50m) before allowing a check-in
- Each place shows a 50m radius circle at high zoom to help users navigate to range
- XP rewards: 100 XP per park, 10 XP per monument
- Anonymous-to-Google account upgrade flow — check-in history is preserved on sign-in

**Profile**
- Google OAuth sign-in via Expo Auth Session + Firebase
- Full check-in history with place names, types, dates, and XP earned
- Running XP total

## Tech stack

| Layer | Technology |
|---|---|
| Framework | React Native 0.81.5 + Expo SDK 54 |
| Language | TypeScript 5.9 |
| Navigation | React Navigation 7 (bottom tabs) |
| State | Zustand 5 (auth, map, check-ins, location) |
| Maps | react-native-maps 1.20 (Google Maps) |
| Auth | Firebase Auth (anonymous + Google OAuth) |
| Database | Firestore (`users/{uid}/checkins/{placeId}`) |
| Location | expo-location (5m threshold, high accuracy) |
| Build | EAS + expo-dev-client |
| Package manager | Bun |

## Architecture highlights

**Viewport culling** — With 1,636 monument markers, rendering everything would kill frame rate. `MonumentLayer` clips to the visible map region plus a 50% buffer, keeping rendering smooth.

**Pre-computed district data** — District assignment (which of Warsaw's 18 districts a place belongs to) is computed once by fetch scripts using a ray-casting point-in-polygon algorithm, then committed as static TypeScript data files. No geometry math runs at startup.

**Layered animations** — Markers fade and slide in when they become visible or when the user crosses the zoom threshold. Animations are batched with `Animated.parallel()` and fire only on layer transitions, not on every re-render.

**Custom geospatial utils** — Haversine distance, point-in-polygon, and circle-to-polygon projection are implemented from scratch (`src/utils/geo.ts`) rather than pulling in a heavy geo library.

**Anonymous-first auth** — Firebase anonymous auth fires immediately on launch so users can explore and check in without signing in. Upgrading to a Google account links credentials and preserves all prior data.

## Screenshots

*(coming soon)*

## Running locally

```bash
bun install
bun run start      # Expo dev server
bun run ios        # iOS simulator
bun run android    # Android emulator
bun run tunnel     # Tunnel mode (required for Google Sign-In on a physical device)
```

Google Maps API key and Firebase config are required (not committed). Data files for parks, monuments, and district polygons are already committed under `src/data/`.
