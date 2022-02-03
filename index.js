// core dependance
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes/routes")
// db connection
const mongoose = require("./db");

const app = express();

app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:4200" }));

app.listen(3000, () => {
  console.log("server started at port 3000");
});

app.use('/employees',routes)