const nodemailer = require("nodemailer");
const address = require("../config/keys").emailAddress;
const password = require("../config/keys").emailPassword;

module.exports = {
  sendMail: function(data) {
    const { from, to, sender, subject, html, attachments } = data;
    let absolutePathFile = data.absolutePathFile ? data.absolutePathFile : "";

    const transport = {
      host: "smtp.gmail.com", // e.g. smtp.gmail.com
      // port: 587,
      // secure: false,
      // requireTLS: true,
      auth: {
        user: address,
        pass: password
      }
    };
    let mail = {
      from: from + ":",
      sender: sender,
      replyTo: sender,
      to: to,
      subject: subject,
      html: html
    };

    if (absolutePathFile.length > 0) {
      mail.attachments = [
        {
          path: absolutePathFile
        }
      ];
    }

    let transporter = nodemailer.createTransport(transport);

    transporter.verify((error, success) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Connection success");
      }
    });

    transporter.sendMail(mail, (err, data) => {
      let response;
      // if (err) {
      //   response.json({
      //     msg: "failed"
      //   });
      // } else {
      //   response.json({
      //     msg: "mail has been send"
      //   });
      // }
    });
  }
};
