// server.js
const express = require("express");
require("isomorphic-fetch");

const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");

const { google } = require("googleapis");
// const msal = require('@azure/msal-node');
const {
  ClientSecretCredential,
  InteractiveBrowserCredential,
} = require("@azure/identity");
const { Client } = require("@microsoft/microsoft-graph-client");
const app = express();
const AccesToken =
  "eyJ0eXAiOiJKV1QiLCJub25jZSI6Ik9Xd01TOVZnNzRzUXlTZi10RHJnTWk1WnVyN0FMOUQySDhBeEViYmhmR28iLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9mMWMwZTQ1Mi0xZjdlLTQzMDEtOGU4ZS1kMTU0OGI5NGU2YzEvIiwiaWF0IjoxNjgwNTI1MDU4LCJuYmYiOjE2ODA1MjUwNTgsImV4cCI6MTY4MDUyOTQxMywiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFWUUFxLzhUQUFBQXNVODRld3dZRit4VjVsZFVQNDlDVzhzT1ZFKzVlblZTdHdGNUZIV05BNmlWbURNeDBvVEt1cG5jY1k0VytQb1ljZEV3UzBOZW1QQ0dSOVY0ZHBLeWpPb2N1VlJvc055Ynp5T3RRY29HR3pZPSIsImFtciI6WyJwd2QiLCJtZmEiXSwiYXBwX2Rpc3BsYXluYW1lIjoiUmVhbEVkZ2UiLCJhcHBpZCI6IjMwMWNmZjZkLTRiMDktNDUxZS05MjkyLTEzODdiNDAxODdjOSIsImFwcGlkYWNyIjoiMSIsImZhbWlseV9uYW1lIjoiU2hhcm1hIiwiZ2l2ZW5fbmFtZSI6IkFkaXRpeWEiLCJpZHR5cCI6InVzZXIiLCJpcGFkZHIiOiIxMDEuMC40MS4xODEiLCJuYW1lIjoiQWRpdGl5YSAgU2hhcm1hIiwib2lkIjoiOWNkODQ1ZDMtYWE0ZS00YWJlLTk1NTQtYzE0ODMyYWIyNWFlIiwicGxhdGYiOiIzIiwicHVpZCI6IjEwMDMyMDAyMEQwQzQyRjMiLCJyaCI6IjAuQVQwQVV1VEE4WDRmQVVPT2p0RlVpNVRtd1FNQUFBQUFBQUFBd0FBQUFBQUFBQUE5QUZVLiIsInNjcCI6IlVzZXIuUmVhZCBwcm9maWxlIG9wZW5pZCBlbWFpbCIsInNpZ25pbl9zdGF0ZSI6WyJrbXNpIl0sInN1YiI6IlRWOXFNbWpfSmZYTDJzZkpXQ19hUUd3dVh6TEpjSE01UDlGYUVULTlVNTAiLCJ0ZW5hbnRfcmVnaW9uX3Njb3BlIjoiQVMiLCJ0aWQiOiJmMWMwZTQ1Mi0xZjdlLTQzMDEtOGU4ZS1kMTU0OGI5NGU2YzEiLCJ1bmlxdWVfbmFtZSI6ImFkaXRpeWFAc2NpemVycy5pbiIsInVwbiI6ImFkaXRpeWFAc2NpemVycy5pbiIsInV0aSI6IkZZUHJTRkdVYmtPVVBySW1wWFNHQUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbImI3OWZiZjRkLTNlZjktNDY4OS04MTQzLTc2YjE5NGU4NTUwOSJdLCJ4bXNfc3QiOnsic3ViIjoiU2ZXLV9NVWJTUk9QdWhzZGo2RmJLNGZlSTE2b211QkFhb0JCakEyOE9pUSJ9LCJ4bXNfdGNkdCI6MTU1OTEyODU2NH0.kqA1BTxbjMOczY8h1IbIQSH1rmhW43uSzFAC8VRanhDT2IXXy6LIlTEP3apdDcLlI6fVW2J48QNdme1HSwRsMdctVy4Rc3aJU5GTyn3GtpasU43vjAcscoH2IjBqZtmcmSVxxvusXqN8XHMy5OS4Fhe-9wEeMI_tbpXM9yM13x7FRBu6_vQup6CTLDqpFf1qf8cA5cQgST0WJOP5bko419O5YQQCg0fqJ_G2Anm3tTDS804sCEk7ilKpVGSkSUFMxUJyuGJ_0qL_eW1KZWgpWEXco2Clnq0U6oaXC1KmmTNwM05lZCIkm3P4GrXKEwQhOGF8NZ_T_EXwlkE61x4-Xw";
const TENANT_ID = "f1c0e452-1f7e-4301-8e8e-d1548b94e6c1";
const CLIENT_ID = "301cff6d-4b09-451e-9292-1387b40187c9";
const CLIENT_SECRET = "MhJ8Q~I3hWovbreEYbcUmM4V9JePXb_UbJJOoai4";
const REDIRECT_URI = "http://localhost:3000/login";
const AUTHORITY = "https://login.microsoftonline.com/your-tenant-id";
const AUTH_ENDPOINT = `${AUTHORITY}/oauth2/v2.0/authorize`;
const TOKEN_ENDPOINT = `${AUTHORITY}/oauth2/v2.0/token`;

const SCOPES = ["https://graph.microsoft.com/User.Read"];
const config = {
  auth: {
    clientId: "301cff6d-4b09-451e-9292-1387b40187c9",
    authority:
      "https://login.microsoftonline.com/f1c0e452-1f7e-4301-8e8e-d1548b94e6c1",
    redirectUri: "http://localhost:3000",
    clientSecret: "MhJ8Q~I3hWovbreEYbcUmM4V9JePXb_UbJJOoai4",
  },
};

//-------------------------------------

// const credential = new InteractiveBrowserCredential(
//   TENANT_ID,
//   CLIENT_ID,
//   CLIENT_SECRET
// );
// const client = Client.init({
//   authProvider: (done) => {
//     credential
//       .getToken()
//       .then((accessToken) => {
//         console.log(accessToken);
//         done(null, accessToken);
//       })
//       .catch((err) => {
//         done(err, "000sjjshjshjshjsjsjshjsh");
//       });
//   },
// });

const authorizeUrl =
  `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/authorize` +
  `?client_id=${CLIENT_ID}` +
  `&response_type=code` +
  `&redirect_uri=${REDIRECT_URI}` +
  `&response_mode=query` +
  `&scope=${encodeURIComponent(SCOPES.join(" "))}`;

// app.get("/login", async (req, res) => {
//   const code = req.query.code;
//   // const tokenRequest = {
//   //   code: code,
//   //   redirectUri: REDIRECT_URI,
//   //   scopes: SCOPES
//   // };

//   console.log("kkkkkkkkkkkkkkkkkoken Hdgh");
//   const tokenEndpoint = `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`;

//   const tokenRequestBody = {
//     grant_type: "authorization_code",
//     code: req.query.code,
//     redirect_uri: REDIRECT_URI,
//     client_id: CLIENT_ID,
//     client_secret: CLIENT_SECRET,
//   };
//   const config = {
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//   };

//   const tokenResponse = await axios.post(
//     tokenEndpoint,
//     new URLSearchParams(tokenRequestBody).toString(),
//     config
//   );
//   // const tokenResponse = await axios.post(tokenEndpoint, tokenRequestBody);
//   console.log(tokenResponse.data);
//   const accessToken = tokenResponse.data.access_token;
//   // const refreshToken = tokenResponse.data.refresh_token;


// });
console.log(`Please authorize this app by visiting: ${authorizeUrl}`);
async function sendEmail(subject, body, recipientEmailAddress, accessToken) {
  try {
    const response = await axios({
      method: 'POST',
      url: 'https://graph.microsoft.com/v1.0/me/sendMail',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      data: {
        message: {
          subject: subject,
          body: {
            contentType: 'Text',
            content: body
          },
          toRecipients: [
            {
              emailAddress: {
                address: 'sharmaaditya14Jul@gmail.com'
              }
            }
          ]
        },
        saveToSentItems: true
      }
    });

    console.log('Email sent successfully.');
  } catch (error) {
    console.log(error)
    console.error('Error sending email:', error.message);
  }
}

sendEmail("Hello","Body oulook",'sharmaaditya14Jul@gmail.com',AccesToken)
// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
