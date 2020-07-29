import React, { Component } from "react";
import moment from "moment";
import { connect } from "react-redux";

import { addPattern } from "../actions";
import { Button } from "../../../themes/basic";
import {
  faEdit,
  faPlusSquare,
  faDotCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { pattern_statuses } from "../../ini";

class PatternsItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      disabled: false,
      filteredTasks: [],
      patternNumber: "",
      userId: "",
      taskId: "",
      createdBy: "",
      responsiblePerson: "",
      title: "",
      description: "",
      elements: [],
      type: "Grupa zadań",
      status: pattern_statuses[0],
      finishedAt: "",
      termAt: "",
      createdAt: moment(new Date(), "YYYY-MM-DD HH:mm:ss").format(),
    };
  }
  componentDidMount() {
    const {
      item,
      users,
      tasks,
      userId,
      taskId,
      responsiblePerson,
      disabled,
    } = this.props;

    if (tasks.length > 0 && users.length > 0) {
      const filteredTasks = tasks.filter(
        (task) => task.responsiblePerson == users[0].name
      );
      this.setState({
        patternNumber: item._id,
        filteredTasks: filteredTasks,
        userId: userId ? userId : users[0]._id,
        taskId: taskId ? taskId : tasks[0]._id,
        createdBy: item.createdBy,
        responsiblePerson: responsiblePerson
          ? responsiblePerson
          : users[0].name,
        disabled,
        title: item.title,
        description: item.description,
        elements: JSON.parse(item.elements).map((item) => {
          item.active = true;
          return item;
        }),
      });
    }
  }
  addHandler = (event) => {
    const { addPattern } = this.props;
    const {
      patternNumber,
      userId,
      taskId,
      createdBy,
      responsiblePerson,
      title,
      description,
      elements,
      type,
      status,
      finishedAt,
      termAt,
      createdAt,
    } = this.state;
    const data = {
      patternNumber,
      userId,
      taskId,
      createdBy,
      responsiblePerson,
      title,
      description,
      elements,
      type,
      status: status["name"],
      finishedAt,
      termAt,
      createdAt,
    };
    event.preventDefault();
    console.log("add pattern data", data);
    const result = addPattern(data);
  };
  onChangeSelectHandler = (event) => {
    this.setState({
      ...this.state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };
  onChangeUserHandler = (event) => {
    const { tasks } = this.props;
    if (tasks.length > 0) {
      const newTasks = tasks.filter(
        (task) => task.responsiblePerson == event.target.value
      );
      this.setState({
        ...this.state,
        responsiblePerson: event.target.value,
        taskId: newTasks[0]._id,
        filteredTasks: newTasks,
      });
    }
  };
  switchSelectAll = () => {
    const { elements } = this.state;
    let newElements = [];
    // console.log("elements", elements);

    if (
      elements[0]["active"] === "undefined" ||
      elements[0]["active"] === false
    ) {
      newElements = elements.map((item) => {
        item["active"] = true;
        return item;
      });
    } else {
      newElements = elements.map((item) => {
        item["active"] = false;
        return item;
      });
    }
    this.setState({
      ...this.state,
      elements: newElements,
    });
  };
  onChangeActiveHandler = (event) => {
    const { elements } = this.state;
    // console.log("event", event.target.checked);
    let newElements = elements.map((item) =>
      item.id == event.target.name
        ? (item.active = event.target.checked)
        : item.active
    );

    this.setState({
      ...this.state,
      elemenets: newElements,
    });
  };

  render() {
    const { item, loggedUser, users } = this.props;
    const {
      toggle,
      elements,
      responsiblePerson,
      taskId,
      filteredTasks,
      disabled,
    } = this.state;
    // console.log("new elements", elements);

    // if is disabled it means this is attached pattern to selected task
    console.log("disabled", disabled);

    let loadedTasks = [];
    if (filteredTasks) {
      loadedTasks = filteredTasks.map((task) => {
        return (
          <option key={task._id} value={task._id}>
            {task.title}
          </option>
        );
        return null;
      });
    }

    const elementsContainer =
      elements.length > 0
        ? elements.map((el) => (
            <div className="element custom-control custom-checkbox" key={el.id}>
              <input
                className="custom-control-input"
                type="checkbox"
                name={el.id}
                checked={el.active}
                onChange={this.onChangeActiveHandler}
              />
              <label className="custom-control-label" htmlFor="">
                {el.text}
              </label>
            </div>
          ))
        : null;
    return (
      <React.Fragment>
        <tr>
          <td>{item.title}</td>
          <td>{item.status}</td>
          <td>{item.type}</td>
          <td>{item.createdBy}</td>
          <td>
            <select
              className="form-control"
              onChange={this.onChangeUserHandler}
              name="responsiblePerson"
              disabled={disabled ? "disabled" : null}
              value={responsiblePerson}
              // defaultValue={responsiblePerson}
              required
            >
              {users
                ? users.map((user) => {
                    return (
                      <option key={user._id} value={user.name}>
                        {user.name}
                      </option>
                    );
                    return null;
                  })
                : null}
            </select>
          </td>
          <td>
            <select
              className="form-control"
              onChange={this.onChangeSelectHandler}
              name="taskId"
              disabled={disabled ? "disabled" : null}
              // value={taskId}
              defaultValue={taskId}
              required
            >
              {loadedTasks}
            </select>
          </td>
          <td>{moment(item.termAt).format("YYYY-MM-DD HH:mm:ss")}</td>
          <td>{moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss")}</td>
          <td>
            <Button onClick={this.addHandler} title="Przypisz do zadania">
              <FontAwesomeIcon icon={faPlusSquare} />
            </Button>
            <Button
              onClick={() => this.setState({ toggle: !toggle })}
              title="Edytuj"
            >
              <FontAwesomeIcon icon={faEdit} />
            </Button>
          </td>
        </tr>
        {toggle ? (
          <tr>
            <td colSpan="8">
              <form className="elements-box">{elementsContainer}</form>
            </td>
            <td>
              <Button
                onClick={this.switchSelectAll}
                title="Zaznacz / odznacz wszystkie"
              >
                <FontAwesomeIcon icon={faDotCircle} />
              </Button>
            </td>
          </tr>
        ) : null}
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loggedUser: state.users.logged_user,
    users: state.users.users,
    tasks: state.tasks.tasks,
  };
};
export default connect(mapStateToProps, { addPattern })(PatternsItem);
