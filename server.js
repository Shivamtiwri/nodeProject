const express = require("express");
const app = express();
const cors = require("cors");
const connectionDb = require("./Config/db");
const router = require("./Router/Router");
const bodyParser = require("body-parser");
const Serverless = require("serverless-http");

app.use(cors());
app.use(express());
app.use(bodyParser.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3005;

connectionDb();
app.use(router);

router.get("/", (req, res) => {
  res.send("App start");
});



app.listen(port, () => console.log(`Server started... ! port ${port}`));
