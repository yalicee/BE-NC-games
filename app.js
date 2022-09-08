const { response } = require("express");
const express = require("express");
const { getCategories } = require("./controllers/categories.controller");
const { getReviewById } = require("./controllers/reviews.controllers");
const {
  routeNotFound,
  handleSQLErrors,
  handleCustomErrors,
  handle500,
  withErrorHandling,
} = require("./errors");

const app = express();

app.get("/api/categories", withErrorHandling(getCategories));
app.get("/api/reviews/:review_id", withErrorHandling(getReviewById));

app.all("/*", routeNotFound);

app.use(handleSQLErrors);
app.use(handleCustomErrors);
app.use(handle500);

module.exports = app;
