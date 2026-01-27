const moment = require("moment");
const _ = require("lodash");
const fs = require("fs");
const fsPromises = fs.promises;

const { sendMail } = require("../../utils/mailsManager");
const Task = require("../../models/Task");
const Comment = require("../../models/Comment");
const User = require("../../models/User");
const tools = require("../../utils/tools");

module.exports = {
  fetchTasks: async function ({ taskInput }) {
console.log('fetch tasks');
        let params = [
            { "responsiblePersonId":taskInput.responsiblePersonId},{"createdById":taskInput.createdById}
          ];
console.log('params',params);
    try{

        let tasks = await Task.find().or(params).sort({ createdAt: "desc" });

        if(tasks.length > 0){

          const newTasksPromises = tasks.map(async(task) => {
            
              const comments = await Comment.find({ taskId: task._id });
              
                const newTask = {
                  _id: task._id,
                  userId: task.userId,
                  createdById: task.createdById,
                  projectId: task.projectId,
                  projectName: task.projectName,
                  responsiblePersonId: task.responsiblePersonId,
                  title: task.title,
                  description: task.description,
                  priority: task.priority,
                  responsiblePersonLastCommentId: task.responsiblePersonLastCommentId,
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
            console.log('fetch data results',results);
              return results;
          }).catch((e) => {
              return { errors: [{path: 'Tasks fetch', message : 'Błąd serwera - status 500' }] }
          });

          return newTasks;
        }
              
      }catch(error){
          return { errors: tools.formatErrors(error) };
      }
  },
  fetchTasksByLoggedUserProjects: async function ({ taskInput, projects }) {
    let params = {};
    const list = projects.split(",");
    const pregmatch = list.map((item) => new RegExp(item));

    if (taskInput.projectName && taskInput.projectName !== "undefined")
      params.projectName = taskInput.projectName;

    if (
      taskInput.responsiblePersonId &&
      taskInput.responsiblePersonId !== "undefined"
    )
      params.responsiblePersonId = taskInput.responsiblePersonId;

    if (taskInput.createdById && taskInput.createdById !== "undefined")
      params.createdById = taskInput.createdById;

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

    const data = {
      userId: taskInput.userId,
      createdById: taskInput.createdById,
      projectId: taskInput.projectId,
      projectName: taskInput.projectName,
      responsiblePersonId: taskInput.responsiblePersonId,
      title: taskInput.title,
      description: taskInput.description,
      priority: taskInput.priority,
      responsiblePersonLastCommentId: taskInput.responsiblePersonLastCommentId,
      status: taskInput.status,
      createdAt: taskInput.createdAt,
      termAt: taskInput.termAt,
      mailRemainderData: null,
    };

    const task = new Task(data);

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
      return { errors: [{path: 'Tasks add', message : e.message }] };
    }
  },
  updateTask: async function ({ taskInput }, req) {
    const _id = taskInput._id;
    const task = await Task.findOne({ _id });
    const data = {
      _id: taskInput._id,
      userId: taskInput.userId !== "" ? taskInput.userId : task.userId,
      createdById:
        taskInput.createdById !== "" ? taskInput.createdById : task.createdById,
      projectId:
        taskInput.projectId !== "" ? taskInput.projectId : task.projectId,
      projectName:
        taskInput.projectName !== "" ? taskInput.projectName : task.projectName,
      responsiblePersonId:
        taskInput.responsiblePersonId !== ""
          ? taskInput.responsiblePersonId
          : task.responsiblePersonId,
      title: taskInput.title !== "" ? taskInput.title : task.title,
      description:
        taskInput.description !== "" ? taskInput.description : task.description,
      priority: taskInput.priority !== "" ? taskInput.priority : task.priority,
      status: taskInput.status !== "" ? taskInput.status : task.status,
      responsiblePersonLastCommentId:
        taskInput.responsiblePersonLastCommentId !== ""
          ? tools.stringToBoolean(taskInput.responsiblePersonLastCommentId)
          : task.responsiblePersonLastCommentId,
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
      // console.log('resolver error', e.message);
      return { errors: [{path: 'Tasks update', message : 'Błąd serwera - status 500' }] };
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
          const senderUser = await User.find({ name: task.createdById });
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
            task.createdById +
            "</td><td style='padding:10px 20px;border:1px solid grey;'>" +
            task.termAt +
            "</td><td style='padding:10px 20px;border:1px solid grey;'>" +
            task.description +
            "</td></tr></table>";
          sendMail({
            from: senderUser[0].email,
            to: reciverUser[0].email,
            sender: task.createdById,
            subject: "Zadanie do wykonania: " + task.title,
            html,
            createdById: task.createdById,
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
      return { errors: [{path: 'Tasks remove', message : 'Błąd serwera - status 500' }] };
    }
    return { _id: taskId };
  },
};
