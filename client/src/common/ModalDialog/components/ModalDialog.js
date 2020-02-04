import React, { Component } from "react";
import { StyledModalDialog } from "../styles/StyledModalDialog";

class ModalDialog extends Component {
  render() {
    const { title, description, action } = this.props;
    return (
      <StyledModalDialog>
        <div className="modal-dialog-box">
          <div className="content">
            <div className="title">{title}</div>
            <div className="description">{description}</div>
          </div>
        </div>
      </StyledModalDialog>
    );
  }
}
export default ModalDialog;
