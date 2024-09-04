import nodemailer from "nodemailer"


export const sendEmail = async(to, subject, html) => {
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"",
            pass:"",
        },
    })
    const info = await transporter.sendEmail({
    from:"",
    to: to ? to:"",
    subject: subject ? subject:"hello",
    html:html ? html:"hello world?",
})
if (info.accepted.length){
    return "true" 
}
return false

} 




// Function to send email with OTP
export const sendOTPEmail = async (email, otp) => {
    // Configure nodemailer (update with your email service provider details)
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })

    // Email content
    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset OTP',
        text: `Your OTP for password reset is: ${otp}`
    }

    // Send email
    await transporter.sendMail(mailOptions)
}