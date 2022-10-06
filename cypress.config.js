const { defineConfig } = require("cypress");


module.exports = defineConfig({
  viewportWidth: 377,
  viewportHeight: 677, 
  video: false,
  reporter: 'mochawesome',
  reporterOptions: {
    overwrite: false,
    autoOpen: true,
    timestamp: true
  },
  projectId: 'd6s6gb',
  e2e: {
    experimentalSessionAndOrigin: true,
    defaultCommandTimeout: 10000,
    setupNodeEvents(on, config) {
    
      // implement node event listeners here
    }
  },
});
