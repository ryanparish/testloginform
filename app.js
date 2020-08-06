const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('./public'));


app.post('/sendFeedback', (req,res) => {
    console.log("Submitting user feedback...")
    console.log("Name: " + req.body.name);
    console.log("Email: " + req.body.email);
    console.log("Feedback Type: " + req.body.feedbackType);
    console.log("Message: " + req.body.message);
    const name = req.body.name;
    const email = req.body.email;
    const feedbackType = req.body.feedbackType;
    const message = req.body.message;
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
        to: 'mrwillryan@gmail.com',
        from: 'ryan.parish@mapcoexpress.com',
        subject: 'OPS Manual Feedback',
        text: "Feedback Submitted By: " + name + "\nFrom Email: " + email + "\nFeedback Type: " + feedbackType + "\nMessage: " + message
        };
    sgMail.send(msg);
    res.send("Request Submitted Successfully. You may now close this window.");
    res.end()

});



app.listen(3003, () => {
    console.log("Server is up and listening on 3003...")
  });  

