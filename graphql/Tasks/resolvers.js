const Task = require("../../models/Task");

module.exports = {
  fetchTasks: async function({ taskInput }) {
    let params = {};

    if (taskInput.responsiblePerson !== "undefined")
      params.responsiblePerson = taskInput.responsiblePerson;

    if (taskInput.createdBy !== "undefined")
      params.createdBy = taskInput.createdBy;

    console.log("taskinputxx", params);

    const tasks = await Task.find(params);

    return tasks;
  },
  addTask: async function({ taskInput }, req) {
    const task = new Task({
      userId: taskInput.userId,
      createdBy: taskInput.createdBy,
      projectId: taskInput.projectId,
      projectName: taskInput.projectName,
      responsiblePerson: taskInput.responsiblePerson,
      title: taskInput.title,
      description: taskInput.description,
      priority: taskInput.priority,
      status: taskInput.status,
      createdAt: taskInput.createdAt,
      termAt: taskInput.termAt
    });

    const storedTask = await task.save();

    return { ...storedTask._doc, _id: storedTask._id.toString() };
  },
  updateTask: async function({ taskInput }, req) {
    const _id = taskInput._id;
    const task = await Task.findOne({ _id });
    console.log("task input", taskInput);
    const data = {
      _id: taskInput.id,
      userId: taskInput.userId !== "" ? taskInput.userId : task.userId,
      createdBy:
        taskInput.createdBy !== "" ? taskInput.createdBy : task.createdBy,
      projectId:
        taskInput.projectId !== "" ? taskInput.projectId : task.projectId,
      projectName:
        taskInput.projectName !== "" ? taskInput.projectName : task.projectName,
      responsiblePerson:
        taskInput.responsiblePerson !== ""
          ? taskInput.responsiblePerson
          : task.responsiblePerson,
      title: taskInput.title !== "" ? taskInput.title : task.title,
      description:
        taskInput.description !== "" ? taskInput.description : task.description,
      priority: taskInput.priority !== "" ? taskInput.priority : task.priority,
      status: taskInput.status !== "" ? taskInput.status : task.status,
      termAt: taskInput.termAt !== "" ? taskInput.termAt : task.termAt
    };

    data.createdAt = task.createdAt;
    task.overwrite(data);
    const storedTask = await task.save();

    return { ...storedTask._doc, _id: storedTask._id };
  },
  removeTask: async function({ taskId }) {
    try {
      await Task.deleteOne({ _id: taskId });
    } catch (err) {
      const error = new Error(err);
      throw error;
    }
    return { _id: taskId };
  }
};