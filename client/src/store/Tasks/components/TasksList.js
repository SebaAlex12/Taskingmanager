import React from "react";


import TasksItem from "./TasksItem";

const TasksList = (props) => {
  const { tasks } = props;
  // const [ activeTaskId, setActiveTaskId ] = useState(null);
  // const setActiveTaskHandler = (id) => {
  //   setActiveTaskId(id);
  // }

  const tasksListContent =  (tasks.length > 0) ? tasks.map((task) => <TasksItem
      item={task}
      key={task._id}
      // active={task._id === activeTaskId ? true : false}
      // setActiveTaskHandler={() => setActiveTaskHandler(task._id)}
    />
  ) : <tr><td>loading...</td></tr>;

    return (<tbody>{tasksListContent}</tbody>);
}

export default TasksList;
