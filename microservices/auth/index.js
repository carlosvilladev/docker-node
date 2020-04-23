const config = require("config");
const mongoose = require("mongoose");
const usersRoute = require("./routes/user.route");
const authRoute = require("./routes/auth.route");
const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

//use config module to get the privatekey, if no private key set, end the application
if (!config.get("myprivatekey")) {
  console.error("FATAL ERROR: myprivatekey is not defined.");
  process.exit(1);
}

//connect to mongodb
mongoose
  .connect("mongodb://mongo:27017/nodejsauth", { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.use(express.json());
app.use(express.urlencoded());

app.get("/", function (req, res) {
  res.send("Hello! The API is at http://localhost:" + port + "/api");
});

//use users route for api/users
app.use("/api/users", usersRoute);

//use auth route for api/auth
app.use("/api/auth", authRoute);

app.listen(port, () => console.log(`Listening on port ${port}...`));
