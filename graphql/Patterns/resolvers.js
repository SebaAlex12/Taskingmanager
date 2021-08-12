const Pattern = require("../../models/Pattern");
const tools = require("../../utils/tools");

module.exports = {
  fetchPatterns: async function () {
    let params = {};
    // params.patternType = patternInput.patternType;
    let patterns = await Pattern.find(params);
    // patterns = patterns.map((item) => {
    //   item.elements = JSON.parse(item.elements);
    //   return item;
    // });

    return patterns;
  },
  addPattern: async function ({ patternInput }, req) {
    const pattern = new Pattern({
      userId: patternInput.userId,
      taskId: patternInput.taskId,
      createdBy: patternInput.createdBy,
      responsiblePerson: patternInput.responsiblePerson,
      title: patternInput.title,
      description: patternInput.description,
      elements: patternInput.elements,
      type: patternInput.type,
      status: patternInput.status,
      finishedAt: patternInput.finishedAt,
      termAt: patternInput.termAt,
      createdAt: patternInput.createdAt,
    });

    try {
      const storedPattern = await pattern.save();
      return { ...storedPattern._doc, _id: storedPattern._id.toString() };
    } catch (e) {
      return { errors: tools.formatErrors(e) };
    }
  },
  updatePattern: async function ({ patternInput }, req) {
    const _id = patternInput._id;
    const pattern = await Pattern.findOne({ _id });
    const data = {
      _id: patternInput._id,
      userId: patternInput.userId ? patternInput.userId : pattern.userId,
      taskId: patternInput.taskId ? patternInput.taskId : pattern.taskId,
      createdBy: patternInput.createdBy
        ? patternInput.createdBy
        : pattern.createdBy,
      responsiblePerson: patternInput.responsiblePerson
        ? patternInput.responsiblePerson
        : pattern.responsiblePerson,
      title: patternInput.title ? patternInput.title : pattern.title,
      description: patternInput.description
        ? patternInput.description
        : pattern.description,
      elements: patternInput.elements
        ? patternInput.elements
        : pattern.elements,
      type: patternInput.type ? patternInput.type : pattern.type,
      status: patternInput.status ? patternInput.status : pattern.status,
      finishedAt: patternInput.finishedAt
        ? patternInput.finishedAt
        : pattern.finishedAt,
      termAt: patternInput.termAt ? patternInput.termAt : pattern.termAt,
      createdAt: patternInput.createdAt
        ? patternInput.createdAt
        : pattern.createdAt,
    };
    try {
      pattern.overwrite(data);
      const storedPattern = await pattern.save();
      return {
        ...storedPattern._doc,
        _id: storedPattern._id.toString(),
      };
    } catch (e) {
      return { errors: tools.formatErrors(e) };
    }
  },
  removePattern: async function ({ patternId }) {
    try {
      await Pattern.deleteOne({ _id: patternId });
    } catch (e) {
      return { errors: tools.formatErrors(e) };
    }
    return { _id: patternId };
  },
};
