import User from '@/models/userModel';
import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs'

export const sendEmail = async({email, emailType, userId} : any) => {
    try {
        //TODO : configure mail for uses
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)


        if(emailType==="VERIFY"){
          await User.findByIdAndUpdate(userId,{
            verifyToken: hashedToken,
            verifyTokenExpiry : Date.now() + 3600000
          })
        }
        else if(emailType === "RESET"){
          await User.findByIdAndUpdate(userId,{
            forgotPasswordToken: hashedToken,
            forgotPasswordTokenExpiry : Date.now() + 3600000
          })
        }

        var transport = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "1444ed4776e5c6",
            pass: "3e1644d04a3324"
          }
        });

          const mailOptions = {
            from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
            to: email, // list of receivers
            subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your password" ,
            html: `<p> Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}" > Click </a> to ${emailType === "VERIFY" ?"verify your email" :
          "reset your password"} or copy and paste the link below in your browser. 
          <br>${process.env.DOMAIN}/verifyemail?token=${hashedToken}
          </p>`
          }
          const mailResponse =  await transport.sendMail(mailOptions)
          return mailResponse
        
    } catch (error: any) {
        throw new Error("HERE MAIL"+error.message)
    }
}