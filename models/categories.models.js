const db = require("../db/connection");

exports.selectCategories = async () => {
  let queryStr = "SELECT * FROM categories;";
  const categories = await db.query(queryStr).then(({ rows }) => rows);
  return categories;
};
