const express = require("express");
const cors = require("cors");
const Note = require("./Note");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    // You can start interacting with the database here
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const port = process.env.PORT || 5000;

app.get("/api/notes", async (req, res) => {
  try {
    const notes = await Note.find();
    res
      .status(200)
      .json({ message: "Fetched notes successfully", data: notes });
  } catch (err) {
    res.status(500).json({ message: "Error fetching notes", error: err });
  }
});

app.post("/api/notes", async (req, res) => {
  try {
    const newNotes = await Note({
      title: req.body.title,
      content: req.body.content,
    });
    const saveNote = await newNotes.save();
    res
      .status(201)
      .json({ message: "Note created successfully", data: saveNote });
  } catch (err) {
    res.status(500).json({ message: "Error creating note", error: err });
  }
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
