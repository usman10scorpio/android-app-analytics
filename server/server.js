const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "3mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

require("./controllers/statsController")(app);

const port = process.env.PORT || 5000;

if (process.env.SERVER) {
  // Serve the static files from the React app
  app.use(express.static(path.join(path.resolve("../client/build"))));

  // Handles any requests that don't match the ones above
  app.get("/*", (req, res) => {
    res.sendFile(path.join(path.resolve("../client/build/index.html")));
  });
}

require("./schedulers/getDownloadsScheduler");

const server = app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

module.exports = server;
