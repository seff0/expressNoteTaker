const express = require("express");
const path = require("path");
const fs = require("fs");

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

app.get("/api/notes", (req, res) =>
  res.json(JSON.parse(fs.readFileSync("./db/db.json")))
);

app.post("/api/notes", (req, res) => {
  const newNote = req.body;
  const noteDB = JSON.parse(fs.readFileSync("./db/db.json"));
  const lastNote = noteDB[noteDB.length - 1];
  newNote.id = parseInt(lastNote.id) + 1;
  let data = JSON.stringify(newNote);
  fs.appendFileSync("db.json", data);
  res.json(newNote);
});

app.listen(PORT, () => console.log(`Server is listening on PORT ${PORT}`));
