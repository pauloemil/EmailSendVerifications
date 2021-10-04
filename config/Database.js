const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGODBURL, {}, (err) => {
  if (err) console.log(err);
  else console.log("DB Connected Succesfully");
});
