const mongoose = require("mongoose");

function connectionDb() {
  mongoose
    .connect(
      "mongodb+srv://shivam:zNNI6DieNmr03FmO@cluster0.ga7oh4z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => {
      console.log("db conctated succesfully...");
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = connectionDb;
