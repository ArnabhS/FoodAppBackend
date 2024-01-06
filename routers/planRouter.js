const express = require('express');
const planRouter = express.Router();
const {protectRoute, isAuthorised}=require('../controller/authController');
const{ getPlan, getAllPlans, createPlan, updatePlan, deletePlan}=require('../controller/planController');
//own plan-->logged in necessary
planRouter.use(protectRoute)
planRouter
.route('/plan/:id')
.get(getPlan)

//all plans
.planRouter
.route('/allPlans')
.get(getAllPlans)

//onky admin and restruant owner can acess
planRouter.use(isAuthorised['admin', 'restrauntowner'])
planRouter
.route('/crudPlan')
.post(createPlan)
.patch(updatePlan)
.delete(deletePlan);


//top3 Plans
