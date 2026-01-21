const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Service = require("./models/service.js");
const path = require("path");

app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"public"))); // <-- serve CSS

let port = 5000;
app.listen(port, () => console.log(`app running on port ${port}`));

let mongo_url = "mongodb://127.0.0.1:27017/glamora";

async function main() {
  await mongoose.connect(mongo_url);
}
main().then(() => console.log("DB connected")).catch(e => console.log("DB error", e));

app.get("/", (req,res) => res.send("Root is working"));

app.get("/home", (req, res) => {
  const categories = ["face", "hair", "nail", "other"];
  res.render("listings/home.ejs", { categories });
});
app.get("/home/:category", async (req, res) => {
  const { category } = req.params;

  const services = await Service.find({ category });

  res.render("listings/index.ejs", { services, category });
});

