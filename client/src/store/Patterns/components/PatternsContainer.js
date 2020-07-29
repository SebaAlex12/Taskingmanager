import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchPatterns } from "../actions";
import { BiggerButton } from "../../../themes/basic";
import { StyledPatternsContainer } from "../styles/StyledPatternsContainer";
import PatternsAddForm from "./PatternsAddForm";
import PatternsList from "./PatternsList";

class PatternsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      togglePatternsAddForm: false,
    };
  }
  componentDidMount() {
    const { fetchPatterns } = this.props;
    fetchPatterns();
  }
  render() {
    const { togglePatternsAddForm } = this.state;
    const {
      loggedUser,
      userId,
      taskId,
      responsiblePerson,
      attachedPattern,
      disabled,
    } = this.props;
    const btn_clazz = togglePatternsAddForm ? "flow-box active" : "flow-box";

    return (
      <StyledPatternsContainer>
        <div className="patterns-container-box">
          <h1>Szablony - postępowanie według wytycznych</h1>
          <PatternsList
            userId={userId}
            taskId={taskId}
            responsiblePerson={responsiblePerson}
            attachedPattern={attachedPattern}
            disabled={disabled}
          />
          {loggedUser.status === "Administrator" ? (
            <div className={btn_clazz}>
              <BiggerButton
                variant="primary"
                onClick={() =>
                  this.setState({
                    togglePatternsAddForm: !togglePatternsAddForm,
                  })
                }
              >
                Dodaj szablon
              </BiggerButton>
              {togglePatternsAddForm ? <PatternsAddForm /> : null}
            </div>
          ) : null}
        </div>
      </StyledPatternsContainer>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loggedUser: state.users.logged_user,
  };
};
export default connect(mapStateToProps, { fetchPatterns })(PatternsContainer);
