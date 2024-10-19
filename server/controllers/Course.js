const Course = require("../models/Course");
const { populate } = require("../models/Profile");
const Tag = require("../models/Category");
const User = require("../models/User");
const {uploadImageToCloudinary} = require("../utils/imageUploader");
const Category = require("../models/Category");


// exports.createCourse=async (req,res)=>{
//     // instructor can create only
//     // data 
//     // fil 
//     // validation
//     // instructor validation 
//     //tag

//     // we have to find the account type to check if user is instructor or not , as instructor will create the course only


//     try{
//       //fetch data 
//       const {courseName,
//  courseDescription,
//   whatYouWillLearn,
//    price,
//     tag,
//         category,
//         status,
//         instructions
//       } = req.body;
     
//        //get thumbnail
//        const thumbnail = req.files.thumbnailImage;

//        //validation
//        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !thumbnail || !category) {
//            return res.status(400).json({
//                success:false,
//                message:'All fields are required',
//            });
//        }

//    // check for instructor ? :->  it would be done by middleawre so no need ot do it here
//    // but we need instructor so that we can add its object ID in the course
      
//    const userId=req.user.id;  // we have uploaded the decoder in the req.user in login controller , 

   
//    const instructorDetails=await User.findById(userId,{
//     accountType:"Instructor"
//    });
//    console.log("Instructor Details", instructorDetails);

//    if(!instructorDetails)
//    {
//     return res.status(404).json({
//           success:false,
//           message:"Instructor Details not found",
//     })
//    }


//   //check given tag is valid or not
//         const categoryDetails = await Category.findById(category);
//         if(!categoryDetails) {
//             return res.status(404).json({
//                 success:false,
//                 message:'category Details not found',
//             });
//         }


//           //Upload Image top Cloudinary
//           const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

//           //create an entry for new Course
//           const newCourse = await Course.create({
//               courseName,
//               courseDescription,
//               instructor: instructorDetails._id,
//               whatYouWillLearn: whatYouWillLearn,
//               price,
//               tag:tag,
//               thumbnail:thumbnailImage.secure_url,
//               status:status,
//               instructions:instructions,
//           })

//            //add the new course to the user schema of Instructor
//         await User.findByIdAndUpdate(
//             {_id: instructorDetails._id},
//             {
//                 $push: {
//                     courses: newCourse._id,
//                 }
//             },
//             {new:true},  // updateed response
//         );
     
//         //update the TAG ka schema 
//         //TODO: HW

//         //return response
//         return res.status(200).json({
//             success:true,
//             message:"Course Created Successfully",
//             data:newCourse,
//         });


//     }
//     catch(error)
// {
//     console.error(error);
//     return res.status(500).json({
//         success:false,
//         message:'Failed to create Course',
//         error: error.message,
//     })
// }

// }



// copy
exports.createCourse = async (req, res) => {
	try {
		// Get user ID from request object
		const userId = req.user.id;

		// Get all required fields from request body
		let {
			courseName,
			courseDescription,
			whatYouWillLearn,
			price,
			tag,
			category,
			status,
			instructions,
		} = req.body;

		// Get thumbnail image from request files
		const thumbnail = req.files.thumbnailImage;

		// Check if any of the required fields are missing
		if (
			!courseName ||
			!courseDescription ||
			!whatYouWillLearn ||
			!price ||
			!tag ||
			!thumbnail ||
			!category
		) {
			return res.status(400).json({
				success: false,
				message: "All Fields are Mandatory",
			});
		}

        console.log("courseName1",courseName);
		if (!status || status === undefined) {
			status = "Draft";
		}
		// Check if the user is an instructor
		const instructorDetails = await User.findById(userId, {
			accountType: "Instructor",
		});

		if (!instructorDetails) {
			return res.status(404).json({
				success: false,
				message: "Instructor Details Not Found",
			});
		}

		// Check if the tag given is valid
		const categoryDetails = await Category.findById(category);
		if (!categoryDetails) {
			return res.status(404).json({
				success: false,
				message: "Category Details Not Found",
			});
		}
		// Upload the Thumbnail to Cloudinary
		const thumbnailImage = await uploadImageToCloudinary(
			thumbnail,
			process.env.FOLDER_NAME
		);
		console.log(thumbnailImage);
		// Create a new course with the given details
        console.log("courseName2",courseName);
		const newCourse = await Course.create({
			courseName:courseName,
			courseDescription,
			instructor: instructorDetails._id,
			whatYouWillLearn: whatYouWillLearn,
			price,
			tag: tag,
			category: categoryDetails._id,
			thumbnail: thumbnailImage.secure_url,
			status: status,
			instructions: instructions,
		});
        console.log("new course");
        console.log(newCourse);

		// Add the new course to the User Schema of the Instructor
		await User.findByIdAndUpdate(
			{
				_id: instructorDetails._id,
			},
			{
				$push: {
					courses: newCourse._id,
				},
			},
			{ new: true }
		);
		// Add the new course to the Categories
		await Category.findByIdAndUpdate(
			{ _id: category },
			{
				$push: {
					course: newCourse._id,
				},
			},
			{ new: true }
		);
		// Return the new course and a success message
		res.status(200).json({
			success: true,
			data: newCourse,
			message: "Course Created Successfully",
		});
	} catch (error) {
		// Handle any errors that occur during the creation of the course
		console.error(error);
		res.status(500).json({
			success: false,
			message: "Failed to create course",
			error: error.message,
		});
	}
};



//getAllCourses handler function

exports.getAllCourses = async (req, res) => {
    try {
            //TODO: change the below statement incrementally
            const allCourses = await Course.find({},
                {
                    courseName:true,
                    price:true,
                    thumbnail:true,
                    ratingAndReviews:true,
                    studentsEnrolled:true,
                }
            ).populate("instructor")
            .exec();  // find all the course

            return res.status(200).json({
                success:true,
                message:'Data for all courses fetched successfully',
                data:allCourses,
            })

    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Cannot Fetch course data',
            error:error.message,
        })
    }
}


//todo getCourseDetails

exports.getCourseDetails=async(req,res)=>{
    // find courseId
    // coursedetails findout with populate
    try{
 
        const {courseId}=req.body;
        const courseDetails=await Course.find({_id:courseId})
            .populate(
                {
                path:"instructor",
                populate:{
                    path:"additionalDetails",
                },
              }
            )
            .populate("category")
              // .populate("ratingAndReviews
            .populate({
                path:"courseContent",
                populate:{
                    path:"SubSection",
                },
            })  .exec();
         
          

            // validation 
            if(!courseDetails){
                return res.status(400).json({
                    success:false,
                    message:`could not find the course with ${courseId}`,
                });
            }
            //return response
            return res.status(200).json({
                success:true,
                message:"Course Details fetched succesfully",
                data:courseDetails
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



//copy
// //getCourseDetails
// exports.getCourseDetails = async (req, res) => {
//     try {
//             //get id
//             const {courseId} = req.body;
//             //find course details
//             const courseDetails = await Course.find(
//                                         {_id:courseId})
//                                         .populate(
//                                             {
//                                                 path:"instructor",
//                                                 populate:{
//                                                     path:"additionalDetails",
//                                                 },
//                                             }
//                                         )
//                                         .populate("category")
//                                         //.populate("ratingAndreviews")
//                                         .populate({
//                                             path:"courseContent",
//                                             populate:{
//                                                 path:"SubSection",
//                                             },
//                                         })
//                                         .exec();

//                 //validation
//                 if(!courseDetails) {
//                     return res.status(400).json({
//                         success:false,
//                         message:`Could not find the course with ${courseId}`,
//                     });
//                 }
//                 //return response
//                 return res.status(200).json({
//                     success:true,
//                     message:"Course Details fetched successfully",
//                     data:courseDetails,
//                 })

//     }
//     catch(error) {
//         console.log(error);
//         return res.status(500).json({
//             success:false,
//             message:error.message,
//         });
//     }
// }