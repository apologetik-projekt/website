/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  server: "./server.js",
  serverBuildPath: "functions/[[path]].js",
  serverConditions: ["workerd", "worker", "browser"],
  serverDependenciesToBundle: "all",
  serverMainFields: ["browser", "module", "main"],
  serverModuleFormat: "esm",
  serverPlatform: "neutral",
  serverMinify: true,
  devServerBroadcastDelay: 1000,
  ignoredRouteFiles: ["**/.*"],
  dev: {
    port: 8002,
  }
}

