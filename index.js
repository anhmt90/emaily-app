const express = require("express");
const app = express(); // generate a single-app (can be a multiple-app project)

app.get("/", (req, res) => {
  res.send({ hi: "there" });
});

// 1. Listen to a dynamic port that Heroku will give us at runtime
const PORT = process.env.PORT || 8080;
app.listen(PORT);

// 2. Tell Heroku to use a specific version of node (in package.json)

// 3. Instruct Heorku what command to run to start our server ("start" script in package.json)



