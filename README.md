# click-mobile quick re-onboarding

This project is an Expo React Native app using Expo Router (file-based navigation) and an Axios service layer.

## Tech stack used here

- Expo SDK `54`
- React Native `0.81`
- React `19`
- Expo Router `6` (entry is `expo-router/entry`)
- Axios for API calls
- Simple Context setup for user state (`UserProvider`)

## How this app is wired

### 1) App entry and navigation

- `package.json` sets `main` to `expo-router/entry`
- Expo Router reads routes from `app/`
- Root layout is `app/_layout.tsx`
  - Wraps app in `UserProvider`
  - Configures root stack
  - Registers `index` and `(signup)` route group

### 2) Route structure

- `app/index.tsx` -> Home screen
- `app/(signup)/_layout.tsx` -> Signup sub-stack
- `app/(signup)/phoneNumberPage.tsx` -> Phone entry screen
- `app/(signup)/emailPage.tsx` -> Email entry screen

Note: in Expo Router, route groups like `(signup)` do not appear in URL paths.

### 3) API/data layer

- `services/api-client.ts`
  - Shared Axios client
  - Base URL currently points to local network backend
- `services/http-service.ts`
  - Generic CRUD wrapper factory (`create("/route")`)
- `services/register-attempt-service.ts`
  - Service instance for `/register-attempt`
- `hooks/useRegisterAttempt.ts`
  - App-level hook that calls service methods

### 4) State layer

- `contexts/UserContext.tsx` defines `user`, `login`, `logout`, `register`
- `hooks/useUser.ts` is a typed guard wrapper around `useContext(UserContext)`

### 5) UI building blocks

- `components/ThemedSafeView.tsx` handles safe-area padding
- `components/ThemedTextInput.tsx` standardized text input styling
- `components/ThemedButton.tsx` standardized button styling
- `constants/Colors.ts` color tokens

## Core flow in this app right now

1. User lands on Home (`app/index.tsx`)
2. Tap button -> `router.navigate("/phoneNumberPage")`
3. Phone screen calls `createRegisterAttempt(phoneNumber)`
4. On success, navigates to `/emailPage`

## Local dev commands

```bash
npm install
npm run start
npm run android
npm run ios
npm run web
```

## Fast way to get productive again (suggested order)

1. Read `app/_layout.tsx` (global setup)
2. Read `app/index.tsx` (first screen + navigation call)
3. Read `app/(signup)/phoneNumberPage.tsx` (form + API call)
4. Read `hooks/useRegisterAttempt.ts` (hook layer)
5. Read `services/http-service.ts` and `services/api-client.ts` (network pattern)

If you only have 20 minutes, do the first three items.

## Copy-ready patterns

### Add a new screen

1. Create `app/(signup)/newScreen.tsx`
2. Export default component
3. Navigate with `router.navigate("/newScreen")`

Minimal screen:

```tsx
import React from "react";
import { Text } from "react-native";
import ThemedSafeView from "../../components/ThemedSafeView";

const NewScreen = () => {
  return (
    <ThemedSafeView>
      <Text>New screen</Text>
    </ThemedSafeView>
  );
};

export default NewScreen;
```

### Add a new API service

1. Create a typed interface for request/response
2. Export `create("/your-route")` from `services/your-service.ts`
3. Consume it from a hook in `hooks/`

Minimal service:

```ts
import create from "./http-service";

export interface ExampleEntity {
  id: number;
  name: string;
}

export default create("/examples");
```

Minimal hook usage:

```ts
import exampleService, { ExampleEntity } from "../services/example-service";

const createExample = async (name: string) => {
  const payload: Omit<ExampleEntity, "id"> = { name };
  return await exampleService.create(payload as ExampleEntity);
};
```

## Common gotchas to remember

- Expo Router paths come from filenames. Rename files carefully.
- Route groups `(group)` are organizational, not path segments.
- Device cannot call `localhost` backend directly; use LAN IP (as currently configured) or tunnel.
- Keep network calls in hooks/services, not directly in many screens.
- Context methods in `UserContext` are TODO placeholders right now.

## Next cleanup tasks (optional but useful)

- Move base URL to env-based config (dev/staging/prod)
- Add loading/error UI state for submit actions
- Type API responses (for example `one_time_code`) instead of using `any`-ish access
- Implement real auth logic in `UserContext`
