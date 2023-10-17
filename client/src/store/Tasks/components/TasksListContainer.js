import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';

import { sortItems } from '../../../common/tools';
import TasksList from './TasksList';
import { StyledTaskListContainer } from "../styles/StyledTaskListContainer";

const TasksListContainer = () => {
  
  const tasks = useSelector(state=>state.tasks.tasks);
  const loggedUser = useSelector(state=>state.users.logged_user);
  const [filteredTasks,setFilteredTasks] = useState([]);
  const [isFiltered,setIsFiltered] = useState(false);

  useEffect(() => {
      if(loggedUser){
          setFilteredTasks(sortItems(tasks.filter(task => task.responsiblePerson === loggedUser.name && (task.status === "Do wykonania" || task.status === "W trakcie")),'createdAt','desc'));
      }
  },[tasks,loggedUser]);

  const switchTasks = () => {
        if (isFiltered) {
            setFilteredTasks(sortItems(tasks.filter(task => task.responsiblePerson === loggedUser.name && (task.status === "Do wykonania" || task.status === "W trakcie")),'createdAt','desc'));
        } else {
            const filtrTasks = tasks.filter(task => task.createdBy === loggedUser.name);
            setFilteredTasks(filtrTasks);
        }
        setIsFiltered(!isFiltered);
  }

  // console.log('rerender...');

  const orderTasks = (column, direction) => {
    const newOrder = sortItems(filteredTasks, column, direction);
    setFilteredTasks([...newOrder]);
  }



    return(
      <StyledTaskListContainer>
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