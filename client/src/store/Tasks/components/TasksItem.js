import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";

import { updateTask } from "../actions";
import CommentsAddForm from "../../Comments/components/CommentsAddForm";
import CommentsList from "../../Comments/components/CommentsList";
import { priorities, statuses } from "../../ini";
import { updateMessages } from "../../Messages/actions";

import FilesAddForm from "../../Files/components/FilesAddForm";
import FilesItem from "../../Files/components/FilesItem";

class TasksItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false
    };
  }

  componentDidMount() {
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
      files
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
      files
    });
    // console.log(this.props.item);
  }

  // componentDidUpdate() {
  //   console.log("update props", this.props);
  // }

  componentWillReceiveProps(nextProps) {
    // const {
    //   item: { files }
    // } = nextProps;
    // const { files } = this.state;
    console.log("comp wil resive");
    if (nextProps.item.files !== this.props.item.files) {
      // console.log("next props files", nextProps.item.files);
      this.setState({
        files: nextProps.item.files
      });
    }
    // console.log("next state", nextState);
    // console.log("next props", files);
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
    const { updateTask, updateMessages } = this.props;
    const { _id, description } = this.state;
    const data = {
      _id,
      description
    };
    const response = updateTask(data);
    if (response) {
      updateMessages([{ name: "Zadanie" }, { value: "opis został zmieniony" }]);
    }
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
    const { updateTask, updateMessages } = this.props;
    const { _id } = this.state;
    const data = {
      _id,
      [event.target.name]: event.target.value
    };
    const response = updateTask(data);
    if (response) {
      updateMessages([
        { name: "Zadanie" },
        { value: event.target.name + " został zmieniony" }
      ]);
    }
  };

  clear = () => {
    this.setState({
      toggle: false
    });
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
      files
    } = this.state;
    const { setActiveTaskHandler, active } = this.props;
    // console.log("state item", this.state);

    // let filesUrls;
    // filesUrls = [];
    let filesContent;
    // console.log("files", files);

    if (files && files.length > 0) {
      // console.log("files", files);
      let item = 0;
      filesContent = files.map(file => {
        // console.log("file", file);
        let imageUrl = `/files/tasks/${_id}/${file}`;
        // filesUrls.push(imageUrl);
        let fileNumber = item++;
        return (
          <FilesItem
            key={file}
            imageUrl={imageUrl}
            // lightboxPhotosHandler={() => this.lightboxPhotosHandler(fileNumber)}
          />
        );
      });
    }

    return (
      <React.Fragment>
        <tr>
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
          <td className="term">{moment(new Date(termAt)).format("D/M/Y")}</td>
          <td className="createdAt">
            {moment(new Date(createdAt)).format("D/M/Y")}
          </td>
          <td className="details">
            <i
              className="glyphicon glyphicon-edit"
              onClick={setActiveTaskHandler}
            ></i>
          </td>
        </tr>
        {active ? (
          <React.Fragment>
            <tr>
              <td colSpan="9">
                <div className="desc-box">
                  <i
                    className="glyphicon glyphicon-pencil"
                    onClick={this.onClickDescriptionHandler}
                  ></i>
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

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, { updateTask, updateMessages })(
  TasksItem
);
