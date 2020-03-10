const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    "/api/v1",
    createProxyMiddleware("/api/v1", {
      target: "https://main.staging.oxford.tink.se",
      changeOrigin: true
    })
  );

  app.use(
    "/backend",
    createProxyMiddleware("/backend", {
      target: "http://localhost:8080",
      changeOrigin: true
    })
  );
};
