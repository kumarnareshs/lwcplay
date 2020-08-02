// Simple Express server setup to serve the build output

const express = require("express");
const path = require("path");



const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 3000;
const DIST_DIR = "./dist";


const app = express();


app.use(express.static(DIST_DIR));
app.use("*", (req, res) => {
  res.sendFile(path.resolve(DIST_DIR, "index.html"));
});

app.listen(PORT, () =>
  console.log(`✅  Server started: http://${HOST}:${PORT}`)
);
