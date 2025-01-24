// const Section = require("../models/Section")
// const Course=require("../models/Course");
// const { findByIdAndUpdate } = require("../models/User");

// exports.createSection=async(req,res)=>{
//  try{
//     //data fetch
//     const {sectionName, courseId}=req.body;

//     // validte 
//     if(!sectionName ||!courseId){
//         return res.status(400).json({
//             success:false,
//             message:"all field are req"
//         })
//     }
//     // create section
//     const newSection = await Section.create({sectionName});
//     // upate course with this section object id

//     const updatedCourseDetails=await Course.findByIdAndUpdate(courseId,{
//         $push:{
//             courseContent:newSection._id,
//         }
//     }, {new:true})  // this mean get updated value now
//     //TODO HW use populate to replce section/subsection both in th eupdatedCourseDetais  
//     // repsonse return 
//     return res.status(200).json({
// success:true,
// message:"Section Created Succesfully",
// updatedCourseDetails,
//     })
//  } 
//  catch(error){
//    return res.status(500).json(
//     {
//         success:false,
//         message:"unable to create section , pls try again",
//         error:error.message,
//     }
//    )
//  } 
// }


// // update section values
// exports.updateSection=  async(req,res)=>{
// try{
//     // data inpt
//     const{ sectionName,sectionId}=req.body;

//     // dATA VALIDAET
//     if(!sectionName ||!sectionId){
//         return res.status(400).json({
//             success:false,
//             message:"all field are req"
//         })
//     }
//     // update data , but we dont need to update sctionId in course , as its same as prev
//      const section=await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true});

//     // return response 
//     return res.status(200).json({
//         success:true,
//         message:'section updated succesfully'
//     })
// }
// catch(error){
//     return res.status(500).json(
//         {
//             success:false,
//             message:"unable to create section , pls try again",
//             error:error.message,
//         }
//        )


// }
// }


// exports.deleteSection=async(req,res)=>{
//       try{
//         // get section Id , suppose this ID was sent in parameter(params)
        
// // TODO HW test it wiht req.parms test
//   const {sectionId}=req.body;
//   // find by idAnddelete from section, also from course

// await Section.findByIdAndDelete(sectionId);
// //TODO (testing)do we need to deleted sectionId from Course too ? yes nedd to delete from course too
//   // return response
//   return res.status(200).json({
//     success:true,
//     message:'section deleted succesfully',
// })
//       } 
//       catch(error){

//       }     
// }







// const Section = require("../models/Section");
// const Course = require("../models/Course");
// // CREATE a new section
// exports.createSection = async (req, res) => {
// 	try {
// 		// Extract the required properties from the request body
// 		const { sectionName, courseId } = req.body;

// 		// Validate the input
// 		if (!sectionName || !courseId) {
// 			return res.status(400).json({
// 				success: false,
// 				message: "Missing required properties",
// 			});
// 		}

// 		// Create a new section with the given name
// 		const newSection = await Section.create({ sectionName });

// 		// Add the new section to the course's content array
// 		const updatedCourse = await Course.findByIdAndUpdate(
// 			courseId,
// 			{
// 				$push: {
// 					courseContent: newSection._id,
// 				},
// 			},
// 			{ new: true }
// 		)
// 			.populate({
// 				path: "courseContent",
// 				populate: {
// 					path: "subSection",
// 				},
// 			})
// 			.exec();

// 		// Return the updated course object in the response
// 		res.status(200).json({
// 			success: true,
// 			message: "Section created successfully",
// 			updatedCourse,
// 		});
// 	} catch (error) {
// 		// Handle errors
// 		res.status(500).json({
// 			success: false,
// 			message: "Internal server error",
// 			error: error.message,
// 		});
// 	}
// };

// // UPDATE a section
// exports.updateSection = async (req, res) => {
// 	try {
// 		const { sectionName, sectionId } = req.body;
// 		const section = await Section.findByIdAndUpdate(
// 			sectionId,
// 			{ sectionName },
// 			{ new: true }
// 		);
// 		res.status(200).json({
// 			success: true,
// 			message: section,
// 		});
// 	} catch (error) {
// 		console.error("Error updating section:", error);
// 		res.status(500).json({
// 			success: false,
// 			message: "Internal server error",
// 		});
// 	}
// };

// // DELETE a section
// exports.deleteSection = async (req, res) => {
// 	try {
// 		//HW -> req.params -> test
// 		const { sectionId } = req.params;
// 		await Section.findByIdAndDelete(sectionId);
// 		//HW -> Course ko bhi update karo
// 		res.status(200).json({
// 			success: true,
// 			message: "Section deleted",
// 		});
// 	} catch (error) {
// 		console.error("Error deleting section:", error);
// 		res.status(500).json({
// 			success: false,
// 			message: "Internal server error",
// 		});
// 	}
// };



//           take it from herer 

// const Section = require("../models/Section");
// const Course = require("../models/Course");
// const SubSection = require("../models/SubSection");
// // CREATE a new section
// exports.createSection = async (req, res) => {
// 	try {
// 		// Extract the required properties from the request body
// 		const { sectionName, courseId } = req.body;

// 		// Validate the input
// 		if (!sectionName || !courseId) {
// 			return res.status(400).json({
// 				success: false,
// 				message: "Missing required properties",
// 			});
// 		}

// 		// Create a new section with the given name
// 		const newSection = await Section.create({ sectionName });

// 		// Add the new section to the course's content array
// 		const updatedCourse = await Course.findByIdAndUpdate(
// 			courseId,
// 			{
// 				$push: {
// 					courseContent: newSection._id,
// 				},
// 			},
// 			{ new: true }
// 		)
// 			.populate({
// 				path: "courseContent",
// 				populate: {
// 					path: "SubSection",
// 				},
// 			})
// 			.exec();

// 		// Return the updated course object in the response
// 		res.status(200).json({
// 			success: true,
// 			message: "Section created successfully",
// 			updatedCourse,
// 		});
// 	} catch (error) {
// 		// Handle errors
// 		res.status(500).json({
// 			success: false,
// 			message: "Internal server error",
// 			error: error.message,
// 		});
// 	}
// };

// // UPDATE a section
// exports.updateSection = async (req, res) => {
// 	try {
// 		const { sectionName, sectionId ,courseId} = req.body;
// 		const section = await Section.findByIdAndUpdate(
// 			sectionId,
// 			{ sectionName },
// 			{ new: true }
// 		);

// 		// populate section , subsection both
// 		const course=await Course.findById(courseId).populate({	
// 			path:"courseContent",
// 			populate:{
// 				path:"SubSection"
// 			}
// 		})
// 		.exec();
//   console.log("course",course);
// 		res.status(200).json({
// 			success: true,
// 			message: section,
// 			data:course,
// 		});
// 	} catch (error) {
// 		console.error("Error updating section:", error);
// 		res.status(500).json({
// 			success: false,
// 			message: "Internal server error",
// 		});
// 	}
// };

// DELETE a section
// exports.deleteSection = async (req, res) => {
// 	try {

// 		const { sectionId, courseId }  = req.body;
// 		// pulling out the sectionID from the course , as courseContent is an array of sectionId
// 		await Course.findByIdAndUpdate(courseId, {
// 			$pull: {
// 				courseContent: sectionId,
// 			}
// 		})
// 		// now finding the section and deleting it
// 		const section = await Section.findById(sectionId);
// 		console.log(sectionId, courseId);

// 		if(!section) {
// 			return res.status(404).json({
// 				success:false,
// 				message:"Section not Found",
// 			})
// 		}

// 		//delete sub section
// 		await SubSection.deleteMany({_id: {$in: section.SubSection}});

// 		await Section.findByIdAndDelete(sectionId);

// 		//find the updated course and return 
// 		const course = await Course.findById(courseId).populate({
// 			path:"courseContent",
// 			populate: {
// 				path: "SubSection"
// 			}
// 		})
// 		.exec();
// 		console.log("course",course);

// 		res.status(200).json({
// 			success:true,
// 			message:"Section deleted",
// 			data:course
// 		});
		
// 	} catch (error) {
// 		console.error("Error deleting section:", error);
// 		res.status(500).json({
// 			success: false,
// 			message: "Internal server error",
// 		});
// 	}
// };



// // DELETE a section
// exports.deleteSection = async (req, res) => {
// 	try {

// 		const { sectionId, courseId }  = req.body;
// 		await Course.findByIdAndUpdate(courseId, {
// 			$pull: {
// 				courseContent: sectionId,
// 			}
// 		})
// 		const section = await Section.findById(sectionId);
// 		console.log(sectionId, courseId);
// 		if(!section) {
// 			return res.status(404).json({
// 				success:false,
// 				message:"Section not Found",
// 			})
// 		}

// 		//delete sub section
// 		await SubSection.deleteMany({_id: {$in: section.subSection}});

// 		await Section.findByIdAndDelete(sectionId);

// 		//find the updated course and return 

// 		const course=await Course.findById(courseId).populate({	
// 			path:"courseContent",
// 			populate:{
// 				path:"SubSection"
// 			}
// 		})
// 		.exec();

// 		res.status(200).json({
// 			success:true,
// 			message:"Section deleted",
// 			data:course
// 		});
// 	} catch (error) {
// 		console.error("Error deleting section:", error);
// 		res.status(500).json({
// 			success: false,
// 			message: "Internal server error",
// 		});
// 	}
// };   





const Section = require("../models/Section");
const Course = require("../models/Course");
const SubSection = require("../models/SubSection");
// CREATE a new section
exports.createSection = async (req, res) => {
	try {
		// Extract the required properties from the request body
		const { sectionName, courseId } = req.body;

		// Validate the input
		if (!sectionName || !courseId) {
			return res.status(400).json({
				success: false,
				message: "Missing required properties",
			});
		}

		// Create a new section with the given name
		const newSection = await Section.create({ sectionName });

		// Add the new section to the course's content array
		const updatedCourse = await Course.findByIdAndUpdate(
			courseId,
			{
				$push: {
					courseContent: newSection._id,
				},
			},
			{ new: true }
		)
			.populate({
				path: "courseContent",
				populate: {
					path: "subSection",
				},
			})
			.exec();

		// Return the updated course object in the response
		res.status(200).json({
			success: true,
			message: "Section created successfully",
			updatedCourse,
		});
	} catch (error) {
		// Handle errors
		res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
};

// UPDATE a section
exports.updateSection = async (req, res) => {
	try {
		const { sectionName, sectionId,courseId } = req.body;
		const section = await Section.findByIdAndUpdate(
			sectionId,
			{ sectionName },
			{ new: true }
		);

		const course = await Course.findById(courseId)
		.populate({
			path:"courseContent",
			populate:{
				path:"subSection",
			},
		})
		.exec();

		res.status(200).json({
			success: true,
			message: section,
			data:course,
		});
	} catch (error) {
		console.error("Error updating section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};

// DELETE a section
exports.deleteSection = async (req, res) => {
	try {

		const { sectionId, courseId }  = req.body;
		await Course.findByIdAndUpdate(courseId, {
			$pull: {
				courseContent: sectionId,
			}
		})
		const section = await Section.findById(sectionId);
		console.log(sectionId, courseId);
		if(!section) {
			return res.status(404).json({
				success:false,
				message:"Section not Found",
			})
		}

		//delete sub section
		await SubSection.deleteMany({_id: {$in: section.subSection}});

		await Section.findByIdAndDelete(sectionId);

		//find the updated course and return 
		const course = await Course.findById(courseId).populate({
			path:"courseContent",
			populate: {
				path: "subSection"
			}
		})
		.exec();

		res.status(200).json({
			success:true,
			message:"Section deleted",
			data:course
		});
	} catch (error) {
		console.error("Error deleting section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};   