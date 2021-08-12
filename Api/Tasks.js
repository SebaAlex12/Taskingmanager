const Task = require("../models/Task");

const fetchAllTasks = async() => {
   try{
        const data = await Task.find();
        return data;
   }catch(errors){
       return errors;
   }
}

module.exports = {
    fetchAllTasks
}