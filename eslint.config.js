import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import pluginUnusedImports from 'eslint-plugin-unused-imports'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    plugins: {
      js,
      'unused-imports': pluginUnusedImports,
    },
    extends: ['js/recommended'],
    rules: {
      'unused-imports/no-unused-imports': 'error', // Enable the unused import rule
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: { globals: globals.browser },
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
])
