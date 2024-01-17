import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';

import { sortItems } from '../../../common/tools';
import TasksList from './TasksList';
import { StyledTaskListContainer } from "../styles/StyledTaskListContainer";
import TasksPriorityForm from "./TasksPriorityForm";

const TasksListContainer = () => {
  
  const tasks = useSelector(state=>state.tasks.tasks);
  const loggedUser = useSelector(state=>state.users.logged_user);
  const [filteredTasks,setFilteredTasks] = useState([]);
  const [status,setStatus] = useState('Do wykonania');
  const [isResponsiblePerson,setIsResponsiblePerson] = useState(true)

  useEffect(() => {
    setFilteredTasks(
        sortItems(
          tasks.filter(
            task => (isResponsiblePerson ? task.responsiblePerson === loggedUser.name : task.createdBy === loggedUser.name) 
            && (task.status === status)),
            'createdAt',
            'desc'
            )
        );
  },[tasks,loggedUser]);

  const switchTasks = () => {
    const reversIsResponsiblePerson = !isResponsiblePerson;
      setFilteredTasks(
        sortItems(
          tasks.filter(
            task => (reversIsResponsiblePerson ? task.responsiblePerson === loggedUser.name : task.createdBy === loggedUser.name) 
            && (task.status === status)),
            'createdAt',
            'desc'
            )
        );
        setIsResponsiblePerson(reversIsResponsiblePerson);
  }

  // console.log('rerender...');

  const orderTasks = (column, direction) => {
    const newOrder = sortItems(filteredTasks, column, direction);
    setFilteredTasks([...newOrder]);
    // console.log('order tasks');
    // setFilteredTasks(prevTasks => sortItems(prevTasks, column, direction));
  }

  const priorityFilterHandler = (event) => {
      if(event.target.value !== "Wszystkie"){
        console.log('status',event.target.value);
          setFilteredTasks(
            tasks.filter(
              task => (task => (isResponsiblePerson ? task.responsiblePerson === loggedUser.name : task.createdBy === loggedUser.name))
              && (task.status === event.target.value)
              )
          );
      }else{
        setFilteredTasks(
          tasks.filter(
              task => (task => (isResponsiblePerson ? task.responsiblePerson === loggedUser.name : task.createdBy === loggedUser.name))
            )
        );
      }
  }

    return(
      <StyledTaskListContainer>
        <TasksPriorityForm priorityFilter={priorityFilterHandler} status={status} />
        <form className="task-switcher">
                 <label className="switch">
                   <input
                     className="switch-input"
                     type="checkbox"
                     onClick={switchTasks}
                   />
                   <span
                     className="switch-label"
                     data-on="Ukryj"
                     data-off="Pokaż"
                   ></span>
                   <span className="switch-handle"></span>
                 </label>
                 <label htmlFor=""> - zadania utworzone przeze mnie</label>
          </form>
          <div className="task-items-box">
                <table className="table table-striped">
                      <thead>
                        <tr>
                          <th scope="col">
                            Nazwa
                            <i
                              onClick={() => orderTasks("title", "asc")}
                              className="glyphicon glyphicon-sort-by-alphabet"
                            ></i>
                            <i
                              onClick={() => orderTasks("title", "desc")}
                              className="glyphicon glyphicon glyphicon-sort-by-alphabet-alt"
                            ></i>
                          </th>
                          <th scope="col">
                            Projekt
                            <i
                              onClick={() =>
                                orderTasks("projectName", "asc")
                              }
                              className="glyphicon glyphicon-sort-by-alphabet"
                            ></i>
                            <i
                              onClick={() =>
                                orderTasks("projectName", "desc")
                              }
                              className="glyphicon glyphicon glyphicon-sort-by-alphabet-alt"
                            ></i>
                          </th>
                          <th scope="col">
                            Stan
                            <i
                              onClick={() => orderTasks("status", "asc")}
                              className="glyphicon glyphicon-sort-by-alphabet"
                            ></i>
                            <i
                              onClick={() => orderTasks("status", "desc")}
                              className="glyphicon glyphicon glyphicon-sort-by-alphabet-alt"
                            ></i>
                          </th>
                          <th scope="col">
                            Priorytet
                            <i
                              onClick={() => orderTasks("priority", "asc")}
                              className="glyphicon glyphicon-sort-by-alphabet"
                            ></i>
                            <i
                              onClick={() => orderTasks("priority", "desc")}
                              className="glyphicon glyphicon glyphicon-sort-by-alphabet-alt"
                            ></i>
                          </th>
                          <th scope="col">
                            Zlecający
                            <i
                              onClick={() => orderTasks("createdBy", "asc")}
                              className="glyphicon glyphicon-sort-by-alphabet"
                            ></i>
                            <i
                              onClick={() => orderTasks("createdBy", "desc")}
                              className="glyphicon glyphicon glyphicon-sort-by-alphabet-alt"
                            ></i>
                          </th>
                          <th scope="col">
                            Wykonawca
                            <i
                              onClick={() => orderTasks("responsiblePerson", "asc")}
                              className="glyphicon glyphicon-sort-by-alphabet"
                            ></i>
                            <i
                              onClick={() => orderTasks("responsiblePerson", "desc")}
                              className="glyphicon glyphicon glyphicon-sort-by-alphabet-alt"
                            ></i>
                          </th>
                          <th scope="col">
                            Termin
                            <i
                              onClick={() => orderTasks("term", "asc")}
                              className="glyphicon glyphicon-sort-by-alphabet"
                            ></i>
                            <i
                              onClick={() => orderTasks("term", "desc")}
                              className="glyphicon glyphicon glyphicon-sort-by-alphabet-alt"
                            ></i>
                          </th>
                          <th scope="col">
                            Utworzono
                            <i
                              onClick={() => orderTasks("createdAt", "asc")}
                              className="glyphicon glyphicon-sort-by-alphabet"
                            ></i>
                            <i
                              onClick={() => orderTasks("createdAt", "desc")}
                              className="glyphicon glyphicon glyphicon-sort-by-alphabet-alt"
                            ></i>
                          </th>
                          <th scope="col">Opis</th>
                        </tr>
                      </thead>
                        <TasksList tasks={filteredTasks} />
              </table>
          </div>
      </StyledTaskListContainer>
    )
}

export default TasksListContainer;