import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { addComment } from "../actions";
import { updateTask } from "../../Tasks/actions";
import { addUserHistory } from "../../UsersHistory/actions";

import { StyledCommentAddForm } from "../styles/StyledCommentAddForm";

const CommentsAddForm = (props) => {

  const { taskId } = props;

  const dispatch = useDispatch();
  const [ description, setDescription ] = useState('');
  const loggedUser = useSelector( state => state.users.logged_user );
  
  const onChangeTextImagesArea = (event) => {
      setDescription(event.target.value);
  }

  const submitComment = (event) => {
    event.preventDefault();  
    console.log('description',description);

    const data = {
      taskId: taskId,
      userId: loggedUser._id,
      createdBy: loggedUser.name,
      description,
    };

    dispatch(addComment(data));

    // addUserHistory({
    //   userId: loggedUser._id,
    //   userName: loggedUser.name,
    //   taskCreatedBy: taskCreatedBy,
    //   taskProjectName: taskProjectName,
    //   taskTitle: taskTitle,
    //   event: "dodany komentarz do zadania",
    //   createdAt: moment(new Date(), "YYYY-MM-DD HH:mm:ss").format(),
    // });

  }

  return(
      <StyledCommentAddForm>
        <div className="comment-add-form-box">
          <form action="">
            <div className="form-group">
              <textarea
                onInput={onChangeTextImagesArea}
                type="text"
                name="description"
                value={description}
                className="form-control"
                rows="5"
                placeholder="Dodaj komentarz"
                required
              ></textarea>
            </div>
            <div className="form-group">
              <input
                onClick={submitComment}
                className="btn btn-primary pull-right"
                type="submit"
                value="dodaj"
              />
            </div>
          </form>
        </div>
      </StyledCommentAddForm>
    )
}

export default CommentsAddForm;