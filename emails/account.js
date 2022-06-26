// const sgMail = require('@sendgrid/mail')
import sendgridMail from "@sendgrid/mail"
const sgMail = sendgridMail

const msg = {
    to: 'osmdrcn@gmail.com', // Change to your recipient
    from: 'osmdrcn@gmail.com', // Change to your verified sender
    subject: 'TEST SENDGRID with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}

sgMail.setApiKey('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')

const sendWelcomeEmail = (email, name, confirmationCode) => {
    sgMail.send({
        to: email,
        from: 'osmdrcn@gmail.com',
        subject: 'Thanks for joining us... ',
        html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href=http://localhost:3000/verify/${confirmationCode}> Click here</a>
        </div>`,
    })
}

const requestEmail = (email, name, user) => {
    sgMail.send({
        to: email,
        from: 'osmdrcn@gmail.com',
        subject: 'Thanks for joining us... ',
        html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>You have received a request from ${user}.</p>
        <a href=http://localhost:3000/confirm/${name}> Click here</a>
        </div>`,
    })
}

const sendCancelRequestEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'osmdrcn@gmail.com',
        subject: 'Request cancelled... ',
        html: `<h1>Your request  has been cancelled... </h1>`
    })
}

export { sendWelcomeEmail, requestEmail, sendCancelRequestEmail }