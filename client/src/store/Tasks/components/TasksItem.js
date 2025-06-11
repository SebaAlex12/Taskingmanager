import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
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
      responsiblePersonId,
      responsiblePersonLastComment,
      status,
      priority,
      createdById,
      termAt,
      createdAt,
      comments,
    } = props.item;

    const dispatch = useDispatch();
    const loggedUser = useSelector(state => state.users.logged_user);
    const users = useSelector(state => state.users.users);

    const descriptionRef = useRef();
    const [ isActive, setIsActive ] = useState(false);
    const [ commentsTask, setCommentsTask ] = useState(comments); 

    const setActive = () => {
        setIsActive(prevState => !prevState);
    }

    const remove = () => {
      const result = window.confirm(`Czy napewno chcesz usunąć zadanie: ${title}`);
      if (result === true) {
        const response = dispatch(removeTask(_id));
        if(response) window.confirm(`Zadanie: zostało usunięte`);
      }
    };

    const addComment = (data) => {
        setCommentsTask(prevState => [...prevState,data]);
    }

    const onChangeSelect = (event) => {
      const data = {
        _id,
        [event.target.name]: event.target.value,
      };
      const response = dispatch(updateTask(data));
      if(response) window.confirm(`${[event.target.name]} został zmieniony`);
    };

    const onClickSubmitDescription = () => {
      const data = {
        _id,
        description: descriptionRef.current.value,
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
              disabled={loggedUser._id !== createdById ? "disabled" : null}
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
            <div>{createdById}</div>
          </td>
          <td className="responsiblePerson">
            <select
              className="form-control"
              onChange={onChangeSelect}
              name="responsiblePerson"
              disabled={loggedUser._id !== createdById ? "disabled" : null}
              defaultValue={responsiblePersonId}
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
              onClick={setActive} 
              title="Edytuj"
              >
              <FontAwesomeIcon icon={faEdit} />
            </Button>
            {
              loggedUser._id === createdById && (
                <WarningButton
                  warning
                  onClick={remove}
                  title="Usuń"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </WarningButton>
              )
            }
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
                    ref={descriptionRef}
                    defaultValue={description}
                    cols="40"
                    rows="10"
                  ></textarea>
                </div>
                <CommentsList
                  comments={commentsTask}
                  responsiblePersonId={responsiblePersonId}
                />
                <CommentsAddForm
                  taskId={_id}
                  taskProjectName={projectName}
                  taskTitle={title}
                  taskCreatedById={createdById}
                  responsiblePersonId={responsiblePersonId}
                  addCommentHandler={addComment}
                />
              </td>
            </tr>
          </React.Fragment>
        ) : null}
      </React.Fragment>
    )
}

export default React.memo(TaskItem);