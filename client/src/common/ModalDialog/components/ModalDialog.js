import React, { Component } from "react";
import { StyledModalDialog } from "../styles/StyledModalDialog";

import { WarningButton } from "../../../themes/basic";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ModalDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true
    };
    // console.log("bst", window);
    // document.body.style.overflow = "hidden";
  }
  render() {
    const { title, showModal, width } = this.props;
    const { open } = this.state;

    const $modalContent = open ? (
      <StyledModalDialog>
        <div className="modal-dialog-box">
          <div className="content" style={{ width: width ? width : "780px" }}>
            <div className="title">{title}</div>
            <WarningButton className="close-button" onClick={showModal}>
              <FontAwesomeIcon icon={faTimes} />
            </WarningButton>
            <div className="description">{this.props.children}</div>
          </div>
        </div>
      </StyledModalDialog>
    ) : null;

    return <React.Fragment>{$modalContent}</React.Fragment>;
  }
}
export default ModalDialog;
