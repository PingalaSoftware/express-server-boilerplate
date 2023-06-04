const mailChimpTransactional = require('@mailchimp/mailchimp_transactional');

const config = require('../../config/config');
const logger = require('../../config/logger');

const mailChimp = mailChimpTransactional(config.email.mailChimpAPIKey);

/**
 * Log token
 * @param {string} email
 * @param {string} token
 */
module.exports.emailLog = (email, token) => {
  logger.info(email, token);
};

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendEmail = async ({ to, subject, text, html }) => {
  const msg = { from: config.email.from, to, subject };
  if (text) msg.text = text;
  else if (html) msg.html = html;

  try {
    await mailChimp.messages.send({ message: msg });
  } catch (error) {
    if (error.response) logger.error(error.response.body);
    else logger.error(error);
  }
};

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendResetPasswordEmail = async (to, token) => {
  const subject = 'Reset password';
  const resetPasswordUrl = `${config.email.smtp.frontEndLink}/reset-password?token=${token}`;

  const text = `Dear user,
To reset your password, click on this link: ${resetPasswordUrl}
If you did not request any password resets, then ignore this email.`;
  await sendEmail({ to, subject, text });
};

/**
 * Send verification email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendVerificationEmail = async (to, token) => {
  const subject = 'Email Verification';
  const verificationEmailUrl = `${config.email.smtp.frontEndLink}/verify-email?token=${token}`;

  const text = `Dear user,
To verify your email, click on this link: ${verificationEmailUrl}
If you did not create an account, then ignore this email.`;
  await sendEmail({ to, subject, text });
};

module.exports = {
  sendEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
};
