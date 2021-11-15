const nodemailer = require('nodemailer')
require('dotenv').config()

const transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
})

const welcomeEmail = (email, name) => {
    const options = {
        from: process.env.EMAIL,
        to: email,
        subject: "Welcome to Cura!",
        text: `Hi ${name}, \n\n This is really exciting: Welcome to Cura. We're so happy you're here. \n\n We founded Cura to make your health record easily accessible to you because your health is your greatest wealth. To help you get started, we recommend completing your profile. \n\n We hope you enjoy the full capabilities of Cura and you tell a friend about it. \n\n\n Cheers, \n Cura`
    }

    transporter.sendMail(options)
}


const cancelEmail = (email, name) => {
    const options = {
        from: process.env.EMAIL,
        to: email,
        subject: "We are sad to see you go",
        text: `Hi ${name}, \n\n This email confirms that your Cura account has been deleted. We're really sad to see you go, but thanks for giving us a try. \n\n We'd love to know why you deleted your account. We're always looking for ways to get better. If you have feedback you think will be useful, please reply this mail. \n\n Thanks again for being a customer. \n\n\n The crew at Cura`
    }

    transporter.sendMail(options)
}


const otpEmail = (email, name, otp) => {
    const options = {
        from: process.env.EMAIL,
        to: email,
        subject: "Your verification code",
        text: `Hi ${name}, \n\n You requested permission to be granted to your health practitioner. Give them this verification code below: \n\n ${otp}. \n\n The code expires in 2 minutes.`
    }

    transporter.sendMail(options)
}


module.exports = { welcomeEmail, cancelEmail, otpEmail }