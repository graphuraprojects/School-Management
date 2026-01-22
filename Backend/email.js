// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//     service: "gmail", 
//     auth: {
//         user: process.env.MAIL_USER,
//         pass: process.env.MAIL_PASS,
//     }
// });

// module.exports = transporter;
const Brevo = require("@getbrevo/brevo");

const apiInstance = new Brevo.TransactionalEmailsApi();

// SET API KEY
apiInstance.setApiKey(
  Brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

const sendOtpEmail = async (email, otp) => {
  try {
    const response = await apiInstance.sendTransacEmail({
      sender: {
        email: process.env.BREVO_SENDER_EMAIL,
        name: process.env.BREVO_SENDER_NAME,
      },
      to: [{ email }],
      subject: "Your OTP for Registration",
      htmlContent: `
        <h2>Email Verification</h2>
        <p>Your OTP is:</p>
        <h1 style="color:#4F46E5">${otp}</h1>
        <p>This OTP is valid for 5 minutes.</p>
      `,
    });

    return response;
  } catch (error) {
    console.error("Brevo Email Error:", error?.response?.text || error);
    throw error;
  }
};

module.exports = sendOtpEmail;