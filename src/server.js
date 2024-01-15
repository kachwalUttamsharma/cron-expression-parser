const express = require("express");
const app = express();
const cronJobParser = require("./routes/cronJobParser");

app.use(express.json());
app.use("/", cronJobParser.router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("listening on port " + port);
});
