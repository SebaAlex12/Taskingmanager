const _ = require("lodash");
const fs = require("fs");
const fsPromises = fs.promises;

const Task = require("../../models/Task");
const tools = require("../../utils/tools");
// fetchTasks and fetchTasksByLoggedUserProjects has to be almost the same
module.exports = {
  fetchTasks: async function({ taskInput }) {
    let params = {};
    // console.log("fetch tasks input", taskInput);

    if (taskInput.projectName && taskInput.projectName !== "undefined")
      params.projectName = taskInput.projectName;

    if (
      taskInput.responsiblePerson &&
      taskInput.responsiblePerson !== "undefined"
    )
      params.responsiblePerson = taskInput.responsiblePerson;

    if (taskInput.createdBy && taskInput.createdBy !== "undefined")
      params.createdBy = taskInput.createdBy;

    let tasks = await Task.find(params);

    const newTasks = tasks.map(async task => {
      let path = "./client/public/files/tasks/" + task._id;
      if (fs.existsSync(path)) {
        const files = await fsPromises.readdir(path);
        task = {
          ...task._doc,
          files: files.filter(file => file != "mini")
        };
      } else {
        task.files = [];
      }
      return task;
    });

    return newTasks;
  },
  fetchTasksByLoggedUserProjects: async function({ taskInput, projects }) {
    let params = {};
    const list = projects.split(",");
    const pregmatch = list.map(item => new RegExp(item));

    if (taskInput.projectName && taskInput.projectName !== "undefined")
      params.projectName = taskInput.projectName;

    if (
      taskInput.responsiblePerson &&
      taskInput.responsiblePerson !== "undefined"
    )
      params.responsiblePerson = taskInput.responsiblePerson;

    if (taskInput.createdBy && taskInput.createdBy !== "undefined")
      params.createdBy = taskInput.createdBy;

    // let tasks = await Task.find(params);

    let tasks = await Task.find(params).or([
      {
        projectName: {
          $in: pregmatch
        }
      }
    ]);

    // console.log("tasks", tasks);

    const newTasks = tasks.map(async task => {
      let path = "./client/public/files/tasks/" + task._id;
      if (fs.existsSync(path)) {
        const files = await fsPromises.readdir(path);
        task = {
          ...task._doc,
          files: files.filter(file => file != "mini")
        };
      } else {
        task.files = [];
      }
      return task;
    });

    return newTasks;
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
      responsiblePersonLastComment: taskInput.responsiblePersonLastComment,
      status: taskInput.status,
      createdAt: taskInput.createdAt,
      termAt: taskInput.termAt
    });

    const taskExists = await Task.findOne({
      title: taskInput.title,
      projectName: taskInput.projectName
    });

    if (taskExists) {
      // const e = new Error(
      //   "Task with this title and project name already exists"
      // );
      return { errors: "Task with this title and project name already exists" };
    }

    try {
      const storedTask = await task.save();
      return { ...storedTask._doc, _id: storedTask._id.toString() };
    } catch (e) {
      return { errors: tools.formatErrors(e) };
    }
  },
  updateTask: async function({ taskInput }, req) {
    // console.log("resolver input", taskInput);
    const _id = taskInput._id;
    const task = await Task.findOne({ _id });
    const data = {
      _id: taskInput._id,
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
      responsiblePersonLastComment:
        taskInput.responsiblePersonLastComment !== ""
          ? stringToBoolean(taskInput.responsiblePersonLastComment)
          : task.responsiblePersonLastComment,
      termAt: taskInput.termAt !== "" ? taskInput.termAt : task.termAt
    };
    // console.log("resolver", data);
    data.createdAt = task.createdAt;
    try {
      task.overwrite(data);
      let storedTask = await task.save();
      // console.log("task resolver", storedTask);
      let path = "./client/public/files/tasks/" + storedTask._id;
      if (fs.existsSync(path)) {
        const files = await fsPromises.readdir(path);

        storedTask = {
          ...storedTask._doc,
          files: files.filter(file => file != "mini")
        };
        // console.log("update stored task", storedTask);
      } else {
        storedTask = {
          ...storedTask._doc,
          files: []
        };
      }
      // console.log("update stored task", storedTask);
      return { ...storedTask, _id: storedTask._id.toString() };
    } catch (e) {
      return { errors: tools.formatErrors(e) };
    }
  },
  removeTask: async function({ taskId }) {
    try {
      await Task.deleteOne({ _id: taskId });
    } catch (e) {
      return { errors: tools.formatErrors(e) };
    }
    return { _id: taskId };
  }
};

function stringToBoolean(val) {
  var a = {
    true: true,
    false: false
  };
  return a[val];
}
