import React, { Component } from "react";
import { connect } from "react-redux";

import PatternsItem from "./PatternsItem";
import { StyledPatternsList } from "../styles/StyledPatternsList";

class PatternsList extends Component {
  render() {
    const { patterns } = this.props;
    const listContainer =
      patterns.length > 0
        ? patterns.map((item) => <PatternsItem item={item} key={item._id} />)
        : null;

    return (
      <StyledPatternsList>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Tytuł</th>
              <th scope="col">Status</th>
              <th scope="col">Typ</th>
              <th scope="col">Zlecający</th>
              <th scope="col">Wykonawca</th>
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
