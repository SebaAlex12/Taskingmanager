import React, { useEffect } from "react";
import { useDispatch,useSelector } from 'react-redux';

import { fetchTasks } from './../store/Tasks/actions';
import { fetchProjects } from './../store/Projects/actions';
import { fetchReports } from './../store/Reports/actions';
import { fetchReportsPayments } from './../store/ReportsPayments/actions';

import RightButtonsBox from "./RightButtonsBox";
import TasksListContainer from "../store/Tasks/components/TasksListContainer";
import ProjectsList from './../store/Projects/components/ProjectsList';
import UsersList from './../store/Users/components/UsersList';

const Tasks = () => {

  const dispatch = useDispatch();
  // const loggedUserName = useSelector(state => state.users.logged_user.name);

  const loggedUser = useSelector(state => state.users.logged_user);
  // console.log('loggedUser',loggedUser);

  useEffect(() => {
      dispatch(fetchProjects({company:'Blumoseo'}));
      dispatch(fetchTasks({responsiblePersonId:loggedUser._id,createdById:loggedUser._id}));
      dispatch(fetchReports());
      dispatch(fetchReportsPayments());
  },[dispatch,loggedUser]);

  return(
    <React.Fragment>
      <ProjectsList />
      <UsersList />
      <TasksListContainer/>
      <RightButtonsBox />
    </React.Fragment>
  )
}

export default Tasks;