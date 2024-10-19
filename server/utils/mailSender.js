
const nodemailer = require('nodemailer');

// emil ,:-> jis bhi bando ke mobile pe email send karn he , uska ka email do, jo bhi email receive karega , uska email
const mailSender=async (email,title,body)=>{
    try{
       
        let transporter=nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            }
        })

        let info=await transporter.sendMail({
            from: 'StudyNotion || Edutech -by Krishan',
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`
        })
       console.log("mail send succesfully");
        console.log(info);
        return info;
    }
    catch(error)
    {
        console.error("Error sending email:", error.message);
     
    }
}
module.exports=mailSender;



// email :-> jikso bhi email send karna he uska email
// title 
// body in the emial
//  MAIL_USER ME WO HOGA JIS BHI EMAIL ID SE MAIL SEND KARNA CHAHTE HE4
// MAIL_HOST SMTP.GMAIL.COM
// MAIL_PASS  , THE PASS WE NEED TO PROVIDE , TAKEN FROM GOOGLE ACCONT


// flow , signup karo , mail verify karo , then entry in DB , so use 




// const nodemailer = require("nodemailer");

// const mailSender = async (email, title, body) => {
//     try{
//             let transporter = nodemailer.createTransport({
//                 host:process.env.MAIL_HOST,
//                 auth:{
//                     user: process.env.MAIL_USER,
//                     pass: process.env.MAIL_PASS,
//                 }
//             })


//             let info = await transporter.sendMail({
//                 from: 'StudyNotion || CodeHelp - by Babbar',
//                 to:`${email}`,
//                 subject: `${title}`,
//                 html: `${body}`,
//             })
//             console.log(info);
//             return info;
//     }
//     catch(error) {
//         console.log(error.message);
//     }
// }


// module.exports = mailSender;