const express=require("express");
const app=express();
// krishna
// get all the routes
const userRoutes=require("./routes/User");
const profileRoutes=require("./routes/Profile");
const paymentRoutes=require("./routes/Payments");
const courseRoutes=require("./routes/Course");

// coonect all the connection
const database=require("./config/database");
const cookieParser=require("cookie-parser");
const cors=require('cors');     // as we want our backend entertain the frontedn req
const{cloudinaryConnect}=require("./config/cloudinary");
const fileUpload=require("express-fileupload");
const dotenv=require("dotenv");
dotenv.config();


const PORT=process.env.PORT || 4000;

// databse connect
database.connect();

// middleware
app.use(express.json());  // now i can pass json as file
app.use(cookieParser());  // as middleware add

app.use(
    cors({
        origin:"http://localhost:3000" ,
        credentials: true,
    })
)

// fileupload bala middlewaare
app.use(
    fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp",   
    })
)

//cloudinary connect
cloudinaryConnect();

// routes mount
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/course",courseRoutes);
app.use("/api/v1/payment",paymentRoutes);


// default routes
app.get("/",(req,res)=>{
    return res.json({
    success:true,
    message:'your srver is up and running'
    })
})

// now  apne serve ko actiavte kari
app.listen(PORT,()=>{
    console.log(`app is runnin at ${PORT}`);
})
