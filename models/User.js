const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  Email: {
    type: String,
    unique: true,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Confirmed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", UserSchema);
