const Mail = require("../../models/Mail");
const tools = require("../../utils/tools");
const { sendMail } = require("../../utils/mailsManager");

module.exports = {
  fetchMails: async function() {
    let mails = await Mail.find(null, null, { sort: { name: 1 } });
    return mails;
  },
  addMail: async function({ mailInput }, req) {
    const mail = new Mail({
      from: mailInput.from,
      to: mailInput.to,
      projectName: mailInput.projectName,
      title: mailInput.title,
      description: mailInput.description,
      absolutePathFile: mailInput.absolutePathFile,
      attachments: mailInput.attachments,
      createdBy: mailInput.createdBy,
      createdAt: mailInput.createdAt
    });
    try {
      sendMail({
        from: mailInput.from,
        to: mailInput.to,
        sender: mailInput.from,
        subject: mailInput.title,
        html: mailInput.description,
        absolutePathFile: mailInput.absolutePathFile,
        attachments: mailInput.attachments
      });
      const storedMail = await mail.save();
      return { ...storedMail._doc, _id: storedMail._id.toString() };
    } catch (e) {
      return { errors: tools.formatErrors(e) };
    }
  }
};
