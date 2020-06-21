// Find the full example of all available configuration options at
// https://github.com/muenzpraeger/create-lwc-app/blob/master/packages/lwc-services/example/lwc-services.config.js
module.exports = {
  resources: [{ from: "src/client/resources/", to: "dist/resources/" }],

  sourceDir: "./src/client",

  devServer: {
    port: 3007,
    host: "localhost",
    open: false,
    stats: "errors-only",
    noInfo: true,
    contentBase: "./src/client",
  },
};
