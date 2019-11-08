import React, { Component } from "react";
import { connect } from "react-redux";
import Moment from "react-moment";

import { updateTask } from "../actions";

class TasksItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      toggleDescription: false
    };
  }

  componentDidMount() {
    const {
      _id,
      title,
      description,
      projectName,
      responsiblePerson,
      status,
      priority,
      createdBy,
      termAt,
      createdAt
    } = this.props.item;
    this.setState({
      _id,
      title,
      description,
      projectName,
      responsiblePerson,
      status,
      priority,
      createdBy,
      termAt,
      createdAt
    });
    // console.log(this.props.item);
  }

  switch = () => {
    const { toggle } = this.state;
    this.setState({ toggle: !toggle });
  };

  onChangeHandler = event => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onClickDescriptionHandler = () => {
    const { updateTask } = this.props;
    const { _id, description } = this.state;
    const data = {
      _id,
      description
    };
    console.log("update", updateTask(data));
  };

  onKeyUpHandler = event => {
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
        createdAt
      } = this.state;

      console.log("keypress");
      const data = {
        _id,
        title,
        projectName,
        responsiblePerson,
        status,
        priority,
        createdBy,
        termAt,
        createdAt
      };
      console.log("update", updateTask(data));
      this.setState({
        toggle: false
      });
    }
  };

  onChangeSelectHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
    const { updateTask } = this.props;
    const { _id } = this.state;
    const data = {
      _id,
      [event.target.name]: event.target.value
    };
    console.log("update", updateTask(data));
  };

  clear = () => {
    this.setState({
      toggle: false
    });
  };

  render() {
    const priorities = [
      {
        _id: 1,
        name: "Pali się"
      },
      {
        _id: 2,
        name: "Priorytetowo"
      },
      {
        _id: 3,
        name: "Normalny"
      },
      {
        _id: 4,
        name: "W wolnym czasie"
      },
      {
        _id: 5,
        name: "Można wykonać ale nie trzeba"
      }
    ];
    const statuses = [
      {
        _id: 1,
        name: "Do wykonania"
      },
      {
        _id: 2,
        name: "W trakcie"
      },
      {
        _id: 3,
        name: "Do akceptacji"
      },
      {
        _id: 4,
        name: "Wykonane"
      },
      {
        _id: 5,
        name: "Zawieszone"
      }
    ];
    // const { item } = this.props;
    const {
      toggle,
      toggleDescription,
      title,
      description,
      projectName,
      responsiblePerson,
      status,
      priority,
      createdBy,
      termAt,
      createdAt
    } = this.state;
    return (
      <React.Fragment>
        <tr>
          <td className="name">
            {" "}
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
          </td>
          <td className="project-name">{projectName}</td>
          <td className="status">
            <select
              className="form-control"
              onChange={this.onChangeSelectHandler}
              name="status"
              required
            >
              <option value="">Stan</option>
              {statuses
                ? statuses.map(item => {
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
              required
            >
              <option value="">Priorytet</option>
              {priorities
                ? priorities.map(item => {
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
          <td className="createdBy">{createdBy}</td>
          <td className="responsiblePerson">{responsiblePerson}</td>
          <td className="term">
            <Moment format="YYYY-MM-DD HH:mm">{termAt}</Moment>
          </td>
          <td className="createdAt">{createdAt}</td>
          <td className="description">
            <i
              className="glyphicon glyphicon-edit"
              onClick={() =>
                this.setState({ toggleDescription: !toggleDescription })
              }
            ></i>
            {toggleDescription ? (
              <div className="desc-box">
                <textarea
                  onChange={this.onChangeHandler}
                  name="description"
                  value={description}
                  cols="45"
                  rows="10"
                ></textarea>
                <button
                  onClick={this.onClickDescriptionHandler}
                  className="btn btn-default pull-right"
                >
                  zapisz
                </button>
              </div>
            ) : null}
          </td>
        </tr>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  { updateTask }
)(TasksItem);
