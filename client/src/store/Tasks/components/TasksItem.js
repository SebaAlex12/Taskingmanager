import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
// import moment from "moment";
import moment from "moment/min/moment-with-locales";

import { priorities, statuses } from "../../ini";
import CommentsAddForm from "../../Comments/components/CommentsAddForm";
import CommentsList from "../../Comments/components/CommentsList";
import { updateTask, removeTask } from './../actions';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, WarningButton } from "../../../themes/basic";
import {
  faTimes,
  faEdit,
  faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";

const TaskItem = (props) => {
    const {
      _id,
      title,
      description,
      projectName,
      responsiblePerson,
      responsiblePersonLastComment,
      status,
      priority,
      createdBy,
      termAt,
      createdAt,
    } = props.item;

    const dispatch = useDispatch();
    const loggedUser = useSelector(state => state.users.logged_user);
    const users = useSelector(state => state.users.users);
    const [ isActive, setIsActive ] = useState(false);
    const [ text, setText ] = useState(description);

    const setActiveTask = () => {
        setIsActive(prevState => !prevState);
    }

    const removeTask = () => {
      const result = window.confirm(`Czy napewno chcesz usunąć zadanie: ${title}`);
      if (result === true) {
        const response = dispatch(removeTask(_id));
        if(response) window.confirm(`Zadanie: zostało usunięte`);
      }
    };

    const onChangeSelect = (event) => {
      const data = {
        _id,
        [event.target.name]: event.target.value,
      };
      const response = dispatch(updateTask(data));
      if(response) window.confirm(`${[event.target.name]} został zmieniony`);
    };

    const onChangeTextarea = (event) => {
      setText(event.target.value);
    }

    const onClickSubmitDescription = () => {
      const data = {
        _id,
        description: text,
      };
      const response = dispatch(updateTask(data)); 
      if(response) window.confirm(`opis został zmieniony`);    
    }

    return(
      <React.Fragment>
        <tr>
          <td className="name">
              <div>{title}</div>
            <i
              className={
                responsiblePersonLastComment === "true"
                  ? "glyphicon glyphicon-cloud-download lights active"
                  : "glyphicon glyphicon-cloud-upload lights"
              }
            ></i>
          </td>
          <td className="project-name">{projectName}</td>
          <td className="status">
            <select
              className="form-control"
              onChange={onChangeSelect}
              name="status"
              defaultValue={status}
              required
            >
              {statuses
                ? statuses.map((item) => {
                    return (
                      <option
                        key={item._id}
                        value={item.name}
                        // selected={item.name === status ? "selected" : null}
                      >
                        {item.name}
                      </option>
                    );
                  })
                : null}
            </select>
          </td>
          <td className="priority">
            <select
              className="form-control"
              onChange={onChangeSelect}
              name="priority"
              disabled={loggedUser.name !== createdBy ? "disabled" : null}
              defaultValue={priority}
              required
            >
              {priorities
                ? priorities.map((item) => {
                    return (
                      <option
                        key={item._id}
                        value={item.name}
                        // selected={item.name === priority ? "selected" : null}
                      >
                        {item.name}
                      </option>
                    );
                  })
                : null}
            </select>
          </td>
          <td className="createdBy">
            <div>{createdBy}</div>
          </td>
          <td className="responsiblePerson">
            <select
              className="form-control"
              onChange={onChangeSelect}
              name="responsiblePerson"
              disabled={loggedUser.name !== createdBy ? "disabled" : null}
              value={responsiblePerson}
              defaultValue={responsiblePerson}
              required
            >
              {users
                ? users.map((item) => {
                    if (item.projects) {
                      if (item.projects.split(",").includes(projectName)) {
                        return (
                          <option
                            key={item._id}
                            value={item.name}
                          >
                            {item.name}
                          </option>
                        );
                      }
                    }
                    return null;
                  })
                : null}
            </select>
          </td>
          <td className="term">
            {moment(new Date(termAt)).locale("pl").format("LLLL")}
          </td>
          <td className="createdAt">
            {moment(new Date(createdAt)).locale("pl").format("LLLL")}
          </td>
          <td className="details">
            <Button 
              onClick={setActiveTask} 
              title="Edytuj"
              >
              <FontAwesomeIcon icon={faEdit} />
            </Button>
            {loggedUser.name === createdBy ? (
              <WarningButton
                warning
                onClick={removeTask}
                title="Usuń"
              >
                <FontAwesomeIcon icon={faTimes} />
              </WarningButton>
            ) : null}
          </td>
        </tr>
        {isActive ? (
          <React.Fragment>
            <tr>
              <td colSpan="9">
                <div className="desc-box">
                  <Button
                    className="edit"
                    onClick={onClickSubmitDescription}
                    title="zapisz zmiany"
                  >
                    <FontAwesomeIcon icon={faPencilAlt} />
                  </Button>
                  <textarea
                    className="form-control"
                    onChange={onChangeTextarea}
                    name="text"
                    value={text}
                    cols="40"
                    rows="10"
                  ></textarea>
                </div>
                <CommentsList
                  taskId={_id}
                  responsiblePerson={responsiblePerson}
                />
                <CommentsAddForm
                  taskId={_id}
                  taskProjectName={projectName}
                  taskTitle={title}
                  taskCreatedBy={createdBy}
                  responsiblePerson={responsiblePerson}
                />
              </td>
            </tr>
          </React.Fragment>
        ) : null}
      </React.Fragment>
    )
}

export default TaskItem;



// import TasksMailReminder from "./TasksMailReminder";
// import { updateTask, removeTask } from "../actions";


// import { updateMessages } from "../../Messages/actions";

// import FilesAddForm from "../../Files/components/FilesAddForm";
// import FilesItem from "../../Files/components/FilesItem";

// import MailsAddForm from "../../Mails/components/MailsAddForm";
// import ModalDialog from "../../../common/ModalDialog/components/ModalDialog";
// import CalendarContainer from "../../Calendar/components/CalendarContainer";
// import PatternsList from "../../Patterns/components/PatternsList";
// // import { StyledTasksItem } from "../styles/StyledTasksItem";




// class TasksItem extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       toggle: false,
//       showModalMailTrigger: false,
//       showModalCalendarTrigger: false,
//       showModalPatternTrigger: false,
//     };
//   }

//   componentDidMount() {
//     const { patterns } = this.props;
//     const {
//       _id,
//       title,
//       description,
//       projectName,
//       responsiblePerson,
//       responsiblePersonLastComment,
//       status,
//       priority,
//       createdBy,
//       termAt,
//       createdAt,
//       files,
//       mailRemainderData,
//     } = this.props.item;

//     this.setState({
//       _id,
//       title,
//       description,
//       projectName,
//       responsiblePerson,
//       responsiblePersonLastComment,
//       status,
//       priority,
//       createdBy,
//       termAt,
//       createdAt,
//       files,
//       mailRemainderData,
//       attachedPattern:
//         patterns.length > 0
//           ? patterns.filter((pattern) => pattern["taskId"] === _id)
//           : [],
//     });
//   }

//   componentWillReceiveProps(nextProps) {
//     // const {
//     //   item: { files }
//     // } = nextProps;
//     // const { files } = this.state;
//     if (nextProps.item.files !== this.props.item.files) {
//       this.setState({
//         files: nextProps.item.files,
//       });
//     }
//   }

//   switch = () => {
//     const { toggle } = this.state;
//     this.setState({ toggle: !toggle });
//   };

//   onClickDescription = () => {
//     const { updateTask, updateMessages } = this.props;
//     const { _id, description } = this.state;
//     const data = {
//       _id,
//       description,
//     };
//     const response = updateTask(data);
//     if (response) {
//       updateMessages([{ name: "Zadanie" }, { value: "opis został zmieniony" }]);
//     }
//   };

//   onKeyUp = (event) => {
//     if (event.keyCode === 13) {
//       const { updateTask } = this.props;
//       const {
//         _id,
//         title,
//         projectName,
//         responsiblePerson,
//         status,
//         priority,
//         createdBy,
//         termAt,
//         createdAt,
//       } = this.state;
//       const data = {
//         _id,
//         title,
//         projectName,
//         responsiblePerson,
//         status,
//         priority,
//         createdBy,
//         termAt,
//         createdAt,
//       };
//       updateTask(data);
//       this.setState({
//         toggle: false,
//       });
//     }
//   };

//   clear = () => {
//     this.setState({
//       toggle: false,
//     });
//   };

//   showModalMail = (result) => {
//     this.setState({
//       ...this.state,
//       showModalMailTrigger: result,
//     });
//   };

//   showModalCalendar = (result) => {
//     this.setState({
//       ...this.state,
//       showModalCalendarTrigger: result,
//     });
//   };

//   showModalPattern = (result) => {
//     this.setState({
//       ...this.state,
//       showModalPatternTrigger: result,
//     });
//   };

//   attachedPatternCollback = (pattern) => {
//     const { attachedPattern } = this.state;

//     const newPattern = attachedPattern.map((item) => {
//       if (pattern.status) item.status = pattern.status;
//       if (pattern.elements) item.elements = pattern.elements;
//       return item;
//     });

//     this.setState({
//       ...this.state,
//       attachedPattern: newPattern,
//     });
//   };

//   selectPatternTitle = () => {
//     const { attachedPattern } = this.state;
//     if (attachedPattern.length > 0) {
//       if (attachedPattern[0].status === "Do wykonania")
//         return "Szablon do do wykonania";
//       if (attachedPattern[0].status === "W trakcie") return "Szablon w trakcie";
//       if (attachedPattern[0].status === "Do akceptacji")
//         return "Szablon do akceptacji";
//       if (attachedPattern[0].status === "Wykonane") return "Szablon wykonany";
//       if (attachedPattern[0].status === "Zawieszone")
//         return "Szablon zawieszony";
//     } else {
//       return "Przypisz szablon z listy";
//     }
//   };

//   selectPatternClass = () => {
//     const { attachedPattern } = this.state;
//     if (attachedPattern.length > 0) {
//       if (attachedPattern[0].status === "Do wykonania")
//         return "task-pattern-button attached";
//       if (attachedPattern[0].status === "W trakcie")
//         return "task-pattern-button during";
//       if (attachedPattern[0].status === "Do akceptacji")
//         return "task-pattern-button to-accept";
//       if (attachedPattern[0].status === "Wykonane")
//         return "task-pattern-button accepted";
//       if (attachedPattern[0].status === "Zawieszone")
//         return "task-pattern-button suspended";
//     } else {
//       return "task-pattern-button";
//     }
//   };

//   render() {
//     const {
//       _id,
//       toggle,
//       title,
//       description,
//       projectName,
//       responsiblePerson,
//       responsiblePersonLastComment,
//       status,
//       priority,
//       createdBy,
//       termAt,
//       createdAt,
//       files,
//       mailRemainderData,
//       showModalMailTrigger,
//       showModalCalendarTrigger,
//       showModalPatternTrigger,
//       attachedPattern,
//     } = this.state;
//     const { setActiveTask, active, loggedUser, users } = this.props;

//     const taskCreatorUser = users.filter((user) => user.name === createdBy);
//     const taskResponsibleUser = users.filter(
//       (user) => user.name === responsiblePerson
//     );

//     let filesContent;

//     if (files && files.length > 0) {
//       filesContent = files.map((file) => {
//         let imageUrl = `/files/tasks/${_id}/${file}`;
//         return (
//           <FilesItem
//             key={file}
//             imageUrl={imageUrl}
//             // lightboxPhotos={() => this.lightboxPhotos(fileNumber)}
//           />
//         );
//       });
//     }

//     const selectedPriority = priorities.filter(
//       (item) => item.name === priority
//     );
//     const selectedStatus = statuses.filter((item) => item.name === status);

//     let clazz;
//     if (selectedPriority.length > 0 && selectedStatus.length > 0) {
//       clazz =
//         "priority_" +
//         selectedPriority[0]["_id"] +
//         " status_" +
//         selectedStatus[0]["_id"];
//     }

//     // show modal button and content
//     const showModalCalendarButton = taskResponsibleUser.length > 0 && (
//           <Button
//           onClick={() => this.showModalCalendar(true)}
//           title="Kalendarz"
//         >
//           <FontAwesomeIcon icon={faCalendarAlt} />
//         </Button>
//     );

//     const showModalCalendarContent = showModalCalendarTrigger && (
//           <ModalDialog
//             showModal={() => this.showModalCalendar(false)}
//             width="1200px"
//           >
//             <CalendarContainer
//               eventId={_id}
//               projectName={projectName}
//               title={title}
//               description={description}
//               userId={taskResponsibleUser[0]["_id"]}
//               eventType="Zadanie"
//               title={title}
//             />
//           </ModalDialog>
//     )

//     // show modal button and content

//     const showModalMailButton = taskCreatorUser.length > 0 && (
//       <Button
//       onClick={() => this.showModalMail(true)}
//       title="wyślij maila"
//     >
//       <FontAwesomeIcon icon={faEnvelope} />
//     </Button>
//     );

//     const showModalMailContent = showModalMailTrigger && (
//         <ModalDialog
//           title="Wyślij email."
//           showModal={() => this.showModalMail(false)}
//         >
//           <MailsAddForm
//             title={
//               "Wiadomość Crm - " +
//               (projectName ? "projekt: " + projectName + ", " : "") +
//               (title ? "zadanie: " + title + ", " : "") +
//               "autor: " +
//               loggedUser.name
//             }
//             projectName={projectName}
//             to={taskCreatorUser[0].email}
//           />
//         </ModalDialog>
//       )

//     return (

//     );
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     loggedUser: state.users.logged_user,
//     users: state.users.users,
//     patterns: state.patterns.patterns,
//   };
// };

// export default connect(mapStateToProps, {
//   updateTask,
//   removeTask,
//   updateMessages,
// })(TasksItem);
