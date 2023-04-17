// const express = require("express");

// const bodyParser = require("body-parser");
// const cors = require("cors");

// const { google } = require('googleapis');

// const app = express();

// // Connect to MongoDB

// // Use body-parser and cors middleware
// app.use(bodyParser.json());
// app.use(cors());
// let Token = {}
// // const id = 123;
// // const authorizeUrl = oauth2Client.generateAuthUrl({access_type: 'offline', scope: SCOPES, state: id});

// app.get('/google/auth/callback', async (req, res) => {
//   const code = req.query.code;
//   try {
//     // Exchange the authorization code with access and refresh tokens
//     const {tokens} = await oauth2Client.getToken(code);
//     console.log(tokens);
//     Token = tokens
//     // Save the tokens to a database or file for future use
//     // ...
//     res.json({}) // redirect to a success page
//   } catch (error) {
//     console.error('Error retrieving access token', error);
//     res.json({})  // redirect to an error page
//   }
// });


  




// const CLIENT_ID = '801645468565-4ujicpj55deqbqa4pohpdtksfv956ea1.apps.googleusercontent.com';
// const CLIENT_SECRET = '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';
// const REDIRECT_URI = 'http://localhost:8040/google/auth/callback';

// const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

// const SCOPES = ['https://www.googleapis.com/auth/gmail.send'];
// const authorizeUrl = oauth2Client.generateAuthUrl({access_type: 'offline', scope: SCOPES,state:"kwlwklwkl"});

// console.log(`Visit the following URL to authorize the application: ${authorizeUrl}`);

// // Set the access token and refresh token for the client
// oauth2Client.setCredentials({
//   access_token: Token.access_token,
//   refresh_token: Token.refresh_token
// });

// // Create the Gmail API client
// const gmail = google.gmail({version: 'v1', auth: oauth2Client});

// // Define the message parameters
// const message = {
//   to: 'naveen@scizers.com',
//   subject: 'Test email from Node.js',
//   text: 'Hello world!'
// };

// // Create a message resource from the message parameters 

// const messageResource = {
//   raw: Buffer.from(
//     `To: ${message.to}\n` +
//     `Subject: ${message.subject}\n\n` +
//     `${message.text}`
//   ).toString('base64')
// };

// // Send the message using the Gmail API
// gmail.users.messages.send({
//   userId: 'me',
//   resource: messageResource
// }, (err, res) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(res);
//   }
// });