const Comment = require("../../models/Comment");

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

    const storedComment = await comment.save();

    return { ...storedComment._doc, _id: storedComment._id.toString() };
  }
  // updateTaskAddComment: async function({ commentInput }, req) {
  //   let params = {};
  //   let comments = {};
  //   console.log("resolver", commentInput);
  //   params._id = commentInput.taskId;
  //   let storedTask = await Task.findOne(params);

  //   const comment = new Comment(commentInput);
  //   const storedComment = await comment.save();

  //   comments = await Comment.find({ taskId: commentInput.taskId });

  //   storedTask = {
  //     ...storedTask._doc,
  //     comments
  //   };

  //   console.log("stored task", storedTask);

  //   return { ...storedTask, _id: storedTask._id };
  // },
};
