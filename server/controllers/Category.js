// const Category = require("../models/Category")

// function getRandomInt(max) {  
//     return Math.floor(Math.random() * max)
//   } 

// // create tah handler function
// exports.createCategory = async (req, res) => {
//     try {
//         // getda data 
//         const { name, description } = req.body;

//         // vaidation 
//         if (!name || !description) {
//             return res.status(400).json({
//                 success: false,
//                 message: "All fields are required"
//             })
//         }

//         // create entry in db
//         const CategoryDetails = await Category.create({
//             name: name,
//             description: description,
//         });
//         console.log(CategoryDetails);


//         // return response
//         return res.status(200).json({
//             success: true,
//             message: "Category created succesfully"
//         })
//     }
//     catch (error) {
//         return res.status(500).json({
//             success:false,
//             message:error.message,
//         })
//     }
// }

// exports.showAllCategories=async(req,res)=>
// {
//     try{
// const allCategorys=await Category.find({},{name:true,description:true}); // find all the tags , we dont want on any base , jsut all the tags , just make sure it has name and description
   
// res.status(200).json({
//     success:true,
//     message:"All Category return succesfully",
//     data:allCategorys,
// })
//     }
//     catch(error)
//     {
//         return res.status(500).json({
//             success:false,
//             message:error.message,
//         })

//     }
// }





// // category Page Details, pge based on category
// exports.categoryPageDetails=async(req,res)=>{
//     try{
// // get category id
// const {categoryId}=req.body;

// // category ke corresponding , jitne bhi course he find all them
// const selectedCategory=await Category.findById(categoryId)
// .populate({
//     path: "courses",
//     match: { status: "Published" },
//     populate: "ratingAndReviews",
//   })
// .exec();
// // if we dont have any course for that category , validation
// if(!selectedCategory)
// {
//     return res.status(404).json({
//         success:false,
//         message:'Category not found',
//     })
// }

//    // Handle the case when there are no courses
//    if (selectedCategory.courses.length === 0) {
//     console.log("No courses found for the selected category.")
//     return res.status(404).json({
//       success: false,
//       message: "No courses found for the selected category.",
//     })
//   }

// // // get courses for different category,
// // const differentCategories=await Category.find({
// //     _id:{$ne:categoryId}, // my id should not be equal to category Id, ne :-> notequal

// // }).populate("Courses").exec();



//   // Get courses for other categories
//   const categoriesExceptSelected = await Category.find({
//     _id: { $ne: categoryId },
//   })
//   let differentCategory = await Category.findOne(
//     categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
//       ._id
//   )
//     .populate({
//       path: "courses",
//       match: { status: "Published" },
//     })
//     .exec()


//    // Get top-selling courses across all categories
//    const allCategories = await Category.find()
//    .populate({
//      path: "courses",
//      match: { status: "Published" },
//      populate: {
//        path: "instructor",
//    },
//    })
//    .exec()
//    const allCourses = allCategories.flatMap((category) => category.courses)
//       const mostSellingCourses = allCourses
//         .sort((a, b) => b.sold - a.sold)
//         .slice(0, 10)
//          // console.log("mostSellingCourses COURSE", mostSellingCourses)
// // top selling course
// //Todo hw 

// // return response
// return res.status(200).json({
//     success:true,
//     data:{
//         selectedCategory,
//         differentCategory,
//         mostSellingCourses,
//     },
// })

//     }
//     catch(error){
// console.log(error);
// return res.status(500).json({
//     message: "Internal server error",
//     success:false,
//     error:error.message
// })
//     }
// }




//categoryPageDetails 

// exports.categoryPageDetails = async (req, res) => {
//     try {
//       const { categoryId } = req.body
//       console.log("PRINTING CATEGORY ID: ", categoryId);
//       // Get courses for the specified category
//       const selectedCategory = await Category.findById(categoryId)
//         .populate({
//           path: "courses",
//           match: { status: "Published" },
//           populate: "ratingAndReviews",
//         })
//         .exec()
  
//       //console.log("SELECTED COURSE", selectedCategory)
//       // Handle the case when the category is not found
//       if (!selectedCategory) {
//         console.log("Category not found.")
//         return res
//           .status(404)
//           .json({ success: false, message: "Category not found" })
//       }
//       // Handle the case when there are no courses
//       if (selectedCategory.courses.length === 0) {
//         console.log("No courses found for the selected category.")
//         return res.status(404).json({
//           success: false,
//           message: "No courses found for the selected category.",
//         })
//       }
  
//       // Get courses for other categories
//       const categoriesExceptSelected = await Category.find({
//         _id: { $ne: categoryId },
//       })
//       let differentCategory = await Category.findOne(
//         categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
//           ._id
//       )
//         .populate({
//           path: "courses",
//           match: { status: "Published" },
//         })
//         .exec()
//         //console.log("Different COURSE", differentCategory)
//       // Get top-selling courses across all categories
//       const allCategories = await Category.find()
//         .populate({
//           path: "courses",
//           match: { status: "Published" },
//           populate: {
//             path: "instructor",
//         },
//         })
//         .exec()
//       const allCourses = allCategories.flatMap((category) => category.courses)
//       const mostSellingCourses = allCourses
//         .sort((a, b) => b.sold - a.sold)
//         .slice(0, 10)
//        // console.log("mostSellingCourses COURSE", mostSellingCourses)
//       res.status(200).json({
//         success: true,
//         data: {
//           selectedCategory,
//           differentCategory,
//           mostSellingCourses,
//         },
//       })
//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         message: "Internal server error",
//         error: error.message,
//       })
//     }
//   }




const { Mongoose } = require("mongoose");
const Category = require("../models/Category");
function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }

exports.createCategory = async (req, res) => {
	try {
		const { name, description } = req.body;
		if (!name) {
			return res
				.status(400)
				.json({ success: false, message: "All fields are required" });
		}
		const CategorysDetails = await Category.create({
			name: name,
			description: description,
		});
		console.log(CategorysDetails);
		return res.status(200).json({
			success: true,
			message: "Categorys Created Successfully",
		});
	} catch (error) {
		return res.status(500).json({
			success: true,
			message: error.message,
		});
	}
};

exports.showAllCategories = async (req, res) => {
  try {
        console.log("INSIDE SHOW ALL CATEGORIES");
    const allCategorys = await Category.find({});
    res.status(200).json({
      success: true,
      data: allCategorys,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//categoryPageDetails 

exports.categoryPageDetails = async (req, res) => {
    try {
      const { categoryId } = req.body
      console.log("PRINTING CATEGORY ID: ", categoryId);
      // Get courses for the specified category
      const selectedCategory = await Category.findById(categoryId)
        .populate({
          path: "courses",
          match: { status: "Published" },
          populate: "ratingAndReviews",
        })
        .exec()
  
      //console.log("SELECTED COURSE", selectedCategory)
      // Handle the case when the category is not found
      if (!selectedCategory) {
        console.log("Category not found.")
        return res
          .status(404)
          .json({ success: false, message: "Category not found" })
      }
      // Handle the case when there are no courses
      if (selectedCategory.courses.length === 0) {
        console.log("No courses found for the selected category.")
        return res.status(404).json({
          success: false,
          message: "No courses found for the selected category.",
        })
      }
  
      // Get courses for other categories
      const categoriesExceptSelected = await Category.find({
        _id: { $ne: categoryId },
      })
      let differentCategory = await Category.findOne(
        categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
          ._id
      )
        .populate({
          path: "courses",
          match: { status: "Published" },
        })
        .exec()
        //console.log("Different COURSE", differentCategory)
      // Get top-selling courses across all categories
      const allCategories = await Category.find()
        .populate({
          path: "courses",
          match: { status: "Published" },
          populate: {
            path: "instructor",
        },
        })
        .exec()
      const allCourses = allCategories.flatMap((category) => category.courses)
      const mostSellingCourses = allCourses
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 10)
       // console.log("mostSellingCourses COURSE", mostSellingCourses)
      res.status(200).json({
        success: true,
        data: {
          selectedCategory,
          differentCategory,
          mostSellingCourses,
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }