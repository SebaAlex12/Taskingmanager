const nodemailer = require("nodemailer");
const address = require("../config/keys").emailAddress;
const password = require("../config/keys").emailPassword;

module.exports = {
  sendMail: function(data) {
    console.log("mail settings", data);
    const { from, to, sender, subject, html, attachments } = data;
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
    console.log(data.createdBy);
    const mail = {
      from: from + ":",
      sender: "sender2@server.com",
      replyTo: sender,
      to: to,
      subject: subject,
      html: html
      // attachments: [
      //   {
      //     // file on disk as an attachment
      //     filename: "baklazan-ciekawostki.jpeg",
      //     path: "C:/Users/Ja/Desktop/pics/baklazan-ciekawostki.jpeg"
      //   }
      // ]
    };

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
