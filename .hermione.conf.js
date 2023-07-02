module.exports = {
  sets: {
    desktop: {
      files: ["test/hermione/common.hermione.js", "test/hermione/cart.herione.js"],
      browsers: ["chromeDesktop"],
    },
    tablet: {
      files: ["test/hermione/common.hermione.js"],
      browsers: ["chromeTablet"],
    },
    mobile: {
      files: ["test/hermione/common.hermione.js", "test/hermione/mobile"],
      browsers: ["chromeMobile"],
    },
  },

  browsers: {
    chromeDesktop: {
      automationProtocol: "devtools",
      desiredCapabilities: {
        browserName: "chrome",
      },
      windowSize: "1920x1080",
    },
    chromeTablet: {
      automationProtocol: "devtools",
      desiredCapabilities: {
        browserName: "chrome",
      },
      windowSize: "1024x768",
    },
    chromeMobile: {
      automationProtocol: "devtools",
      desiredCapabilities: {
        browserName: "chrome",
      },
      windowSize: "412x1920",
    },
  },
  plugins: {
    "html-reporter/hermione": {
      enabled: true,
    },
  },
};
