const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1980,
  viewportHeight: 1024, 
  video: true,
  reporter: 'mochawesome',
  reporterOptions: {
    overwrite: true,
    autoOpen: true,
    testsuitesTitle : true,
    saveAllAttempts: false,
    timestamp: true,
    charts: true,
    
  },
  projectId: 'd6s6gb',
  e2e: {
    experimentalSessionAndOrigin: true,
    defaultCommandTimeout: 20000,
    setupNodeEvents(on, config) {
    
      // implement node event listeners here
    }
  },
});
