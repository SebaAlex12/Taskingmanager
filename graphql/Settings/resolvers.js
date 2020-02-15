const Settings = require("../../models/Settings");
const tools = require("../../utils/tools");

module.exports = {
  fetchSettings: async function() {
    const settings = await Settings.find();
    return settings[0];
  },
  updateSettings: async function({ settingsInput }, req) {
    const data = {
      _id: settingsInput._id,
      mailingDate: settingsInput.mailingDate
    };

    try {
      const settings = await Settings.findOne({ _id: data._id });
      settings.overwrite(data);
      const storedSettings = await settings.save();
      return {
        ...storedSettings._doc,
        _id: storedSettings._id.toString(),
        mailingDate: storedSettings.mailingDate
      };
    } catch (e) {
      return { errors: tools.formatErrors(e) };
    }
  }
};
