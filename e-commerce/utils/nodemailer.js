import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { welcomeEmailTemplate } from "./welcomeEmail.js";
import {orderPlacedEmailTemplate} from "./orderPlacedEmail.js"
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_MAIL,
    pass: process.env.PASSWORD, 
  },

});
// Verify mail config
transporter.verify((err, success) => {
  if (err) console.error("❌ Mail Error:", err);
  else console.log("✅ Mail server ready");
});

export const sendMail = async ({ to, name }) => {
    console.log(to,name)
  try {
    const mailOptions = {
      from: `"Fresh Fruits 🍎" <${process.env.USER_MAIL}>`,
      to,
      subject: "Registration Successful 🎉",
      html: welcomeEmailTemplate(name),
    };

    return await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("MAIL ERROR 👉", error);
    throw error;
  }
};


export const sendOrderPlacedMail = async (to, orderData) => {
  try {
    await transporter.sendMail({
      from: `"Fresh Fruits 🍎" <${process.env.USER_MAIL}>`,
      to,
      subject: "📦Your Order is Confirmed",
      html: orderPlacedEmailTemplate(orderData),
    });
  } catch (error) {
    console.error("EMAIL ERROR 👉", error);
    throw error;
  }
};
