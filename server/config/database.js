const mongoose=require("mongoose");
require("dotenv").config();

exports.connect=()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>console.log("DB connected succesfully"))
    .catch(()=>
        {
            console.log("DB connection failed");
            console.log(error);
            process.exit(1);
        })

}