const express = require("express");
const app = express();
const Book = require("./models/Book");

app.use(express.json());

app.use(require("./middleware/not-found"));
app.use(require("./middleware/error"));

app.get("/api/v1/books", (req, res, next) => {
  Book.find()
    .then((book) => res.send(book))
    .catch(next);
});

module.exports = app;
