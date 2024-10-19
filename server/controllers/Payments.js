const {instance}=require("../config/razorpay");
const Course=require("../models/Course");
const User=require("../models/User");
const mailSender=require("../utils/mailSender");
// const {courseEnrollmentEmail}=require("../mail/templates/courseEntrollmentEmail");
const{courseEnrollmentEmail} =require("../mail/templates/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");

// capture the paymnet and initiate the razorpay order

exports.capturePayment=async(req,res)=>{
    // getCourseID, userID
   
    const{course_id}=req.body;
    const userId=req.user.id;


    // validation

    // validcourseId
    if(!course_id){
        return res.json({
            success:false,
            message:"please provide valid coursID",
        })
    };
    // valid courseDetails
    let course;
    try{
        course=await Course.findById(course_id);
        if(!course){
            return res.json({
                success:false,
                message:"could not find  course"
            })
        }
        // user already pay for the same course
          const uid=new mongoose.Types.ObjectId(userId); // convert userID from string to object Id
          if(course.studentsEnrolled.includes(uid)){
            return res.status(200).json({
                success:false,
                message:"student already enrolled",
            })
          }
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })

    }

    //return response
    const amount=course.price;
    const currency="INR";

    const options={
        amount:amount*100,
        currency,
        receipt:Math.random(Date.now()).toString(),
        notes:{
            // we will use it at time of verifysignature
            courseId:course_id,
            userId,
        }
    };
    try{
    // initiate the paymetn
    const paymentResponse=await instance.orders.create(options);
    console.log(paymentResponse);
    return res.status(200).json({
        success:true,
        courseName:course.courseName,
        courseDesscription:course.courseDescription,
        thumbnail:course.thumbnail,
        orderId:paymentResponse.id,
        currency:paymentResponse.currency,
        amount:paymentResponse.amount,

    })

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"could not initiate order",
        })
    }

};


// verify signature of razorpay and server
exports.verifySignature=async (req,res)=>{
    const webhookSecret="12345678";

    // this send from razorpay
    const signature=req.headers["x-razorpay-signature"];

    // making my key pas throough same process as razorpay does, and check if the o/p match with the o/p of the razorpay
    const shasum= crypto.createHmac("sha256",webhookSecret);
    // now convert this shasum into string
    shasum.update(JSON.stringify(req.body));
    const digest=shasum.digest("hex") // this digest is in hexadecimal formate


    if(signature===digest){
        console.log("payment authorized");
      // now do some action after payment complemt , student get into course 
     // 1.user-> course [] -> objId
     // 2. course-> usrEnrolled-> add karo
     

     const {courseId,userId}=req.body.payload.payment.entity.notes;
    
     try{
        // fulfill the action 
        // find the course and enroll student in it
     
        const enrolledCourse=await Course.findOneAndUpdate({_id:courseId},
         {$push:{studentEnrolled:userId}},
         {new:true},
        )
     
        if(!enrolledCourse){
         return res.status(500).json({
             success:false,
             message:"course not found",
         })
        }
     
        console.log(enrolledCourse);
     
        // find the student add to their  list of enrolled courses 
         const enrolledStudent=await User.findByIdAndUpdate({_id:userId},
             {$push:{courses:courseId}},
         {new:true})
     
         console.log(enrolledStudent);
     
         // now send the mail with the
         const   emailResponse=await mailSender(
             enrolledStudent.email,
             "Congratulation from codehelp",
             "Congratulation , you are onboarded on new code help course"
         );
     
         console.log(emailResponse);
         return res.status(200).json({
             success:true,
             message:"signature verified and course added",
         })
     
         }
         catch(error){
             console.log(error);
             return res.status(500).json({
                 success:false,
                 message:error.message,
             })
         }
     

    }
    else{
        // signature doesnt matched

        return res.status(400).json({
            success:false,
            message:"invalid request",
        })
    }

};

// sha algo secure hasing algo
//hmac hash based message authentication code
//hmac is combination of hasing alog, secret key



