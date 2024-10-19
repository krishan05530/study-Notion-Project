

// middleware , 
// auth   authneticity of token created while login will be checkd
// /isStudent  // is student ?   // role check kiya jayega so aap sirf protected route pe hi jaaye
// is Instructor  ? 
// isAdmin?  check  kiya jayega


const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

// krishan
// auth 

exports.auth = async (req, res, next) => {
    try {
        //extract token
        const token = req.cookies.token
            || req.body.token
            || req.header("Authorisation").replace("Bearer ", "");

        //if token missing, then return response
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'TOken is missing',
            });
        }

         //verify the token
         try{
        
            const decode =  jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode); /// thsi decode consist the role as well  // we hve send in auth controller payload
            req.user = decode; // req me jo user obj he usme decode daal do, now req ke under hi hmune apna payload daal diya he , jisme user.id bhi he
            // yaha pe auth bale middlware me , hum user ko verify krke ,user ko req ki body me daal diy he , futere me req ki body se user.id fetch kar sakte he
        }
        catch(err) {
            //verification - issue
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }

        next();


    }
    catch (error) {
   return res.status(401).json({
            success:false,
            message:'Something went wrong while validating the token',
        });
    }
}



exports.isStudent = async (req, res, next) => {
    try{
           if(req.user.accountType !== "Student") {
               return res.status(401).json({
                   success:false,
                   message:'This is a protected route for Students only',
               });
           }
           next();
    }
    catch(error) {
       return res.status(500).json({
           success:false,
           message:'User role cannot be verified, please try again'
       })
    }
   }
   
   //isInstructor
exports.isInstructor = async (req, res, next) => {
    try{
           if(req.user.accountType !== "Instructor") {
               return res.status(401).json({
                   success:false,
                   message:'This is a protected route for Instructor only',
               });
           }
           next();
    }
    catch(error) {
       return res.status(500).json({
           success:false,
           message:'User role cannot be verified, please try again'
       })
    }
   }


//isAdmin
exports.isAdmin = async (req, res, next) => {
    try{
           if(req.user.accountType !== "Admin") {
               return res.status(401).json({
                   success:false,
                   message:'This is a protected route for Admin only',
               });
           }
           next();
    }
    catch(error) {
       return res.status(500).json({
           success:false,
           message:'User role cannot be verified, please try again'
       })
    }
   }






   

//    const jwt = require("jsonwebtoken");
// require("dotenv").config();
// const User = require("../models/User");

// //auth
// exports.auth = async (req, res, next) => {
//     try{
//         //extract token
//         const token = req.cookies.token 
//                         || req.body.token 
//                         || req.header("Authorisation").replace("Bearer ", "");

//         //if token missing, then return response
//         if(!token) {
//             return res.status(401).json({
//                 success:false,
//                 message:'TOken is missing',
//             });
//         }

//         //verify the token
//         try{
//             const decode =  jwt.verify(token, process.env.JWT_SECRET);
//             console.log(decode);
//             req.user = decode;
//         }
//         catch(err) {
//             //verification - issue
//             return res.status(401).json({
//                 success:false,
//                 message:'token is invalid',
//             });
//         }
//         next();
//     }
//     catch(error) {  
//         return res.status(401).json({
//             success:false,
//             message:'Something went wrong while validating the token',
//         });
//     }
// }

// //isStudent
// exports.isStudent = async (req, res, next) => {
//  try{
//         if(req.user.accountType !== "Student") {
//             return res.status(401).json({
//                 success:false,
//                 message:'This is a protected route for Students only',
//             });
//         }
//         next();
//  }
//  catch(error) {
//     return res.status(500).json({
//         success:false,
//         message:'User role cannot be verified, please try again'
//     })
//  }
// }


// //isInstructor
// exports.isInstructor = async (req, res, next) => {
//     try{
//            if(req.user.accountType !== "Instructor") {
//                return res.status(401).json({
//                    success:false,
//                    message:'This is a protected route for Instructor only',
//                });
//            }
//            next();
//     }
//     catch(error) {
//        return res.status(500).json({
//            success:false,
//            message:'User role cannot be verified, please try again'
//        })
//     }
//    }


// //isAdmin
// exports.isAdmin = async (req, res, next) => {
//     try{
//            if(req.user.accountType !== "Admin") {
//                return res.status(401).json({
//                    success:false,
//                    message:'This is a protected route for Admin only',
//                });
//            }
//            next();
//     }
//     catch(error) {
//        return res.status(500).json({
//            success:false,
//            message:'User role cannot be verified, please try again'
//        })
//     }
//    }