const Settings = require("../../models/Settings");

module.exports = {
  fetchSettings: async function() {
    let settings = await Settings.find();
    return settings;
  },
  updateSettings: async function({ settingsInput }, req) {
    const settings = await Settings.find();
    const data = {
      _id: settingsInput._id,
      mailingDate: settingsInput.mailingDate
    };
    try {
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
