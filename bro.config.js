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
    "tetrobit-stocks.main": "tetrobit-stocks/",
    "tetrobit-stocks.describe": "tetrobit-stocks/describe",
  },
  features: {
    "tetrobit-stocks": {}
  },
  config: {
    // "project.api": "/api",
  },
};
