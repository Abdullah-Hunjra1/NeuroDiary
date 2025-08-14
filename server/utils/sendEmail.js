import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER, // Your Gmail
        pass: process.env.EMAIL_PASS  // App password
    }
});

export const sendEmail = async (to, subject, text) => {
    await transporter.sendMail({
        from: `"NeuroDiary" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        text
    });
};
