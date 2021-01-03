const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRIDAPIKEY)

const sendWelcomeEmail = (email, name) => {
    sgMail
    .send({
                to:email,
                from:'emilio3scano@gmail.com',
                subject:'Welcome to Task Manager',
                text:`Welcome to the app, ${name}. Let me know how you are getting along with the app.`,
            })
    .then(() => {}, error => {
      console.error(error);
   
      if (error.response) {
        console.error(error.response.body)
      }
    });
    
}
const sendDeleteAccount = (email, name) => {
    sgMail
    .send({
                to:email,
                from:'emilio3scano@gmail.com',
                subject:'Sad to see you go from to Task Manager',
                text:`Thanks for using Task App, ${name}. Please let me know why you left the app.`,
            })
    .then(() => {}, error => {
      console.error(error);
   
      if (error.response) {
        console.error(error.response.body)
      }
    });
    
}
module.exports = {
    sendWelcomeEmail,
    sendDeleteAccount
}