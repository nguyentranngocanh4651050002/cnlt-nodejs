const sendEmail =
require("../utils/emailHelper");

const sendContactMail = async (
    email,
    subject,
    content
) => {

    return await sendEmail(
        email,
        subject,
        content
    );

};

module.exports = {
    sendContactMail
};