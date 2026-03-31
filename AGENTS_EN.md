# Granblue Fantasy Chrome Extension Development Guide

## Project Overview

This Chrome extension is developed for the game Granblue Fantasy, providing features such as battle log analysis, drop tracking, party composition, and gacha record keeping.

## Build Commands

- **Development Server**: `pnpm dev`

- **Development Build**: `pnpm ba`

- **Production Build**: `pnpm bp`

- **Create ZIP Package**: `pnpm zip`

- **Code Inspection**: `pnpm lint`

## Code Style

- **TypeScript**: Strict mode, enable noUnusedLocals

- **Path Aliases**: Use `~/` instead of `src/` directories

- **Auto Imports**: Vue components and `/src/composables/` methods do not need to be manually imported

- **Lodash**: Use `lodash-es` instead of `lodash`

- **Default Exports**: Use default exports for composables, and named exports for utility functions

- **ESLint**: Configure using `@antfu/eslint-config`

## Project Structure

```
src/

├── background/ # Background service worker threads

├── composables/ # Vue composable functions

├── contentScripts/ # Injected scripts

├── logic/ # Data storage

├── views/ # UI views

└── constants/ # Constant definitions

```

## Technology Stack

- Vue 3 + Composition API

- TypeScript + Vite

- Element Plus + UnoCSS

- webext-bridge message communication

- Cheerio HTML parsing

## Data Flow

Game AJAX request → Content script (jQuery ajaxSuccess) → webext-bridge → Backend script → useDataCenter processing → Chrome storage → UI display