import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    env: {
      api_server: 'https://dev.checkuree.com/api/v1',
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})
