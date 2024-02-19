import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
// import moment from "moment";
import moment from "moment/min/moment-with-locales";

import { priorities, statuses } from "../../ini";
import { fetchComments } from '../../Comments/actions';
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
    // const selectedComments = useSelector(state=> state.comments.comments);

    const [ isActive, setIsActive ] = useState(false);
    const [ text, setText ] = useState(description);
    // const [ comments, setComments ] = useState([]);

    // useEffect(() => {
    //   console.log('comments init');
    //   console.log('selected comments',selectedComments);
    //     if(selectedComments.taskId === _id){
    //         setComments(selectedComments);
    //     }
    // },[]);
    // useEffect(() => {
    //     console.log('selected comments has been changed');
    // },[selectedComments]);

    const setActive = () => {
        setIsActive(prevState => !prevState);
        if(isActive === false){
            dispatch(fetchComments({taskId:_id}));
        }
    }

    const remove = () => {
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
              // value={responsiblePerson}
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
              onClick={setActive} 
              title="Edytuj"
              >
              <FontAwesomeIcon icon={faEdit} />
            </Button>
            {
              loggedUser.name === createdBy && (
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

export default React.memo(TaskItem);