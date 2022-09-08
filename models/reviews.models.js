const db = require("../db/connection");

exports.selectReviewById = async (reviewId) => {
  let queryStr = "SELECT * FROM reviews WHERE review_id = $1";
  const queryValues = [reviewId];
  const review = await db
    .query(queryStr, queryValues)
    .then(({ rows }) => rows[0]);
  return review;
};
