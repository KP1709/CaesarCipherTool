import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },

  e2e: {
    baseUrl: "http://localhost:5173/",
    defaultBrowser: "chrome",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
