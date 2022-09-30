const { defineConfig } = require("cypress");


module.exports = defineConfig({
  viewportWidth: 1980,
  viewportHeight: 1024,
  video: false,
  projectId: 'd6s6gb',
  e2e: {
    defaultCommandTimeout: 10000,
    setupNodeEvents(on, config) {
      

      // implement node event listeners here
    }
  },
});
