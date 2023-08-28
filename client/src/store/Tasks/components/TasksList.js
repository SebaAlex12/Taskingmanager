import React,{ useState } from "react";


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


// import { Button } from "../../../themes/basic";
// import { StyledTaskList } from "../styles/StyledTaskList";

// import { fetchTasks, removeTask, updateTask } from "../actions";

// class TasksList extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       toggleTasksList: false
//     };
//   }
//   componentDidMount() {
//     const { fetchTasks } = this.props;
//     fetchTasks();
//   }
//   removeTaskHandler = id => {
//     const { removeTask } = this.props;
//     removeTask(id);
//   };
//   updateTaskHandler = data => {
//     const { updateTask } = this.props;
//     updateTask(data);
//   };
//   render() {
//     const { tasks } = this.props;
//     const { toggleTasksList } = this.state;
//     const tasksContent = tasks.map(task => {
//       return <div className="btn btn-default">{task.name}</div>;
//     });
//     return (
//       <StyledTaskList>
//         <div className="tasks-box">
//           <div className="task-list-flow-box">
//             <Button
//               variant="primary"
//               onClick={() =>
//                 this.setState({
//                   toggleTasksList: !toggleTasksList
//                 })
//               }
//             >
//               Lista tasków
//             </Button>
//             {toggleTasksList ? (
//               <div className="tasks-list">{tasksContent}</div>
//             ) : null}
//           </div>
//         </div>
//       </StyledTaskList>
//     );
//   }
// }

// const mapStateToProps = state => {
//   return {
//     tasks: state.tasks.tasks,
//     loggedUser: state.users.logged_user
//   };
// };

// export default connect(
//   mapStateToProps,
//   { fetchTasks, removeTask, updateTask }
// )(TasksList);
