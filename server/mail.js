var nodemailer = require('nodemailer');


// create reusable transporter object using the default SMTP transport
// please change to your smtp account
export const transporter = nodemailer.createTransport('smtps://user%40gmail.com:pass@smtp.gmail.com');


// setup e-mail data with unicode symbols
export const mailOptions = {
    from: '"mike wong 👥" <mike@no-reply.mikewong.com>', // sender address
    to: 'eric@lynkpeople.com, test@gmail.com', // list of receivers // <<-- !!!!!!!   please make sure the receivers correct
    subject: 'Hello ✔', // Subject line (default)
    text: 'Hello world 🐴', // plaintext body (default)
    html: '<b>Hello world 🐴</b>' // html body (default)
};
