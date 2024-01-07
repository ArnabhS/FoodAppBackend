const reviewModel=require('../models/reviewModel');

module.exports.getAllReviews=async function getAllReviews(req,res){
    try {
       const reviews =await reviewModel.find();
       if(reviews){
        return res.json({
            message:"reviews retrieved",
            data:reviews
        })
       }
       else{
        return res.json({
            message:"reviews not found"
        })
       }
    } catch (error) {
        return res.json({
            message:error.message
        });
    }
}

module.exports.top3Reviews=async function top3Reviews(req,res){
    try {
       const reviews =await reviewModel.find().sort({ratings:-1}).limit(3);
       if(reviews){
        return res.json({
            message:"reviews retrieved",
            data:reviews
        })
       }
       else{
        return res.json({
            message:"reviews not found"
        })
       }
    } catch (error) {
        return res.json({
            message:error.message
        });
    }
}

module.exports.getPlanReviews=async function getPlanReviews(req,res){
    try {
        const id=req.params.id
       const review =await reviewModel.findById(id);
       if(review){
        return res.json({
            message:"reviews retrieved",
            data:review
        })
       }
       else{
        return res.json({
            message:"reviews not found"
        })
       }
    } catch (error) {
        return res.json({
            message:error.message
        });
    }
}

module.exports.createReview=async function createReview(req,res){
    
}

