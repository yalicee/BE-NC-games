const { selectCategories } = require("../models/categories.models");

exports.getCategories = async (req, res, next) => {
  const categories = await selectCategories();
  res.send({ categories });
};
