const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://ozdravi-g11-t4.onrender.com/",
      changeOrigin: true,
    })
  );
};
