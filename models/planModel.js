const mongoose = require('mongoose');

const db_link = 'mongodb+srv://sinhaarnabh888:Arnabh_0205@cluster0.gqobuxc.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(db_link)
    .then(function (db) {
        //console.log(db);
        console.log("plan db connected");
    })
    .catch(function (err) {
        console.log(err);
    })

    const planSchema=mongoose.Schema({
        name:{
            type:String,
            required:true,
            unique:true,
            maxlength:[20,'plan name should not exceed 20 characters']
        },
        duration:{
            type:Number,
            required:true
        },
        price:{
            type:Number,
            required:[true,'price not entered']
        },
        ratingsAverage:{
            type:Number
        },
        discount:{
            type:Number,
            validate:[function(){
                return this.discount<100;
            }, 'discount should not exceed price']
        }
    });

  //model
  const planModel = mongoose.model('planModel', planSchema);

(async function createPlan(){
    let planObj={
        name:"SuperFood100",
        duration:30,
        price:1000,
        ratingsAverage:5,
        discount:20
    }
    // let data=await planModel.create(planObj);
    // console.log(data);
    const doc=new planModel(planObj);
    await doc.save();
    console.log(doc);
})();



  
    module.exports = planModel;