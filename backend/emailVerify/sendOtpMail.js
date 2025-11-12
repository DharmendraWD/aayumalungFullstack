
import nodemailer from "nodemailer";
import "dotenv/config";

export const sendOtpMail = async(email, otp) => {

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
    }
})

const mailOptions = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "OTP Reset Verification",
    html: `<p>Your OTP is ${otp}. valid for 5 mins. </p>`
}

await transporter.sendMail(mailOptions);

};