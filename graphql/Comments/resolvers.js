const Comment = require("../../models/Comment");
const tools = require("../../utils/tools");

module.exports = {
  fetchComments: async function({ commentInput }) {
    const comments = await Comment.find({ taskId: commentInput.taskId });
    return comments;
  },
  addComment: async function({ commentInput }, req) {
    const comment = new Comment({
      taskId: commentInput.taskId,
      userId: commentInput.userId,
      createdBy: commentInput.createdBy,
      description: commentInput.description,
      createdAt: commentInput.createdAt
    });
    try {
      const storedComment = await comment.save();
      return { ...storedComment._doc, _id: storedComment._id.toString() };
    } catch (e) {
      return { errors: tools.formatErrors(e) };
    }
  },
  removeComments: async function({ taskId }) {
    try {
      await comment.deleteMany({ taskId: taskId });
    } catch (e) {
      return { errors: tools.formatErrors(e) };
    }
    return { _id: taskId };
  }
};
