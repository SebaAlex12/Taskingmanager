import React, { Component } from "react";
import { connect } from "react-redux";

import { addComment } from "../actions";
import { updateTask } from "../../Tasks/actions";
import { StyledCommentAddForm } from "../styles/StyledCommentAddForm";

class CommentsAddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: ""
    };
  }
  onChangeInput = event => {
    this.setState({
      ...this.state,
      [event.currentTarget.name]: event.currentTarget.value
    });
  };
  addHandler = event => {
    const {
      addComment,
      taskId,
      responsiblePerson,
      loggedUser,
      updateTask
    } = this.props;
    const { description } = this.state;

    const data = {
      taskId: taskId,
      userId: loggedUser._id,
      createdBy: loggedUser.name,
      description
    };

    const responsiblePersonLastComment =
      loggedUser.name === responsiblePerson ? true : false;

    // console.log(responsiblePersonLastComment);

    event.preventDefault();
    // console.log(data);
    addComment(data);
    updateTask({
      _id: taskId,
      responsiblePersonLastComment: responsiblePersonLastComment
    });
  };
  render() {
    return (
      <StyledCommentAddForm>
        <div className="comment-add-form-box">
          <form action="">
            <div className="form-group">
              <textarea
                onChange={this.onChangeInput}
                type="text"
                name="description"
                className="form-control"
                rows="5"
                placeholder="Dodaj komentarz"
                required
              />
            </div>
            <div className="form-group">
              <input
                onClick={this.addHandler}
                className="btn btn-primary pull-right"
                type="submit"
                value="dodaj"
              />
            </div>
          </form>
        </div>
      </StyledCommentAddForm>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedUser: state.users.logged_user
  };
};

export default connect(mapStateToProps, { addComment, updateTask })(
  CommentsAddForm
);
