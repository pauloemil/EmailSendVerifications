const Router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const sender = require("../config/NodeMailer");
const jwt = require("jsonwebtoken");
Router.get("/", (req, res) => {
  res.json("json");
});
// Router.get("/send", (req, res) => {

// });
Router.get("/confirmtoken/:token", (req, res) => {
  let token = req.params.token;
  jwt.verify(token, process.env.EMAIL_TOKEN, (err, decode) => {
    // console.log(decode.ID);
    if (err) res.sendStatus(401);
    else {
      User.findByIdAndUpdate(decode.ID, { Confirmed: true }, (err) => {
        if (err) {
          res.sendStatus(404);
          console.log(err);
        } else {
          res.sendStatus(200);
        }
      });
    }
  });
});
Router.post("/signup", (req, res) => {
  console.log(req.body);
  const user = new User({
    Email: req.body.email,
    Password: req.body.password,
  });
  User.create(user, (err, createdUser) => {
    if (err) res.json(err);
    else {
      let emailToken = jwt.sign(
        { ID: createdUser._id },
        process.env.EMAIL_TOKEN,
        {
          expiresIn: "1h",
        }
      );
      let confirmationLink = `http://localhost:3000/user/confirmtoken/${emailToken}`;
      sender(
        req.body.email,
        `Confirm your email before 1 hour through: <a href='${confirmationLink}'>${confirmationLink}</a>`
      );
      res.sendStatus(200);
    } //"check your email for confirmation!");
  });
});

Router.post("/signin", (req, res) => {
  console.log(req.body);

  User.findOne({ Email: req.body.email }, (err, foundedUser) => {
    if (err) res.json({ err: err });
    else if (!foundedUser) res.sendStatus(404);
    else if (foundedUser.Password != req.body.password) res.sendStatus(401);
    else if (!foundedUser.Confirmed)
      res.send("Confirm Your Email First, Please");
    else res.json({ success: foundedUser });
  });
});
module.exports = Router;
