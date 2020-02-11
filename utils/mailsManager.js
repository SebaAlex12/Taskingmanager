const nodemailer = require("nodemailer");
const address = require("../config/keys").emailAddress;
const password = require("../config/keys").emailPassword;

module.exports = {
  sendMail: function(data) {
    // console.log("mail settings", data);
    const {
      from,
      to,
      sender,
      subject,
      html,
      absolutePathFile,
      attachments
    } = data;

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
    // console.log(data.createdBy);
    let mail = {
      from: from + ":",
      sender: sender,
      replyTo: sender,
      to: to,
      subject: subject,
      html: html
    };

    if (absolutePathFile.length > 0) {
      // console.log("absolute path", absolutePathFile);
      console.log("push attachment");
      mail.attachments = [
        {
          path: absolutePathFile
        }
      ];
    }

    // console.log("mail", mail);

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
