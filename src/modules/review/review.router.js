import { Router } from "express"
import { allReviews, createReview, deleteReview, getReview, updateReview } from "./review.controller.js"

const reviewRouter = Router()

reviewRouter.route('/')
.post(createReview)
.get(allReviews)
// update brand
reviewRouter.route('/:id')
.get(getReview)
.put(updateReview)
.delete(deleteReview)
export default reviewRouter