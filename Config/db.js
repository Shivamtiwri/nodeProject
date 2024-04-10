const mongoose = require("mongoose");

function connectionDb() {
  mongoose
    .connect(
      "mongodb+srv://shivam:k344MirCBdLcq3Fo@cluster0.ga7oh4z.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(() => {
      console.log("db conctated succesfully...");
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = connectionDb;
