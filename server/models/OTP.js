const mongoose =require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate=require("../mail/templates/emailVerificationTemplate")
const OTPSchema=new mongoose.Schema({
email:{
    type:String,
    required:true,
},
otp:{
    type:String,
    required:true,
},
createdAt:{
    type: String,
  default:Date.now(),
  expires:60*5, // it will get deleted after 5 minutes
},

})

// while signup , jab bhi otp.create() metod call hoga , usse pahle pre save middleware call hoga
// pre-svae middleware   shema ke baad , module se pahle
// otp -> send then give entry in DB , so pre middlware use


async function sendVerificationEmail(email,otp) {
    try{
       const mailResponse= await mailSender(email,"Verification Email from the StudyNotion",emailTemplate(otp));
       console.log("email send succesfully", mailResponse);
    }
    catch(error)
    {
        console.log("Error occured while sending mail", error);
        throw error;
    }
}







// document(db me ) save hone se pahle ye run kaarge
    OTPSchema.pre("save", async function (next) {
        console.log("new document saved to database");
        if(this.isNew){
         await sendVerificationEmail(this.email,this.otp);
        }
        next();// to go to next middlware
    }
)


module.exports=mongoose.model("OTP",OTPSchema);   // export as user


/// otp -> presvae midlware , which will send the otp on email , opt.create() function se pahle emial jayega otp ke saath



