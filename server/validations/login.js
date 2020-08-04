const nodemailer = require('nodemailer');
var {email,pass} = require('../config/mail');

module.exports.otpupdate = (to,otp)=>{
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        secure: false,
        auth: {
            type: "login",
            user: email,
            pass: pass
        }
    });
    var mail = {
        from: email,
        to: to,
        subject: "verify account",
         text: `Enter this otp to check Patient details , \nE-mail : ${to}\nOTP : ${otp}` 
    };
    transporter.sendMail(mail,function(err,info){
        if(err){
            console.log(err);
        }
        else {
            console.log('email sent to :'+ to);
        }

    });
}