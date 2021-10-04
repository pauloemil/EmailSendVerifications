const express = require("express");
const app = express();
const UserRouter = require("./routes/UserRoute");
require("./config/Database");

const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/user", UserRouter);
app.get("/", (req, res) => {
  res.json("hello! :");
});

app.listen(port, () => console.log(`http://localhost:${port}`));
