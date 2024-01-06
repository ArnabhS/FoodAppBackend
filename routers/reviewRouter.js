const express = require('express');
const reviewRouter = express.Router();
const {protectRoute, isAuthorised}=require('../controller/authController');

reviewRouter
.route('/reviews')
.get(getAllReviews)

reviewRouter.route('/top3')
.get(top3reviews)

.reviewRouter.route('/;id')
.get(getPlanReviews)

reviewRouter.use(protectRoute)
reviewRouter.route('/')
.post(createReview)

reviewRouter.route('/')
.patch(updateReview)
.delete(deleteReview)

module.exports=reviewRouter;