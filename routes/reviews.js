const { getAllReviews, createReview } = require("../controllers/reviews");

const reviewRouter = require("express").Router();

reviewRouter.get('/all/:pid', getAllReviews);
reviewRouter.post('/create/:pid', createReview)

module.exports = reviewRouter