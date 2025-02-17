// const RatingAndReview = require("../models/RatingAndReview");
// const Course = require("../models/Course")
// const { mongo, default: mongoose } = require("mongoose");
// // createRating
// exports.createRating = async (req, res) => {
//     try {
//         // get userid
//         const userId = req.user.id;
//         // fetch data
//         const { rating, review, courseId } = req.body;
//         //check if user is enrolled or not
//         ///studentEnrolled ke under $elemMatch ka use karke check karte he ki userId match kar rha he ya nahi
//         //find the id by this course , then match userId in the by using $elemMatch
//         const courseDetails = await Course.findOne({
//             _id: courseId,
//             studentEnrolled: { $elemMatch: { $eq: userId } },
//         });
//         if (!courseDetails) {
//             return res.status(404).json({
//                 success: false,
//                 message: "student is not enrolled in the course",
//             })
//         }
//         // check if user already reviewed
//         const alreadyReviewed = await RatingAndReview.findOne({
//             user: userId,
//             course: courseId,
//         });

//         if (alreadyReviewed) {
//             return res.status(403).json({
//                 success: false,
//                 message: "course could not be reviwed"
//             })
//         }

//         // create rating and review obj
//         const ratingReview = await RatingAndReview.create({
//             rating, review, course: courseId,
//             user: userId,
//         })
//         //update course with the rating review
//        const  updatedCourseDetails = await Course.findByIdAndUpdate({ _id: courseId }, {
//             push: {
//                 ratingAndReviews: ratingReview._id,
//             }
//         }, { new: true })
//         console.log(updatedCourseDetails);

//         // return response

//         return res.status(200).json({
//             success: true,
//             message: " rating And review succesfully "
//             ,
//             ratingReview,
//         })
//     }
//     catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }

// // getAvergaeRating

// exports.getAverageRating = async (req, res) => {
//     try {

//         // avg rating of course
//         const courseId = req.body.courseId;

//         // cal avg
//         // mujhe ratingAndReview bale me se esi entry find karke do jisme match kar rhi ho , course key me  courseId padi ho
//         const result = await RatingAndReview.aggregate([
//             {
//                 $match: {
//                     course: new mongoose.Types.ObjectId(courseId), // here converting teh courseId in to objectID from string
//                 }
//             },
//             {
//                 $group: {
//                     _id: null,
//                     averageRating: { $avg: "$rating" },
//                 }
//             }
//         ])

//         // get courseId
//         // calculate avg rating
//         //return rating
//         if(result.length > 0) {
//             return res.status(200).json({
//                 success: true,
//                 averageRating: result[0].averageRating, 
//             })
//         }
//         // if rating / review doesnt exist
//         return res.status(200).json({
//             success: true,
//             message: "avergae rating is 0 , no rating givern till now",
//             averageRating: 0,
//         })
//     }
//     catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }

// // getAllratingAndReview irrespective of course

// exports.getAllRating=async (req,res)=>{
//     try{
// const allReview=await RatingAndReview.find() // find all data
// .sort({rating:"desc"})
// .populate({
//     path:"user",
//     select:"firstName lastName email image"   // these all fiedl of user need to get 
// })
// .populate({
//     path:"course",
//     select:"courseName",
// })
// .exec();


// return res.status(200).json({
//     success:true,
//     message:"all review fetched succesfuuly",
//     data:allReview,
// })
// }                 
//     catch(error){
//         return res.status(500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }

// // find all the ratingand reviw for a course













const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const { mongo, default: mongoose } = require("mongoose");

//createRating
exports.createRating = async (req, res) => {
    try{

        //get user id
        const userId = req.user.id;
        //fetchdata from req body
        const {rating, review, courseId} = req.body;
        //check if user is enrolled or not
        const courseDetails = await Course.findOne(
                                    {_id:courseId,
                                    studentsEnrolled: {$elemMatch: {$eq: userId} },
                                });

        if(!courseDetails) {
            return res.status(404).json({
                success:false,
                message:'Student is not enrolled in the course',
            });
        }
        //check if user already reviewed the course
        const alreadyReviewed = await RatingAndReview.findOne({
                                                user:userId,
                                                course:courseId,
                                            });
        if(alreadyReviewed) {
                    return res.status(403).json({
                        success:false,
                        message:'Course is already reviewed by the user',
                    });
                }
        //create rating and review
        const ratingReview = await RatingAndReview.create({
                                        rating, review, 
                                        course:courseId,
                                        user:userId,
                                    });
       
        //update course with this rating/review
        const updatedCourseDetails = await Course.findByIdAndUpdate({_id:courseId},
                                    {
                                        $push: {
                                            ratingAndReviews: ratingReview._id,
                                        }
                                    },
                                    {new: true});
        console.log(updatedCourseDetails);
        //return response
        return res.status(200).json({
            success:true,
            message:"Rating and Review created Successfully",
            ratingReview,
        })
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}



//getAverageRating
exports.getAverageRating = async (req, res) => {
    try {
            //get course ID
            const courseId = req.body.courseId;
            //calculate avg rating

            const result = await RatingAndReview.aggregate([
                {
                    $match:{
                        course: new mongoose.Types.ObjectId(courseId),
                    },
                },
                {
                    $group:{
                        _id:null,
                        averageRating: { $avg: "$rating"},
                    }
                }
            ])

            //return rating
            if(result.length > 0) {

                return res.status(200).json({
                    success:true,
                    averageRating: result[0].averageRating,
                })

            }
            
            //if no rating/Review exist
            return res.status(200).json({
                success:true,
                message:'Average Rating is 0, no ratings given till now',
                averageRating:0,
            })
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}


//getAllRatingAndReviews

exports.getAllRating = async (req, res) => {
    try{
            const allReviews = await RatingAndReview.find({})
                                    .sort({rating: "desc"})
                                    .populate({
                                        path:"user",
                                        select:"firstName lastName email image",
                                    })
                                    .populate({
                                        path:"course",
                                        select: "courseName",
                                    })
                                    .exec();
            return res.status(200).json({
                success:true,
                message:"All reviews fetched successfully",
                data:allReviews,
            });
    }   
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    } 
}