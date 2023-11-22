import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let newItems = [];

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

let options = {
  weekday: "long",
  month: "long",
  day: "numeric",
};
let day = new Date().toLocaleDateString(undefined, options);

app.post("/today", (req, res) => {
  let newItem = req.body.newItem;
  newItems.push(newItem);
  res.redirect("/today");
});

app.get("/today", (req, res) => {
  res.render("today.ejs", {
    date: day,
    newListItems: newItems,
  });
});

app.get("/work", (req, res) => {
  res.render("work.ejs");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
