const pkg = require("./package");

module.exports = {
  apiPath: "stubs/api",
  webpackConfig: {
    output: {
      publicPath: `/static/${pkg.name}/${process.env.VERSION || pkg.version}/`,
    },
  },
  /* use https://admin.bro-js.ru/ to create config, navigations and features */
  navigations: {
    "project.main": "/project",
  },
  features: {
    "project": {
      // add your features here in the format [featureName]: { value: string }
    },
  },
  config: {
    "project.api": "/api",
  },
};
