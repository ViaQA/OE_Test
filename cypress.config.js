const { defineConfig } = require("cypress");


module.exports = defineConfig({
  viewportWidth: 1280,
  viewportHeight: 720,
  projectId: 'd6s6gb',
  e2e: {
    defaultCommandTimeout: 100000,
    setupNodeEvents(on, config) {
      

      // implement node event listeners here
    },
    
  },
});
