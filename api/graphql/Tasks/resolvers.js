const moment = require("moment");
const _ = require("lodash");
const fs = require("fs");
const fsPromises = fs.promises;

const { sendMail } = require("../../utils/mailsManager");
const Task = require("../../models/Task");
const Comment = require("../../models/Comment");
const User = require("../../models/User");
const tools = require("../../utils/tools");
// fetchTasks and fetchTasksByLoggedUserProjects has to be almost the same
module.exports = {
  fetchTasks: async function ({ taskInput }) {

        let params = {};

        if (taskInput.projectName && taskInput.projectName !== "undefined")
          params.projectName = taskInput.projectName;

        if (taskInput.status && taskInput.status !== "undefined")
          params.status = taskInput.status;

        if (
          taskInput.responsiblePerson &&
          taskInput.responsiblePerson !== "undefined"
        )
          params.responsiblePerson = taskInput.responsiblePerson;

        if (taskInput.createdBy && taskInput.createdBy !== "undefined")
          params.createdBy = taskInput.createdBy;

    try{

        let tasks = await Task.find(params).sort({ createdAt: "desc" });

        if(tasks.length > 0){

          const newTasksPromises = tasks.map(async(task) => {
              const comments = await Comment.find({ taskId: task._id });
                let newTask = {
                  _id: task._id,
                  userId: task.userId,
                  createdBy: task.createdBy,
                  projectId: task.projectId,
                  projectName: task.projectName,
                  responsiblePerson: task.responsiblePerson,
                  title: task.title,
                  description: task.description,
                  priority: task.priority,
                  responsiblePersonLastComment: task.responsiblePersonLastComment,
                  createdAt: task.createdAt,
                  finishedAt: task.finishedAt,
                  termAt: task.termAt,
                  status: task.status,
                  errors: task.errors,
                  comments: comments.length > 0 ? comments : []
                }; 
                return newTask;
          });

          const newTasks = await Promise.all(newTasksPromises).then((results) => {
              return results;
          }).catch((error) => {
              console.log('error',error);
          });

          return newTasks;
        }
              
      }catch(e){
          return { errors: tools.formatErrors(e) };
      }
  },
  fetchTasksByLoggedUserProjects: async function ({ taskInput, projects }) {
    let params = {};
    const list = projects.split(",");
    const pregmatch = list.map((item) => new RegExp(item));

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

    let tasks = await Task.find(params)
      .sort({ createdAt: "desc" })
      .or([
        {
          projectName: {
            $in: pregmatch,
          },
        },
      ]);

    const newTasks = tasks.map(async (task) => {
      let path = "./client/public/files/tasks/" + task._id;
      if (fs.existsSync(path)) {
        const files = await fsPromises.readdir(path);
        task = {
          ...task._doc,
          files: files.filter((file) => file != "mini"),
        };
      } else {
        task.files = [];
      }
      return task;
    });

    return newTasks;
  },
  addTask: async function ({ taskInput }, req) {
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
      termAt: taskInput.termAt,
      mailRemainderData: null,
    });

    // const taskExists = await Task.findOne({
    //   title: taskInput.title,
    //   projectName: taskInput.projectName,
    // });

    // if (taskExists) {
      // const e = new Error(
      //   "Task with this title and project name already exists"
      // );
      // return { errors: "Task with this title and project name already exists" };
    // }

    try {
      const storedTask = await task.save();
      return { ...storedTask._doc, _id: storedTask._id.toString() };
    } catch (e) {
      return { errors: tools.formatErrors(e) };
    }
  },
  updateTask: async function ({ taskInput }, req) {
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
          ? tools.stringToBoolean(taskInput.responsiblePersonLastComment)
          : task.responsiblePersonLastComment,
      termAt: taskInput.termAt !== "" ? taskInput.termAt : task.termAt,
      mailRemainderData:
        taskInput.mailRemainderData.length > 5
          ? taskInput.mailRemainderData
          : null,
    };
    data.createdAt = task.createdAt;
    try {
      task.overwrite(data);
      let storedTask = await task.save();
      let path = "./client/public/files/tasks/" + storedTask._id;
      if (fs.existsSync(path)) {
        const files = await fsPromises.readdir(path);

        storedTask = {
          ...storedTask._doc,
          files: files.filter((file) => file != "mini"),
        };
      } else {
        storedTask = {
          ...storedTask._doc,
          files: [],
        };
      }
      return { ...storedTask, _id: storedTask._id.toString() };
    } catch (e) {
      return { errors: tools.formatErrors(e) };
    }
  },
  sendMailingTask: async function () {
    try {
      const presentDay = moment(new Date(), "YYYY-MM-DD HH:mm:ss").format();
      const yesterday = moment(
        new Date(new Date().setDate(new Date().getDate() - 1)),
        "YYYY-MM-DD HH:mm:ss"
      ).format();
      const tenDaysAgo = moment(
        new Date(new Date().setDate(new Date().getDate() - 5)),
        "YYYY-MM-DD HH:mm:ss"
      ).format();

      // collect every task wich has date from ten last days mail reminder
      const tasks = await Task.find({
        mailRemainderData: { $gte: tenDaysAgo, $lte: yesterday },
      });

      if (tasks.length > 0) {
        tasks.forEach(async (task) => {
          const senderUser = await User.find({ name: task.createdBy });
          const reciverUser = await User.find({
            name: task.responsiblePerson,
          });
          const html =
            "<label style='display:block; font-weight:bold; font-size:14px;padding:10px 0px;'>Przypomnienie o zadaniu:</label><table style='font-size:12px;border:1px solid grey'><tr><th style='padding:10px 20px;background-color:grey;border:1px solid grey;color:#fff'>Nazwa</th><th style='padding:10px 20px;background-color:grey;border:1px solid grey;color:#fff'>Projekt</th><th style='padding:10px 20px;background-color:grey;border:1px solid grey;color:#fff'>Priorytet</th><th style='padding:10px 20px;background-color:grey;border:1px solid grey;color:#fff'>Zlecający</th><th style='padding:10px 20px;background-color:grey;border:1px solid grey;color:#fff'>termin</th><th style='padding:10px 20px;background-color:grey;border:1px solid grey;color:#fff'>Opis</th></tr><tr><td style='padding:10px 20px;border:1px solid grey;'>" +
            task.title +
            "</td><td style='padding:10px 20px;border:1px solid grey;'>" +
            task.projectName +
            "</td><td style='padding:10px 20px;border:1px solid grey;'>" +
            task.priority +
            "</td><td style='padding:10px 20px;border:1px solid grey;'>" +
            task.createdBy +
            "</td><td style='padding:10px 20px;border:1px solid grey;'>" +
            task.termAt +
            "</td><td style='padding:10px 20px;border:1px solid grey;'>" +
            task.description +
            "</td></tr></table>";
          sendMail({
            from: senderUser[0].email,
            to: reciverUser[0].email,
            sender: task.createdBy,
            subject: "Zadanie do wykonania: " + task.title,
            html,
            createdBy: task.createdBy,
          });

          task.mailRemainderData = presentDay;
          task.updateOne(
            { _id: task._id },
            { $set: { mailReminderData: presentDay } }
          );
          await task.save();
          return {};
        });
      }
      return {};
    } catch (e) {
      return { errors: tools.formatErrors(e) };
    }
  },
  removeTask: async function ({ taskId }) {
    try {
      await Task.deleteOne({ _id: taskId });
    } catch (e) {
      return { errors: tools.formatErrors(e) };
    }
    return { _id: taskId };
  },
};
