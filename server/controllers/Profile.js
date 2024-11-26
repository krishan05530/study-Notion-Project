 const { response } = require("express");
const Profile = require("../models/Profile");
const profile =require("../models/Profile")
 const User=require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");


 exports.updateProfile=async (req,res)=>{
    try{
// get daata

const{dataOfBirth="",about="",contactNumber,gender=""}=req.body;
// user id
const id=req.user.id;
// validate 
if(!contactNumber || !gender || !id){
    return res.status(400).json({
   success:false,
   message:'All field are required'
    });
}
//find profile

const userDetails=await User.findById(id);

const profileId= userDetails.additionalDetails;
// now find total data , this is an object 
const profileDetails=await Profile.findById(profileId);

// update profile, we doing chnages in this object
profileDetails.dataOfBirth=dataOfBirth;
profileDetails.about=about,
profileDetails.contactNumber=contactNumber;
profileDetails.gender=gender;

// all the chnages is geting save in db
await profileDetails.save();

// return res
return res.status(200).json({
    success:true,
    message:'profile updated succesfully',
    profileDetails,
})
    }
    catch(error)
    {
        return res.status(500).json(
            {
                success:false,
                message:"unable to create section , pls try again",
                error:error.message,
            }
           )
    
    }
 }


 // delete account

exports.deleteAccount=async (req,res)=>{

    try{
 // find the user whose account need to delete// definitly he will be logged in to delete , so get is from req.user.id

 const id=req.user.id;
 console.log("prinitng ID", id);
 //validate
 const userDetails=await User.findById(id);
 if(!userDetails){
     return res.status(404).json({
success:false,
message:'User not found'
     })
 }
 // user will have profile also so delete profile(additional details)
 await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});
 // then delete user
 // before deleteing it, schedule this job , so it doesnt get deleted instantly(how can be do task scheduling, crone job)
 await User.findByIdAndDelete({_id:id});
 //TODO as student as user delete user , as student is in course , need to remove him from course too, unenroll user from all course

 //return response
 return res.status(200).json({
success:true,
message:"User Deleted succesfully"
 })
    }
    catch(error){
       return res.status(500).json({
            success:false,
            message:'USer cannot be deleted succesfully',
            error:error.message,
        })
    }  
}

// krishan
exports.getAllUserDetails=async(req,res)=>{
    try{
const id=req.user.id;
const userDetails=await User.findById(id).populate("additionalDetails").exec();
console.log(userDetails);

return res.status(200).json({
success:true,
message:"user data fetched succesfully",
data:userDetails,
})
    }
   
    catch(error){
return res.status(500).json({
    success:false,
    message:'USer details cannot be fetched',
    error:error.message,
})
    }
}



exports.updateDisplayPicture=async(req,res)=>{
    try{
     const displayPicture=req.files.displayPicture;
     const userId=req.user.id;
     const image=await uploadImageToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
     )
     console.log(image);
     const updatedProfile=await User.findByIdAndUpdate(
        {_id:userId},
        {image:image.secure_url},
        {new:true},
     )
     res.send({
        success:true,
        message:`image uploaded succesfully`,
        data:updatedProfile,
     })

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

// get all the courses in which user is enrollled

exports. getEnrolledCourses=async(req,res)=>{
    try{
  const userId=req.user.id;
  const userDetails=await User.findOne({
    _id:userId,
  }).populate("courses").exec();

  if(!userDetails){
    return res.status(400).json({
        success:false,
        message:1`could not find user with the id ${userDetails}`,
    })
  }

  return res.status(200).json({
    success:true,
    data:userDetails.courses,
  })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })

    }
}