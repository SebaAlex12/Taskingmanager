const express = require('express');
const router = express.Router();

// Models
const TaskModel = require('../models/Task');
const ProjectModel = require('../models/Project');
const UserModel = require('../models/User');

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
        
    const promise = new Promise(async(resolve,reject) => {
        try{
                users.forEach(async(user) => {
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

                resolve('success');

            }catch(error){
                console.log('error',error);
                reject(error);
            }

        });

        return promise;

}

const updateTasksList = async(tasks,users) => {
    const promise = new Promise(async(resolve,reject) => {
        try{
            tasks.forEach(async(task) => {
                const userTaskCreator = users.find(user=>user.name===task.createdBy);
                const userTaskResponsible = users.find(user=>user.name===task.responsiblePerson);

                if(userTaskCreator && userTaskResponsible){
                        const createdById = userTaskCreator._id;
                        const responsiblePersonId = userTaskResponsible._id;

                        console.log('createdById',createdById);
                        console.log('responsiblePersonId',responsiblePersonId);

                        const update = await TaskModel.findOneAndUpdate({ _id:task._id }, { createdBy: createdById, responsiblePerson: responsiblePersonId });
                        console.log('updated collection:',update);
                }

                resolve('success');

            });
        }catch(error){
            reject(error);
        }
    });
    return promise;
}

router.use('/update_collections',async(request,response)=>{
    console.log('update collections');

    try{
        const usersResult = await getAllUsers();
        // const projectsResult = await getAllProjects();
        const tasksResult = await getAllTasks();

        /*  update users insert projects ids  */
        // const updateProjects = await updateUsersList(usersResult,projectsResult);
        /*  update tasks insert users ids  */
        // const updateTasks = await updateTasksList(tasksResult,usersResult);

        response.json({response:updateResult});
    }catch(error){
        response.json({response:error});
    }

});


module.exports = router;