import React, { Component } from "react";
import { connect } from "react-redux";

import PatternsItem from "./PatternsItem";
import { StyledPatternsList } from "../styles/StyledPatternsList";

class PatternsList extends Component {
  render() {
    const {
      patterns,
      userId,
      taskId,
      responsiblePerson,
      attachedPattern,
      attachedPatternCollback,
    } = this.props;

    let listContainer = [];

    if (patterns.length > 0) {
      // jesli przekazany jest id zadania to to zadanie jest przypisane do szablonu i szablon jest blokowany
      const disabled =
        typeof taskId !== "undefined" && taskId.length > 0 ? true : false;
      if (
        typeof attachedPattern !== "undefined" &&
        attachedPattern.length > 0
      ) {
        listContainer = (
          <PatternsItem
            item={attachedPattern[0]}
            key={attachedPattern[0]._id}
            userId={userId}
            taskId={taskId}
            responsiblePerson={responsiblePerson}
            disabled={disabled}
            attachedPatternCollback={attachedPatternCollback}
          />
        );
      } else {
        listContainer = patterns.map((item) => {
          if (item.type == "Wzór") {
            return (
              <PatternsItem
                item={item}
                key={item._id}
                userId={userId}
                taskId={taskId}
                responsiblePerson={responsiblePerson}
                disabled={disabled}
              />
            );
          }
        });
      }
    }

    return (
      <StyledPatternsList>
        <table className="patterns-table-box table table-striped">
          <thead>
            <tr>
              <th scope="col">Tytuł</th>
              <th scope="col">Status</th>
              <th scope="col">Typ</th>
              <th scope="col">Zlecający</th>
              <th scope="col">Wykonawca</th>
              <th scope="col">Zadanie</th>
              <th scope="col">Termin</th>
              <th scope="col">Utworzono</th>
              <th scope="col">Akcje</th>
            </tr>
          </thead>
          <tbody>{listContainer}</tbody>
        </table>
      </StyledPatternsList>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    patterns: state.patterns.patterns,
  };
};
export default connect(mapStateToProps)(PatternsList);
