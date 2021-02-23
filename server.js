const express = require("express");
const path = require("path");
const fs = require("fs");
var db = require("./db/db.json");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/assets", express.static("public/assets"));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/index.html"))
);

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/notes.html"))
);

app.get("/api/notes", (req, res) => {
  res.json(db);
});

app.post("/api/notes", (req, res) => {
  let newNote = req.body;
  for (i = 0; i < db.length + 2; i++) {
    req.body.id = i;
  }
  db.push(newNote);
  res.json(db);
});

app.listen(PORT, () => console.log(`App is listening on PORT ${PORT}`));
