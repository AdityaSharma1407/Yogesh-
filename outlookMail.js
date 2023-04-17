// const msal = require('@azure/msal-node');
// const config = {
//     auth: {
//         clientId: '<your client id>',
//         authority: 'https://login.microsoftonline.com/common',
//         clientSecret: '<your client secret>'
//     }
// };
// const cca = new msal.ConfidentialClientApplication(config);
// const scopes = ['https://graph.microsoft.com/.default'];
// cca.acquireTokenSilent({ scopes })
//     .then((result) => {
//         console.log(result.accessToken);
//     })
//     .catch((error) => {
//         console.log(error);
//     });



//     const { Client } = require('@microsoft/microsoft-graph-client');
// const g= Client.init({
//     authProvider: (done)raphClient  => {
//         done(null, accessToken);
//     }
// });
// const message = {
//     subject: 'Test email',
//     toRecipients: [
//         {
//             emailAddress: {
//                 address: 'recipient@example.com'
//             }
//         }
//     ],
//     body: {
//         content: 'This is a test email sent using the Microsoft Graph API.',
//         contentType: 'text'
//     }
// };
// graphClient.api('/me/sendMail')
//     .post({ message }, (error, response) => {
//         if (error) {
//             console.log(error);
//         } else {
//             console.log(response);
//         }
//     });
