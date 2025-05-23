// flow of reset password
// email enter to reset password
// mail received on email  wiht a link
// now click on that link  , chnage password



const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcryptjs");
const crypto =require("crypto");
// reset Passowrd Token
exports.resetPasswordToken = async (req, res) => {
    // get email frm req body
    // check user for this email , emial validation
      // genrate token 
      // add token,expiry time to user , so every user has its own
      //create url 
      // send mail containig the url
    try {
        //get email from req body
        const email = req.body.email;
        //check user for this email , email validation
        const user = await User.findOne({email: email});
        if(!user) {
            return res.json({success:false,
            message:`Your Email ${email} is not registered with us`});
        }
        //generate token 
        const token  = crypto.randomUUID();
        //update user by adding token and expiration time
        const updatedDetails = await User.findOneAndUpdate(
                                        {email:email},
                                        {
                                            token:token,
                                            resetPasswordExpires: Date.now() + 5*60*1000,
                                        },
                                        {new:true});
        //create url frontend
        const url = `http://localhost:3000/update-password/${token}`
        //send mail containing the url
        await mailSender(email, 
                        "Password Reset Link",
                        `Password Reset Link: ${url}`);
        //return response
        return res.json({
            success:true,
            message:'Email sent successfully, please check email and change pwd',
        });
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Something went wrong while sending reset pwd mail'
        })
    }
}

// reset password
exports.resetPassword = async (req, res) => {
    // data fetch 
    // validtion
    // get user details from db based on token
    // if no entry-> invalid token
    //token time check 
    // hash pwd
    // pasword update
    // return response
    try {
        
          //data fetch , this token is provided in url as parameter , but we are fetching it from req body , frontend has put this token into body
        const {password, confirmPassword, token} = req.body;
        //validation
        if(password !== confirmPassword) {
            return res.json({
                success:false,
                message:'Password not matching',
            });
        }
        //get userdetails from db using token
        const userDetails = await User.findOne({token: token});
        //if no entry - invalid token
        if(!userDetails) {
            return res.json({
                success:false,
                message:'Token is invalid',
            });
        }
        //token time check 
        if( userDetails.resetPasswordExpires < Date.now()  ) {
                return res.json({
                    success:false,
                    message:'Token is expired, please regenerate your token',
                });
        } 
        //hash pwd
        const hashedPassword = await bcrypt.hash(password, 10);

        //password update
        await User.findOneAndUpdate(
            {token:token},
            {password:hashedPassword},
            {new:true},
        );
        //return response
        return res.status(200).json({
            success:true,
            message:'Password reset successful',
        });
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Something went wrong while sending reset pwd mail'
        })
    }
}


// forgot password :-> it genrate link(it has token) :-> goes to mail , open link :-> enter new password  -> update password