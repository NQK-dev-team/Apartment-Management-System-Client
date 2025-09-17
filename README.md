# Install Node.js 22.11.0:
https://nodejs.org/en/download or use `nvm`

# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install

#Set Up Environment Variables: Copy the .env.dist file to .env and fill in the necessary environment variables.
cp .env.dist .env
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

<!-- Testing -->
# Testing:
## Unit test:
Config file: `vitest.config.ts`
```bash
# UT run command
npx vitest
```

## E2E test using playwright
Follow this video: https://youtu.be/zksrIRwaVlc?si=hd22AzSH53QiVnkS , `REMEMBER TO NOT OVERWRITE THE CONFIG`
```bash
# E2E test run command
npx playwright codegen
```