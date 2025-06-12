import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://locahost:5173',
  },
  experimentalWebKitSupport: true,
})
