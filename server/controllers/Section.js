const Section = require("../models/Section")
const Course=require("../models/Course");
const { findByIdAndUpdate } = require("../models/User");

exports.createSection=async(req,res)=>{
 try{
    //data fetch
    const {sectionName, courseId}=req.body;

    // validte 
    if(!sectionName ||!courseId){
        return res.status(400).json({
            success:false,
            message:"all field are req"
        })
    }
    // create section
    const newSection = await Section.create({sectionName});
    // upate course with this section object id

    const updatedCourseDetails=await Course.findByIdAndUpdate(courseId,{
        $push:{
            courseContent:newSection._id,
        }
    }, {new:true})  // this mean get updated value now
    //TODO HW use populate to replce section/subsection both in th eupdatedCourseDetais  
    // repsonse return 
    return res.status(200).json({
success:true,
message:"Section Created Succesfully",
updatedCourseDetails,
    })
 } 
 catch(error){
   return res.status(500).json(
    {
        success:false,
        message:"unable to create section , pls try again",
        error:error.message,
    }
   )
 } 
}


// update section values
exports.updateSection=  async(req,res)=>{
try{
    // data inpt
    const{ sectionName,sectionId}=req.body;

    // dATA VALIDAET
    if(!sectionName ||!sectionId){
        return res.status(400).json({
            success:false,
            message:"all field are req"
        })
    }
    // update data , but we dont need to update sctionId in course , as its same as prev
     const section=await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true});

    // return response 
    return res.status(200).json({
        success:true,
        message:'section updated succesfully'
    })
}
catch(error){
    return res.status(500).json(
        {
            success:false,
            message:"unable to create section , pls try again",
            error:error.message,
        }
       )


}
}


exports.deleteSection=async(req,res)=>{
      try{
        // get section Id , suppose this ID was sent in parameter(params)
        
// TODO HW test it wiht req.parms test
  const {sectionId}=req.body;
  // find by idAnddelete from section, also from course

await Section.findByIdAndDelete(sectionId);
//TODO (testing)do we need to deleted sectionId from Course too ? yes nedd to delete from course too
  // return response
  return res.status(200).json({
    success:true,
    message:'section deleted succesfully',
})
      } 
      catch(error){

      }     
}