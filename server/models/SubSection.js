const mongoose =require("mongoose");

const SubSectionSchema=new mongoose.Schema({
title:{
    type:String,
},
timeDuration:{
    type:String,
},
description:{
    type:String
}
,
videoUrl: {
    type: String,  // Make sure this field is defined and has the correct type
    required: true,
  }

})

module.exports=mongoose.model("SubSection",SubSectionSchema);   // export as user
