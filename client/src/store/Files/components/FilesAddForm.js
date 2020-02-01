import React, { Component } from "react";
import { connect } from "react-redux";

import { addFiles } from "../actions";
import { updateTask } from "../../Tasks/actions";
import { StyledFilesAddForm } from "../styles/StyledFilesAddForm";

class FilesAddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: ""
    };
  }
  // onChangeInput = (event) => {
  //   this.setState({
  //     ...this.state,
  //     [event.currentTarget.name]: event.currentTarget.value
  //   });
  // };
  onChangeSelect = event => {
    this.setState({
      ...this.state,
      [event.currentTarget.name]: event.currentTarget.value
    });
  };
  addHandler = async event => {
    const { addFiles, taskId, updateTask } = this.props;
    event.preventDefault();

    if (taskId !== "") {
      await addFiles({ taskId });
      await updateTask({ _id: taskId });
    }
  };

  render() {
    return (
      <React.Fragment>
        <StyledFilesAddForm>
          <div className="files-add-form-box">
            <form action="" method="post" encType="multipart/form-data">
              <div className="form-group form-row">
                <label htmlFor="" />
                <input
                  onChange={this.onChangeInput}
                  id="file-select"
                  type="file"
                  name="files[]"
                  className="form-control"
                  multiple
                />
              </div>
              <div className="form-group">
                <input
                  onClick={this.addHandler}
                  className="btn btn-primary float-right"
                  type="submit"
                  value="dodaj"
                />
              </div>
            </form>
          </div>
        </StyledFilesAddForm>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, { addFiles, updateTask })(FilesAddForm);
