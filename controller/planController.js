const e = require('express');
const planModel = require('../models/planModel');

module.exports.getAllPlans = async function getAllPlans(req, res) {
    try {
        let plans = await planModel.find();
        if (plans) {
            return res.json({
                message: "all plans retrived",
                data: plans
            })
        }
        else {
            return res.json({
                message: "plans not found"
            })

        }
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

module.exports.getPlan = async function getPlan(req, res) {
    try {
        let id = req.params.id;
        let plan = await planModel.findById(id);
        if (plan) {
            return res.json({
                message: "plan retrived",
                data: plan
            })
        }
        else {
            return res.json({
                message: "plans\ not found"
            })

        }
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

module.exports.createPlan = async function createPlan(req, res) {
    let planData = req.body;
    let createdPlan = await planModel.create(planData);
    try {
        if (createdPlan) {
            return res.json({
                message: "plan created succesfully",
                data: createdPlan
            })
        }
        else {
            return res.json({
                message: "plan not created"
            });
        }
    }
    catch (err) {
        res.json({
            message: err.message
        })
    }
}

module.exports.deletePlan = async function deletePlan(req, res) {
    let id = req.params.id;
    let deletedPlan = await planModel.findByIdAndDelete(id);
    try {
        if (deletedPlan) {
            return res.json({
                message: "plan deleted succesfully",

            })
        }
        else {
            return res.json({
                message: "plan not deleted"
            });
        }
    }
    catch (err) {
        res.json({
            message: err.message
        })
    }
}

module.exports.updatePlan = async function updatePlan(req, res) {
    try {
        let id = req.params.id;
        let dataToBeUpdataed = req.body;
        if (dataToBeUpdataed) {
            let keys = [];
            for (let key in dataToBeUpdataed) {
                keys.push(key);
            }
            let plan = await planModel.findById(id);
            for (let i = 0; i < keys.length; i++) {
                plan[keys[i]] = dataToBeUpdataed[keys[i]];
            }
            await plan.save();
        }
        else {
            res.json({
                message: "plan was not updated"
            })
        }

    }
    catch (err) {
        res.json({
            message: err.message
        })
    }
}

//get  top 3 plans

module.exports.top3Plans = async function top3Plans(req, res) {
    try {
        const plans = await planModel.find().sort({
            ratingsAverage: -1
        }).limit(3);
        return res.json({
            message: "Top 3 plans",
            data: plans
        })
    }
    catch (err) {

    }
}
