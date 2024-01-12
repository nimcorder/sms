const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
const port = 3000;

// Twilio credentials
const accountSid = 'YOUR_SID';
const authToken = 'YOUR_AUTH_TOKEN';
const twilioClient = twilio(accountSid, authToken);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.post('/send-sms', (req, res) => {
  const { phoneNumber, message } = req.body;

  // Replace with your Twilio phone number
  const senderPhoneNumber = 'YOUR_TWILIO_PHONE_NUMBER';

  twilioClient.messages
    .create({
      body: message,
      from: senderPhoneNumber,
      to: phoneNumber,
    })
    .then((message) => {
      console.log(`Message sent: ${message.sid}`);
      res.send('SMS sent successfully');
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Failed to send SMS');
    });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
