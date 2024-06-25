// server.js
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.get("/proxy", (req, res) => {
  const url = req.query.url;
  if (!url) {
    res.status(400).send("URL is required");
    return;
  }

  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      res.setHeader("Content-Type", "application/pdf");
      blob.arrayBuffer().then((buffer) => {
        res.send(Buffer.from(buffer));
      });
    })
    .catch((err) => {
      res.status(500).send("Error fetching the resource");
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`CORS Proxy running on port ${port}`);
});
