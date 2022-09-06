const { response } = require("express");
const express = require("express");
const { getCategories } = require("./controllers/categories.controller");

const app = express();

app.get("/api/categories", getCategories);

app.all("/*", (req, res, next) => {
  res.status(404).send({ message: "path not found" });
});

module.exports = app;
