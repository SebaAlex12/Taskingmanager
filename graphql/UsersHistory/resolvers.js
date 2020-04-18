const UsersHistory = require("../../models/UserHistory");
const tools = require("../../utils/tools");

module.exports = {
  fetchUsersHistory: async function ({ dataInput }) {
    const result = await UsersHistory.find(dataInput, null, {
      sort: { createdAt: 1 },
    });
    return result;
  },
  addUserHistory: async function ({ dataInput }, req) {
    const data = {
      userId: dataInput.userId,
      userName: dataInput.userName,
      taskCreatedBy: dataInput.taskCreatedBy,
      taskProjectName: dataInput.taskProjectName,
      taskTitle: dataInput.taskTitle,
      event: dataInput.event,
      createdAt: dataInput.createdAt,
    };
    const model = new UsersHistory(data);
    try {
      const storedUserHistory = await model.save();
      return {
        ...storedUserHistory._doc,
        _id: storedUserHistory._id.toString(),
      };
    } catch (e) {
      return { errors: tools.formatErrors(e) };
    }
  },
};
