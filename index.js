const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use(
  "/proxy",
  createProxyMiddleware({
    target: "https://ebook-library-taol.onrender.com", // The third-party server
    changeOrigin: true,
    pathRewrite: {
      "^/proxy": "", // Remove /proxy from the path
    },
  })
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
