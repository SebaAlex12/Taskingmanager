import React, { Component } from "react";
import { StyledModalDialog } from "../styles/StyledModalDialog";

class ModalDialog extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: true
    }
  }
  render() {
    const { title, showModal } = this.props;
    const { open } = this.state;
    
    const $modalContent = open ? (
      <StyledModalDialog>
        <div className="modal-dialog-box">
          <div className="content">
            <div className="title">{title}</div>
            <div className="" onClick={showModal}>X</div>
            <div className="description">{this.props.children}</div>
          </div>
        </div>
      </StyledModalDialog>
      ):null;
    
    return(
      <React.Fragment>
        { $modalContent }
      </React.Fragment>
    )
  }
}
export default ModalDialog;
