const Mail = require("../../models/Mail");
const tools = require("../../utils/tools");

module.exports = {
  sendMail: async function({ mailInput }, req) {
    const mail = new Mail({
      from: mailInput.from,
      to: mailInput.to,
      projectName: mailInput.projectName,
      title: mailInput.title,
      description: mailInput.description,
      attachments: mailInput.attachments,
      createdBy: mailInput.createdBy,
      createdAt: mailInput.createdAt
    });
    try {
      const storedMail = await mail.save();
      return { ...storedMail._doc, _id: storedMail._id.toString() };
    } catch (e) {
      return { errors: tools.formatErrors(e) };
    }
  }
};
