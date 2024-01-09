const reviewModel=require('../models/reviewModel');
const planModel=require('../models/planModel')
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
    try{
    let id=req.params.plan;
    let plan=await planModel.findById(id);
    if(plan){
    let review=await reviewModel.create(req.body);
    plan.ratingsAverage=(plan.ratingsAverage+req.body);
    await plan.save();
    res.json({
        message:"review created",
        data:review
    });}
}
    catch(err){
        res.json({
            message:err.message
        })
    }

}

module.exports.updateReview=async function updateReview(req,res){
    
    try{
    let id=req.params.id;
    let dataToBeUpdataed = req.body;
        if (dataToBeUpdataed) {
            let keys = [];
            for (let key in dataToBeUpdataed) {
                keys.push(key);
            }
            let review=await reviewModel.findById(id);
           
            for (let i = 0; i < keys.length; i++) {
                review[keys[i]] = dataToBeUpdataed[keys[i]];
            }
            await review.save();
            res.json({
                message:'review updated successfully',
                data:plan
            })
        }
        else {
            res.json({
                message: "review was not updated"
            })
        }
    }
    catch(err){
        res.json({
            message:err.message
        })
    }

}

module.exports.deleteReview=async function deleteReview(req,res){
    try{
    let id=req.params.id;
    let plan=await planModel.findById(id);
    if(plan){
    let review=await reviewModel.findByIdAndDelete(id);
    res.json({
        message:"review deleted",
        data:review
    });}
}
    catch(err){
        res.json({
            message:err.message
        })
    }

}

