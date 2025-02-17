const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail");
const crypto = require("crypto");
const CourseProgress = require("../models/CourseProgress");

//initiate the razorpay order
exports.capturePayment = async(req, res) => {

    const {courses} = req.body;
    console.log("Courses", courses);
    const userId = req.user.id;

    // if (!Array.isArray(courses)) {
    //     return res.status(400).json({ error: "Courses must be an array." });
    // }
    // if (courses.length === 0) {
    //     return res.status(400).json({ error: "No courses provided." });
    // }

    if(courses.length === 0) {
        return res.json({success:false, message:"Please provide Course Id"});
    }

    let totalAmount = 0;

    for(const course_id of courses) {
        let course;
        try{
           
            course = await Course.findById(course_id);
            if(!course) {
                return res.status(200).json({success:false, message:"Could not find the course"});
            }

            const uid  = new mongoose.Types.ObjectId(userId);
            if(course.studentsEnrolled.includes(uid)) {
                return res.status(200).json({success:false, message:"Student is already Enrolled"});
            }

            totalAmount += course.price;
        }
        catch(error) {
            console.log(error);
            return res.status(500).json({success:false, message:error.message});
        }
    }
    const currency = "INR";
    const options = {
        amount: totalAmount * 100,
        currency,
        receipt: Math.random(Date.now()).toString(),
    }

    try{
        const paymentResponse = await instance.orders.create(options);
        res.json({
            success:true,
            message:paymentResponse,
        })
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({success:false, mesage:"Could not Initiate Order"});
    }

}


//verify the payment
exports.verifyPayment = async(req, res) => {
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user.id;

    if(!razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature || !courses || !userId) {
            return res.status(200).json({success:false, message:"Payment Failed"});
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");

        if(expectedSignature === razorpay_signature) {
            //enroll karwao student ko
            await enrollStudents(courses, userId, res);
            //return res
            return res.status(200).json({success:true, message:"Payment Verified"});
        }
        return res.status(200).json({success:"false", message:"Payment Failed"});

}


const enrollStudents = async(courses, userId, res) => {

    if(!courses || !userId) {
        return res.status(400).json({success:false,message:"Please Provide data for Courses or UserId"});
    }

    for(const courseId of courses) {
        try{
            //find the course and enroll the student in it
        const enrolledCourse = await Course.findOneAndUpdate(
            {_id:courseId},
            {$push:{studentsEnrolled:userId}},
            {new:true},
        )

        if(!enrolledCourse) {
            return res.status(500).json({success:false,message:"Course not Found"});
        }

         const courseProgress=await CourseProgress.create({
            courseID:courseId,
            userId:userId,
            completedVideos:[],
         })


        //find the student and add the course to their list of enrolledCOurses
        const enrolledStudent = await User.findByIdAndUpdate(userId,
            {$push:{
                courses: courseId,
                courseProgress:courseProgress._id,
            }},{new:true})
            
        ///bachhe ko mail send kardo
        const emailResponse = await mailSender(
            enrollStudents.email,
            `Successfully Enrolled into ${enrolledCourse.courseName}`,
            courseEnrollmentEmail(enrolledCourse.courseName, `${enrolledStudent.firstName}`)
        )    
        //console.log("Email Sent Successfully", emailResponse.response);
        }
        catch(error) {
            console.log(error);
            return res.status(500).json({success:false, message:error.message});
        }
    }

}

exports.sendPaymentSuccessEmail = async(req, res) => {
    const {orderId, paymentId, amount} = req.body;

    const userId = req.user.id;

    if(!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({success:false, message:"Please provide all the fields"});
    }

    try{
        //student ko dhundo
        const enrolledStudent = await User.findById(userId);
        await mailSender(
            enrolledStudent.email,
            `Payment Recieved`,
             paymentSuccessEmail(`${enrolledStudent.firstName}`,
             amount/100,orderId, paymentId)
        )
    }
    catch(error) {
        console.log("error in sending mail", error)
        return res.status(500).json({success:false, message:"Could not send email"})
    }
}























// const crypto=require("crypto");
// const {instance}=require("../config/razorpay");
// const Course=require("../models/Course");
// const User=require("../models/User");
// const mailSender=require("../utils/mailSender");
// // const {courseEnrollmentEmail}=require("../mail/templates/courseEntrollmentEmail");
// const{courseEnrollmentEmail} =require("../mail/templates/courseEnrollmentEmail");
// const { default: mongoose } = require("mongoose");
// const {paymentSuccessEmail}=require("../mail/templates/paymentSuccessEmail");
// // intiate the order of the payment , as when we click on buy now button
// exports.capturePayment=async(req,res)=>{
//     const {courses}=req.body;
//     const userId=req.user.id;
 
//     if(courses.length===0){
//         return res.status(400).json({
//             success:false,
//             message:"Please provide a valid course ID"
//         })
//     }

//     // noe calculate the total amount of the courses

//     let totalAmount=0;
//     for(const course_id of courses)
//     {
//         let course;
//         try{
//             course=await Course.findById(course_id);
//             if(!course){
//                 return res.status(400).json({
//                     success:false,
//                     message:"Course not found the course"
//                 })
//             }

//             const uid=new mongoose.Types.ObjectId(userId);
//           if(course.studentsEnrolled.includes(uid)){
//             return res.status(200).json({
//                 success:false,
//                 message:"student already enrolled",
//             })
//           }
//           totalAmount+=course.price;
//         }
//         catch(error){
//             console.log(error);
//             return res.status(500).json({
//                 success:false,
//                 message:error.message
//             })
//         }

//     }



//  // define option for creating order // order initiate
//     const options ={
//         amount:totalAmount*100,
//         currency:"INR",
//         receipt:Math.random(Date.now()).toString(),
//     }

//     try{
//          const paymentResponse=await instance.orders.create(options);
//             console.log(paymentResponse);
//             res.json({
//                 success:true,
//                 message:paymentResponse,
//             })
//     }
//     catch(error){
//         console.log(error);
//         return res.status(500).json({
//             success:false,
//             message:"could not initiate order",
//         })
//     }
  
// }



// // verify the signature of the payment
// exports.verifyPayment=async(req,res)=>{
// const razorpay_order_id=req.body?.razorpay_order_id;
// const razorpay_payment_id=req.body?.razorpay_payment_id;
// const razorpay_signature=req.body?.razorpay_signature;
// const userId=req.user.id;
// const courses=req.body?.courses;

// if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId){
//     return res.status(200).json({
//         success:false,
//         message:"Please provide valid payment details payment failed",
//     })

// }

// const body =razorpay_order_id+"|"+razorpay_payment_id;
// const expectedSignature=crypto.
// createHmac("sha256",process.env.RAZORPAY_SECRET)
// .update(body.toString())
// .digest("hex");
 
// // if signature match
// if(expectedSignature===razorpay_signature){
// // enrolled karwa do 
// await enrollStudents(courses,userId,res);

//     return res.status(200).json({
//         success:true,
//         message:"payment verified",
//     })
    
// }

// return res.status(400).json({  success:"false" , message:"failed to verify the payment",})

// }




// const enrollStudents= async(courses, userId,res)=>{
// if(!courses || !userId){
//     return res.status(400).json({
//         success:false,
//         message:"Please provide valid courses and userId",
//     })
//     }

//      for(const courseId of courses){
// try{
//    // find the course and enroll student in it
//      const enrolledCourse=await Course.findOneAndUpdate(
//     {_id:courseId},
//     {$push:{studentsEnrolled:userId}},
//     {new:true}
//       )

//         if(!enrolledCourse){
//         return res.status(500).json({
//         success:false,
//         message:"course not found",
//         })
//        }
//           // find yhe student and add to their list of enrolled courses
//           const enrolledStudent=await User.findByIdAndUpdate(userId,
//           {$push:{
//           courses:courseId
//           }},{new:true})

//         // send the mail to child
//        const emailResponse=await mailSender(
//        enrolledStudent.email,
//       `Succesfully Enrolled into ${enrolledCourse.courseName} `,
//       courseEnrollmentEmail(enrolledStudent.courseName,`${enrolledStudent.firstName} ${enrolledStudent.lastName}`)
//      );
//          console.log("Email send succsefully",emailResponse);
//         }
//         catch(error){
//             console.log(error);
//             return res.status(500).json({
//                 success:false,
//                 message:error.message,
//             })
//         }
     
//      }
// };




// exports.sendPaymentSuccessEmail=async(req,res)=>{
//     const {orderId,paymentId,amount}=req.body;
//     const userId=req.user.id;
//     if(!orderId || !paymentId ||!amount ||!userId)
//     {
//         return res.status(400).json({
//             success:false,
//             message:"Please provide all the  fields",
//         })
//     }

//     try{
//  const enrolledStudent=await User.findById(userId);
//  await mailSender(
//     enrolledStudent.email,
//     `payment Received `,
//     paymentSuccessEmail(`${enrolledStudent.firstName} `,
//     amount/100,orderId,paymentId)
//  )
//     }
//     catch(error)
//     {
// console.log("error in sending mail",error);
// return res.status(500).json({
//     success:false,
//     message:"could not sned mail",
//     }
// )
// }
// };

// capture the paymnet and initiate the razorpay order

// exports.capturePayment=async(req,res)=>{
//     // getCourseID, userID
   
//     const{course_id}=req.body;
//     const userId=req.user.id;


//     // validation

//     // validcourseId
//     if(!course_id){
//         return res.json({
//             success:false,
//             message:"please provide valid coursID",
//         })
//     };
//     // valid courseDetails
//     let course;
//     try{
//         course=await Course.findById(course_id);
//         if(!course){
//             return res.json({
//                 success:false,
//                 message:"could not find  course"
//             })
//         }
//         // user already pay for the same course
//           const uid=new mongoose.Types.ObjectId(userId); // convert userID from string to object Id
//           if(course.studentsEnrolled.includes(uid)){
//             return res.status(200).json({
//                 success:false,
//                 message:"student already enrolled",
//             })
//           }
//     }
//     catch(error)
//     {
//         console.log(error);
//         return res.status(500).json({
//             success:false,
//             message:error.message
//         })

//     }

//     //return response
//     const amount=course.price;
//     const currency="INR";

//     const options={
//         amount:amount*100,
//         currency,
//         receipt:Math.random(Date.now()).toString(),
//         notes:{
//             // we will use it at time of verifysignature
//             courseId:course_id,
//             userId,
//         }
//     };
//     try{
//     // initiate the paymetn
//     const paymentResponse=await instance.orders.create(options);
//     console.log(paymentResponse);
//     return res.status(200).json({
//         success:true,
//         courseName:course.courseName,
//         courseDesscription:course.courseDescription,
//         thumbnail:course.thumbnail,
//         orderId:paymentResponse.id,
//         currency:paymentResponse.currency,
//         amount:paymentResponse.amount,

//     })

//     }
//     catch(error){
//         console.log(error);
//         return res.status(500).json({
//             success:false,
//             message:"could not initiate order",
//         })
//     }

// };


// // verify signature of razorpay and server
// exports.verifySignature=async (req,res)=>{
//     const webhookSecret="12345678";

//     // this send from razorpay
//     const signature=req.headers["x-razorpay-signature"];

//     // making my key pas throough same process as razorpay does, and check if the o/p match with the o/p of the razorpay
//     const shasum= crypto.createHmac("sha256",webhookSecret);
//     // now convert this shasum into string
//     shasum.update(JSON.stringify(req.body));
//     const digest=shasum.digest("hex") // this digest is in hexadecimal formate


//     if(signature===digest){
//         console.log("payment authorized");
//       // now do some action after payment complemt , student get into course 
//      // 1.user-> course [] -> objId
//      // 2. course-> usrEnrolled-> add karo
     

//      const {courseId,userId}=req.body.payload.payment.entity.notes;
    
//      try{
//         // fulfill the action 
//         // find the course and enroll student in it
     
//         const enrolledCourse=await Course.findOneAndUpdate({_id:courseId},
//          {$push:{studentEnrolled:userId}},
//          {new:true},
//         )
     
//         if(!enrolledCourse){
//          return res.status(500).json({
//              success:false,
//              message:"course not found",
//          })
//         }
     
//         console.log(enrolledCourse);
     
//         // find the student add to their  list of enrolled courses 
//          const enrolledStudent=await User.findByIdAndUpdate({_id:userId},
//              {$push:{courses:courseId}},
//          {new:true})
     
//          console.log(enrolledStudent);
     
//          // now send the mail with the
//          const   emailResponse=await mailSender(
//              enrolledStudent.email,
//              "Congratulation from codehelp",
//              "Congratulation , you are onboarded on new code help course"
//          );
     
//          console.log(emailResponse);
//          return res.status(200).json({
//              success:true,
//              message:"signature verified and course added",
//          })
     
//          }
//          catch(error){
//              console.log(error);
//              return res.status(500).json({
//                  success:false,
//                  message:error.message,
//              })
//          }
     

//     }
//     else{
//         // signature doesnt matched

//         return res.status(400).json({
//             success:false,
//             message:"invalid request",
//         })
//     }

// };

// // sha algo secure hasing algo
// //hmac hash based message authentication code
// //hmac is combination of hasing alog, secret key



