const express = require('express');
const router = express.Router();

// Models
const TaskModel = require('../models/Task');
const ProjectModel = require('../models/Project');
const UserModel = require('../models/User');
const MailModel = require('../models/Mail');
const CommentModel = require('../models/Comment');

const getAllUsers = async() => {

    const promise = new Promise(async(resolve, reject) => {
            try{
                const users = await UserModel.find({}).lean();
                resolve(users);
            }catch(error){
                reject({error:error});
            }
    });

    return promise;

}

const getAllProjects = async() => {
    const promise = new Promise(async(resolve,reject)=>{
        try{
            const projects = await ProjectModel.find({}).lean();
            resolve(projects);
        }catch(error){
            reject({error:error});
        }
    });
    return promise;
};

const getAllTasks = async() => {
    const promise = new Promise(async(resolve,reject)=> {
        try{
            const tasks = await TaskModel.find({}).lean();
            resolve(tasks);
        }catch(error){
            reject(error);
        }
    })
    return promise;
}

const updateUsersList = async(users,projects) => {
        
    // const promise = new Promise(async(resolve,reject) => {
        try{
               const promises = users.forEach(async(user) => {
                    // console.log('user',user);
                    const userProjectsName = user.projects.split(',');
                    let userProjectsId = [];
                    userProjectsName.forEach((name)=>{
                        const project = projects.find(item=>item.name===name);

                        if(project){
                            userProjectsId.push(project._id);
                        }

                    });

                    const userProjectsString = userProjectsId.join(',');
                    const update = await UserModel.findOneAndUpdate({ _id: user._id },{ projects: userProjectsString });
                    console.log('updated collection:',update);

                });

                const result = await Promise.all(promises);

                console.log('result',result);

            }catch(error){
                console.log('error',error);
            }

        // });

        // return promise;

}

const updateTasksList = async(tasks,users,projects) => {


    let i = 0;

    // console.log('tasks',tasks);
    
    try{

    // const promises = new Promise(async(resolve,reject) => {
            const promises = tasks.map(async(task) => {
                        if(i<5){

                            // console.log('do something');

                            const userTaskCreator = users.find(user=>user.name===task.createdBy);
                            const userTaskResponsible = users.find(user=>user.name===task.responsiblePerson);
                            const selectedProject = projects.find(project=>project.name===task.projectName);

                            // console.log('selected project', selectedProject);
                            // console.log('task',task);

                            if(selectedProject){
                                const update = await TaskModel.findOneAndUpdate({ _id:task._id }, { projectId: selectedProject._id });
                                // console.log('updated collection:',{ projectId: selectedProject._id }, update);
    
                                // if(userTaskCreator && userTaskResponsible){
                                //         const createdById = userTaskCreator._id;
                                //         const responsiblePersonId = userTaskResponsible._id;
    
                                //         console.log('createdById',createdById);
                                //         console.log('responsiblePersonId',responsiblePersonId);
    
                                //         const update = await TaskModel.findOneAndUpdate({ _id:task._id }, { createdBy: createdById, responsiblePerson: responsiblePersonId });
                                //         console.log('updated collection:',update);
                                // }
                                return update;
                            }
                        }
                    i++;
            });

            const result = await Promise.all(promises);

            console.log('result',result);
            

        }catch(error){
            console.log('error',error);
        }
    // });
    // return result;
}

// router.use('/remove_tasks', async(request,response) => {

//     const removeSelectedTasks = () => {

//         const promise = new Promise(async(resolve,reject) => {
//             try{
//                 const response = await TaskModel.deleteMany({createdAt: { $regex: '2022' }});
//                 resolve(response);
//             }catch(error){
//                 reject({error:error});
//             }
//         });

//         return promise;

//     }

//     const result = await removeSelectedTasks();

//     return response.json({result: result});
// });

// router.use('/remove_comments', async(request,response) => {

//     const removeSelectedComments = () => {

//         const promise = new Promise(async(resolve,reject) => {
//             try{
//                 const response = await CommentModel.deleteMany({createdAt: { $regex: '2022' }});
//                 resolve(response);
//             }catch(error){
//                 reject({error:error});
//             }
//         });

//         return promise;

//     }

//     const result = await removeSelectedComments();

//     return response.json({result: result});
// });

// router.use('/remove_emails', async(request,response) => {

//     const removeSelectedEmails = () => {

//         const promise = new Promise(async(resolve,reject) => {
//             try{
//                 const response = await MailModel.deleteMany({createdAt: { $regex: '2020-02-07' }});
//                 resolve(response);
//             }catch(error){
//                 reject({error:error});
//             }
//         });

//         return promise;

//     }

//     const result = await removeSelectedEmails();

//     return response.json({result: result});
// });

router.use('/update_collections',async(request,response)=>{
    console.log('update collections');

    try{
        const usersResult = await getAllUsers();
        const projectsResult = await getAllProjects();
        const tasksResult = await getAllTasks();

        /*  update users insert projects ids  */
        // const updateUsers = await updateUsersList(usersResult,projectsResult);
        /*  update tasks insert users ids  */
        const updateTasks = await updateTasksList(tasksResult,usersResult,projectsResult);

        response.json({response:updateTasks});
    }catch(error){
        response.json({response:error});
    }

});


module.exports = router;