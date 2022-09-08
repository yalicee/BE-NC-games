const { selectReviewById } = require("../models/reviews.models");

exports.getReviewById = async (req, res, next) => {
  const { review_id } = req.params;
  const review = await selectReviewById(review_id);
  if (review === undefined) {
    return Promise.reject({ status: 404, msg: "Review Not Found" });
  }
  res.send({ review });
};
