const mongoose =require("mongoose");
const Category = require("./Category");

const coursesSchema=new mongoose.Schema({
courseName:{
    type:String,
    required:true,
},
courseDescription:{
    type:String
},
instructor:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user",
    required:true,
},
whatYouWillLearn:{
    type:String,
}

,
courseContent:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Section"
}],
ratingAndReviews:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"RatingAndReview",
}],
price:{
    type:Number,
},
thumbnail:{
    type:String,
},
tag:{
    type:[String],
    required:true,
},
category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Category",
},
studentsEnrolled:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user",
    required:true, 
}],
instructions:{
    type:[String]
},
status:{
    type:String,
    enum:["Draft","Published"],
},
createdAt:{
    type:Date,
    default:Date.now,
}


});

module.exports=mongoose.model("Course",coursesSchema);   // export as user


/*
HW;

added createdAt field to the course schema
*/