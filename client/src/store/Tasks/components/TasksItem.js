import React, { Component } from "react";
import { connect } from "react-redux";
// import moment from "moment";
import moment from "moment/min/moment-with-locales";

import TasksMailReminder from "./TasksMailReminder";
import { updateTask, removeTask } from "../actions";
import CommentsAddForm from "../../Comments/components/CommentsAddForm";
import CommentsList from "../../Comments/components/CommentsList";
import { priorities, statuses } from "../../ini";
import { updateMessages } from "../../Messages/actions";

import FilesAddForm from "../../Files/components/FilesAddForm";
import FilesItem from "../../Files/components/FilesItem";

import MailsAddForm from "../../Mails/components/MailsAddForm";
import ModalDialog from "../../../common/ModalDialog/components/ModalDialog";
import CalendarContainer from "../../Calendar/components/CalendarContainer";
import PatternsList from "../../Patterns/components/PatternsList";
// import { StyledTasksItem } from "../styles/StyledTasksItem";

import { Button, WarningButton } from "../../../themes/basic";
import {
  faCalendarAlt,
  faEnvelope,
  faTimes,
  faEdit,
  faPencilAlt,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class TasksItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      showModalMailTrigger: false,
      showModalCalendarTrigger: false,
      showModalPatternTrigger: false,
    };
  }

  componentDidMount() {
    const { patterns } = this.props;
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
      files,
      mailRemainderData,
    } = this.props.item;

    this.setState({
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
      files,
      mailRemainderData,
      attachedPattern:
        patterns.length > 0
          ? patterns.filter((pattern) => pattern["taskId"] === _id)
          : [],
    });
  }

  componentWillReceiveProps(nextProps) {
    // const {
    //   item: { files }
    // } = nextProps;
    // const { files } = this.state;
    if (nextProps.item.files !== this.props.item.files) {
      this.setState({
        files: nextProps.item.files,
      });
    }
  }

  switch = () => {
    const { toggle } = this.state;
    this.setState({ toggle: !toggle });
  };

  onChangeHandler = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onClickDescriptionHandler = () => {
    const { updateTask, updateMessages } = this.props;
    const { _id, description } = this.state;
    const data = {
      _id,
      description,
    };
    const response = updateTask(data);
    if (response) {
      updateMessages([{ name: "Zadanie" }, { value: "opis został zmieniony" }]);
    }
  };

  onKeyUpHandler = (event) => {
    if (event.keyCode === 13) {
      const { updateTask } = this.props;
      const {
        _id,
        title,
        projectName,
        responsiblePerson,
        status,
        priority,
        createdBy,
        termAt,
        createdAt,
      } = this.state;
      const data = {
        _id,
        title,
        projectName,
        responsiblePerson,
        status,
        priority,
        createdBy,
        termAt,
        createdAt,
      };
      updateTask(data);
      this.setState({
        toggle: false,
      });
    }
  };

  onChangeSelectHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    const { updateTask, updateMessages, loggedUser } = this.props;
    const { _id, responsiblePerson, title, priority } = this.state;
    const data = {
      _id,
      [event.target.name]: event.target.value,
    };
    const response = updateTask(data);

    const alertData =
      event.target.value === "Do wykonania"
        ? {
            from: loggedUser.name,
            to: responsiblePerson,
            msg: title,
            topic: "zadanie do wykonania: " + title,
            priority: priority,
            type: "task_change",
            createAt: moment(new Date(), "YYYY-MM-DD HH:mm:ss").format(),
          }
        : false;

    if (response) {
      updateMessages({ alert: alertData });
    }
  };

  removeTaskHandler = (event) => {
    const { removeTask } = this.props;
    const { _id, title } = this.state;

    const result = window.confirm(
      "Czy napewno chcesz usunąć zadanie: " + title
    );
    if (result === true) {
      const response = removeTask(_id);
      if (response) {
        updateMessages([
          { name: "Zadanie" },
          { value: event.target.name + " został usunięty" },
        ]);
      }
    }
  };

  clear = () => {
    this.setState({
      toggle: false,
    });
  };

  showModalMail = (result) => {
    this.setState({
      ...this.state,
      showModalMailTrigger: result,
    });
  };

  showModalCalendar = (result) => {
    this.setState({
      ...this.state,
      showModalCalendarTrigger: result,
    });
  };

  showModalPattern = (result) => {
    this.setState({
      ...this.state,
      showModalPatternTrigger: result,
    });
  };

  attachedPatternCollback = (pattern) => {
    const { attachedPattern } = this.state;

    const newPattern = attachedPattern.map((item) => {
      if (pattern.status) item.status = pattern.status;
      if (pattern.elements) item.elements = pattern.elements;
      return item;
    });

    this.setState({
      ...this.state,
      attachedPattern: newPattern,
    });
  };

  selectPatternTitle = () => {
    const { attachedPattern } = this.state;
    if (attachedPattern.length > 0) {
      if (attachedPattern[0].status === "Do wykonania")
        return "Szablon do do wykonania";
      if (attachedPattern[0].status === "W trakcie") return "Szablon w trakcie";
      if (attachedPattern[0].status === "Do akceptacji")
        return "Szablon do akceptacji";
      if (attachedPattern[0].status === "Wykonane") return "Szablon wykonany";
      if (attachedPattern[0].status === "Zawieszone")
        return "Szablon zawieszony";
    } else {
      return "Przypisz szablon z listy";
    }
  };

  selectPatternClass = () => {
    const { attachedPattern } = this.state;
    if (attachedPattern.length > 0) {
      if (attachedPattern[0].status === "Do wykonania")
        return "task-pattern-button attached";
      if (attachedPattern[0].status === "W trakcie")
        return "task-pattern-button during";
      if (attachedPattern[0].status === "Do akceptacji")
        return "task-pattern-button to-accept";
      if (attachedPattern[0].status === "Wykonane")
        return "task-pattern-button accepted";
      if (attachedPattern[0].status === "Zawieszone")
        return "task-pattern-button suspended";
    } else {
      return "task-pattern-button";
    }
  };

  render() {
    const {
      _id,
      toggle,
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
      files,
      mailRemainderData,
      showModalMailTrigger,
      showModalCalendarTrigger,
      showModalPatternTrigger,
      attachedPattern,
    } = this.state;
    const { setActiveTaskHandler, active, loggedUser, users } = this.props;

    const taskCreatorUser = users.filter((user) => user.name === createdBy);
    const taskResponsibleUser = users.filter(
      (user) => user.name === responsiblePerson
    );

    let filesContent;

    if (files && files.length > 0) {
      filesContent = files.map((file) => {
        let imageUrl = `/files/tasks/${_id}/${file}`;
        return (
          <FilesItem
            key={file}
            imageUrl={imageUrl}
            // lightboxPhotosHandler={() => this.lightboxPhotosHandler(fileNumber)}
          />
        );
      });
    }

    const selectedPriority = priorities.filter(
      (item) => item.name === priority
    );
    const selectedStatus = statuses.filter((item) => item.name === status);

    let clazz;
    if (selectedPriority.length > 0 && selectedStatus.length > 0) {
      clazz =
        "priority_" +
        selectedPriority[0]["_id"] +
        " status_" +
        selectedStatus[0]["_id"];
    }

    // show modal button and content
    const showModalCalendarButton = taskResponsibleUser.length > 0 && (
          <Button
          onClick={() => this.showModalCalendar(true)}
          title="Kalendarz"
        >
          <FontAwesomeIcon icon={faCalendarAlt} />
        </Button>
    );

    const showModalCalendarContent = showModalCalendarTrigger && (
          <ModalDialog
            showModal={() => this.showModalCalendar(false)}
            width="1200px"
          >
            <CalendarContainer
              eventId={_id}
              projectName={projectName}
              title={title}
              description={description}
              userId={taskResponsibleUser[0]["_id"]}
              eventType="Zadanie"
              title={title}
            />
          </ModalDialog>
    )

    // show modal button and content

    const showModalMailButton = taskCreatorUser.length > 0 && (
      <Button
      onClick={() => this.showModalMail(true)}
      title="wyślij maila"
    >
      <FontAwesomeIcon icon={faEnvelope} />
    </Button>
    );

    const showModalMailContent = showModalMailTrigger && (
        <ModalDialog
          title="Wyślij email."
          showModal={() => this.showModalMail(false)}
        >
          <MailsAddForm
            title={
              "Wiadomość Crm - " +
              (projectName ? "projekt: " + projectName + ", " : "") +
              (title ? "zadanie: " + title + ", " : "") +
              "autor: " +
              loggedUser.name
            }
            projectName={projectName}
            to={taskCreatorUser[0].email}
          />
        </ModalDialog>
      )

    return (
      <React.Fragment>
        <tr className={clazz}>
          <td className="name">
            {toggle ? (
              <i
                className="glyphicon glyphicon-remove"
                onClick={this.clear}
              ></i>
            ) : null}
            {toggle ? (
              <input
                type="text"
                name="title"
                value={title}
                onChange={this.onChangeHandler}
                onKeyUp={this.onKeyUpHandler}
              />
            ) : (
              <div onClick={this.switch}>{title}</div>
            )}
            {/* <TasksMailReminder
              taskId={_id}
              from={
                taskCreatorUser.length > 0 ? taskCreatorUser[0].email : null
              }
              to={
                taskResponsibleUser.length > 0
                  ? taskResponsibleUser[0].email
                  : null
              }
              projectName={projectName}
              taskTitle={title}
              createdBy={createdBy}
              description={description}
              priority={priority}
              termAt={termAt}
              mailRemainderData={mailRemainderData}
            /> */}
            { showModalCalendarButton }
            { showModalCalendarContent }
            {/* {createdBy === loggedUser.name ||
            (typeof attachedPattern !== "undefined" &&
              attachedPattern.length > 0) ? (
              <Button
                onClick={() => this.showModalPattern(true)}
                title={this.selectPatternTitle()}
                className={this.selectPatternClass()}
              >
                <FontAwesomeIcon icon={faLayerGroup} />
              </Button>
            ) : null} */}
            {/* {showModalPatternTrigger ? (
              <ModalDialog
                showModal={() => this.showModalPattern(false)}
                width="1260px"
              >
                <PatternsList
                  userId={taskResponsibleUser[0]["_id"]}
                  taskId={_id}
                  responsiblePerson={responsiblePerson}
                  attachedPattern={attachedPattern}
                  attachedPatternCollback={this.attachedPatternCollback}
                />
              </ModalDialog>
            ) : null} */}
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
              onChange={this.onChangeSelectHandler}
              name="status"
              required
            >
              {/* <option value="">Stan</option> */}
              {statuses
                ? statuses.map((item) => {
                    return (
                      <option
                        key={item._id}
                        value={item.name}
                        selected={item.name === status ? "selected" : null}
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
              onChange={this.onChangeSelectHandler}
              name="priority"
              disabled={loggedUser.name !== createdBy ? "disabled" : null}
              required
            >
              {/* <option value="">Priorytet</option> */}
              {priorities
                ? priorities.map((item) => {
                    return (
                      <option
                        key={item._id}
                        value={item.name}
                        selected={item.name === priority ? "selected" : null}
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
            { showModalMailButton }
            { showModalMailContent }
          </td>
          {/* <td className="responsiblePerson">{responsiblePerson}</td> */}
          <td className="responsiblePerson">
            <select
              className="form-control"
              onChange={this.onChangeSelectHandler}
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
                            // defaultValue={item.name}
                            // selected={
                            //   item.name === responsiblePerson
                            //     ? "selected"
                            //     : null
                            // }
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
            <Button onClick={setActiveTaskHandler} title="Edytuj">
              <FontAwesomeIcon icon={faEdit} />
            </Button>
            {loggedUser.name === createdBy ? (
              <WarningButton
                warning
                onClick={this.removeTaskHandler}
                title="Usuń"
              >
                <FontAwesomeIcon icon={faTimes} />
              </WarningButton>
            ) : null}
          </td>
        </tr>
        {active ? (
          <React.Fragment>
            <tr>
              <td colSpan="9">
                <div className="desc-box">
                  <Button
                    className="edit"
                    onClick={this.onClickDescriptionHandler}
                    title="zapisz zmiany"
                  >
                    <FontAwesomeIcon icon={faPencilAlt} />
                  </Button>
                  <textarea
                    className="form-control"
                    onChange={this.onChangeHandler}
                    name="description"
                    value={description}
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
            <tr>
              <td colSpan="10">
                {filesContent}
                <FilesAddForm taskId={_id} />
              </td>
            </tr>
          </React.Fragment>
        ) : null}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.users.logged_user,
    users: state.users.users,
    patterns: state.patterns.patterns,
  };
};

export default connect(mapStateToProps, {
  updateTask,
  removeTask,
  updateMessages,
})(TasksItem);
