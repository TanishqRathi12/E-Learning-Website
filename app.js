const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const app = express();
const port = process.env.PORT || 3001;

require("dotenv").config();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(
  session({
    secret: "CgdsfdtfdgfcfdsrmnbSecretSession",
    saveUninitialized: true,
    resave: true,
  })
);
app.use(flash());

app.set("view engine", "ejs");


app.set("views", __dirname + "/views");

const routes = require("./server/routes/appRoutes.js");
app.use("/", routes);

app.listen(port, () => {
  console.log(`App is listening on port http://localhost:${port}`);
});
