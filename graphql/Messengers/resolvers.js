const Messenger = require("../../models/Messenger");
const tools = require("../../utils/tools");

module.exports = {
  fetchMessengersByName: async function({ creator, name }) {
    const messengers = await Messenger.find().or([
      { from: creator },
      { to: { $regex: name, $options: "i" } }
    ]);
    return messengers;
  },
  addMessenger: async function({ messengerInput }, req) {
    // console.log("resolver", messengerInput);
    const messenger = new Messenger({
      from: messengerInput.from,
      to: messengerInput.to,
      msg: messengerInput.msg,
      createdAt: messengerInput.createdAt
    });
    try {
      const storedMessenger = await messenger.save();
      return { ...storedMessenger._doc, _id: storedMessenger._id.toString() };
    } catch (e) {
      return { errors: tools.formatErrors(e) };
    }
  }
};
