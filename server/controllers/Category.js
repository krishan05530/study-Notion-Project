const Category = require("../models/Category")

// create tah handler function
exports.createCategory = async (req, res) => {
    try {
        // getda data 
        const { name, description } = req.body;

        // vaidation 
        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        // create entry in db
        const CategoryDetails = await Category.create({
            name: name,
            description: description,
        });
        console.log(CategoryDetails);


        // return response
        return res.status(200).json({
            success: true,
            message: "Category created succesfully"
        })
    }
    catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

exports.showAllCategories=async(req,res)=>
{
    try{
const allCategorys=await Category.find({},{name:true,description:true}); // find all the tags , we dont want on any base , jsut all the tags , just make sure it has name and description
   
res.status(200).json({
    success:true,
    message:"All Category return succesfully",
    data:allCategorys,
})
    }
    catch(error)
    {
        return res.status(500).json({
            success:false,
            message:error.message,
        })

    }
}





// category Page Details, pge based on category
exports.categoryPageDetails=async(req,res)=>{
    try{
// get category id
const {categoryId}=req.body;

// category ke corresponding , jitne bhi course he find all them
const selectedCategory=await Category.findById(categoryId).populate("Courses").exec();
// if we dont have any course for that category , validation
if(!selectedCategory)
{
    return res.status(404).json({
        success:false,
        message:'data not found',
    })
}
// get courses for different category,
const differentCategories=await Category.find({
    _id:{$ne:categoryId}, // my id should not be equal to category Id, ne :-> notequal

}).populate("Courses").exec();

// top selling course
//Todo hw 

// return response
return res.status(200).json({
    success:true,
    data:{
        selectedCategory,
        differentCategories
    },
})

    }
    catch(error){
console.log(error);
return res.status(500).json({
    success:false,
    message:error.message
})
    }
}







// const Category = require("../models/Category");

// exports.createCategory = async (req, res) => {
// 	try {
// 		const { name, description } = req.body;
// 		if (!name) {
// 			return res
// 				.status(400)
// 				.json({ success: false, message: "All fields are required" });
// 		}
// 		const CategorysDetails = await Category.create({
// 			name: name,
// 			description: description,
// 		});
// 		console.log(CategorysDetails);
// 		return res.status(200).json({
// 			success: true,
// 			message: "Categorys Created Successfully",
// 		});
// 	} catch (error) {
// 		return res.status(500).json({
// 			success: true,
// 			message: error.message,
// 		});
// 	}
// };

// exports.showAllCategories = async (req, res) => {
// 	try {
// 		const allCategorys = await Category.find(
// 			{},
// 			{ name: true, description: true }
// 		);
// 		res.status(200).json({
// 			success: true,
// 			data: allCategorys,
// 		});
// 	} catch (error) {
// 		return res.status(500).json({
// 			success: false,
// 			message: error.message,
// 		});
// 	}
// };

// //categoryPageDetails 

// exports.categoryPageDetails = async (req, res) => {
//     try {
//             //get categoryId
//             const {categoryId} = req.body;
//             //get courses for specified categoryId
//             const selectedCategory = await Category.findById(categoryId)
//                                             .populate("courses")
//                                             .exec();
//             //validation
//             if(!selectedCategory) {
//                 return res.status(404).json({
//                     success:false,
//                     message:'Data Not Found',
//                 });
//             }
//             //get coursesfor different categories
//             const differentCategories = await Category.find({
//                                          _id: {$ne: categoryId},
//                                          })
//                                          .populate("courses")
//                                          .exec();

//             //get top 10 selling courses
//             //HW - write it on your own

//             //return response
//             return res.status(200).json({
//                 success:true,
//                 data: {
//                     selectedCategory,
//                     differentCategories,
//                 },
//             });

//     }
//     catch(error ) {
//         console.log(error);
//         return res.status(500).json({
//             success:false,
//             message:error.message,
//         });
//     }
// }