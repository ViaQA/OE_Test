const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 360,
  viewportHeight: 677, 
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
    defaultCommandTimeout: 10000,
    setupNodeEvents(on, config) {
    
      // implement node event listeners here
    }
  },
});
