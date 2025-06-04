import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: import.meta.env.VITE_CYPRESS_BASE_URL || 'http://locahost:5173',
  },
  experimentalWebKitSupport: true,
})
