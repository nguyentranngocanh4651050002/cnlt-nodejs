const express = require("express");
const path = require("path");
const app = express();

const postRoutes = require("./routes/postRoutes");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/", postRoutes);

app.listen(3000, () => {
    console.log("http://localhost:3000");
});