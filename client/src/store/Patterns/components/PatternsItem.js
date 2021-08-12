import React, { Component } from "react";
import moment from "moment";
import { connect } from "react-redux";

import { addPattern, updatePattern } from "../actions";
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
      const person = responsiblePerson ? responsiblePerson : users[0].name;
      const filteredTasks = this.filteredTasks(tasks, taskId, person);
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
        // elements: item.elements,
        elements: JSON.parse(item.elements).map((item) => {
          return item;
        }),
      });
    }
  }
  filteredTasks = (tasks, taskId = null, responsiblePerson = null) => {
    let filteredTasks = [];
    if (taskId) {
      filteredTasks = tasks.filter((task) => task._id === taskId);
    } else if (responsiblePerson) {
      filteredTasks = tasks.filter(
        (task) => task.responsiblePerson === responsiblePerson
      );
    } else {
      filteredTasks = tasks;
    }
    return filteredTasks;
  };
  checkIfExistsAttachedPattern = (
    patterns,
    taskId = null,
    responsiblePerson = null
  ) => {
    let boolean = false;
    if (taskId && responsiblePerson) {
      let filtered = patterns.filter(
        (pattern) =>
          pattern.taskId === taskId &&
          pattern.responsiblePerson === responsiblePerson
      );
      if (filtered.length > 0) {
        boolean = true;
      }
    }
    return boolean;
  };
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
      status,
      finishedAt,
      termAt,
      createdAt,
    };
    event.preventDefault();
    addPattern(data);
  };
  onChangeSelectHandler = (event) => {
    const { updatePattern, attachedPatternCollback } = this.props;
    const { patternNumber } = this.state;

    this.setState({
      ...this.state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
    if (event.currentTarget.name === "status") {
      updatePattern({ _id: patternNumber, status: event.currentTarget.value });
      attachedPatternCollback({ status: event.currentTarget.value });
    }
  };
  onChangeUserHandler = (event) => {
    const { tasks } = this.props;
    if (tasks.length > 0) {
      const newTasks = tasks.filter(
        (task) => task.responsiblePerson === event.target.value
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
    const { elements, patternNumber } = this.state;
    const { updatePattern, attachedPatternCollback } = this.props;
    let newElements = [];

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

    const result = updatePattern({ _id: patternNumber, elements: newElements });
    if(result){
      attachedPatternCollback({ elements: newElements });
    }
  };
  onChangeActiveHandler = (event) => {
    const { updatePattern, attachedPatternCollback } = this.props;
    const { elements, patternNumber } = this.state;

    let newElements = elements.map((item) => {
      item.active =
        item.id === event.target.name ? event.target.checked : item.active;
      return item;
    });

    this.setState({
      ...this.state,
      elemenets: newElements,
    });
    const result = updatePattern({ _id: patternNumber, elements: newElements });
    if(result){
      attachedPatternCollback({ elements: newElements });
    }
  };

  render() {
    const { item, users, patterns } = this.props;
    const {
      toggle,
      elements,
      responsiblePerson,
      taskId,
      filteredTasks,
      disabled,
    } = this.state;

    // if is disabled it means this is attached pattern to selected task

    let loadedTasks = [];
    if (filteredTasks.length > 0) {
      loadedTasks = filteredTasks.map((task) => {
        return (
          <option key={task._id} value={task._id}>
            {task.title}
          </option>
        );
      });
    }

    let loadedStatuses = [];
    loadedStatuses = pattern_statuses.map((status) => {
      return (
        <option key={status._id} value={status.name}>
          {status.name}
        </option>
      );
    });

    const assignPattern = this.checkIfExistsAttachedPattern(
      patterns,
      taskId,
      responsiblePerson
    );

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
          <td>
            <select
              className="form-control"
              onChange={this.onChangeSelectHandler}
              name="status"
              disabled={item.type === "Wzór" ? "disabled" : null}
              // value={status}
              defaultValue={item.status}
              required
            >
              {loadedStatuses}
            </select>
          </td>
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
            {assignPattern === false ? (
              <Button onClick={this.addHandler} title="Przypisz do zadania">
                <FontAwesomeIcon icon={faPlusSquare} />
              </Button>
            ) : null}
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
    users: state.users.users,
    tasks: state.tasks.tasks,
    patterns: state.patterns.patterns,
  };
};
export default connect(mapStateToProps, { addPattern, updatePattern })(
  PatternsItem
);
