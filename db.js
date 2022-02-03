const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/meanDB", (error) => {
  if (!error) {
    console.log("Database connection Successfully");
  } else {
    console.log("Database connection Failure " + error);
  }
});

module.exports = mongoose;
