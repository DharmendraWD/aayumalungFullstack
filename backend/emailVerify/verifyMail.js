
import nodemailer from "nodemailer";
import "dotenv/config";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Handlebars from "handlebars";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



export const verifyMail = (token, email) => {

const emailTemplateSource = fs.readFileSync(path.join(__dirname, "template.hbs"), "utf-8");
const template = Handlebars.compile(emailTemplateSource);
const htmlTosend = template({token:encodeURIComponent(token)});

    const  transporter = nodemailer.createTransport({
        service: "gmail",
        auth:{
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
        }
    })

    const mailConfiguration = {
        from: process.env.MAIL_USER,
        to: email,
        subject: "Email verification",
        html: htmlTosend
    }

transporter.sendMail(mailConfiguration, (err, info) => {
    if(err){
        console.log(err);
    }else{
        console.log("mail sent",info);
    }
})
}

