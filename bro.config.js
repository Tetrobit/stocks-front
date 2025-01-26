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
    "tetrobit-stocks.main": "/tetrobit-stocks/",
    "tetrobit-stocks.ex-rate": "/tetrobit-stocks/ex-rate",
    "tetrobit-stocks.converter": "/tetrobit-stocks/converter",
    "tetrobit-stocks.history": "/tetrobit-stocks/history",
    "tetrobit-stocks.profile": "/tetrobit-stocks/profile",
    "tetrobit-stocks.transfer": "/tetrobit-stocks/transfer",
    "tetrobit-stocks.top-up": "/tetrobit-stocks/top-up",
  },
  features: {
    "tetrobit-stocks": {}
  },
  config: {
    // "project.api": "/api",
  },
};
