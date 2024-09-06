// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom', // Required for testing React components
    globals: true, // Enable global test functions (e.g., describe, it)
    setupFiles: './setupTests.ts', // Path to setup file for extending expect
    include: ['**/*.{test,spec}.ts?(x)'], // Patterns for test files
  },
});
