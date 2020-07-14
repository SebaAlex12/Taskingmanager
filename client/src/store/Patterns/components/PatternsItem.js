import React, { Component } from "react";
import moment from "moment";

import { Button } from "../../../themes/basic";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class PatternsItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      elements: [],
    };
  }
  componentDidMount() {
    const {
      item: { elements },
    } = this.props;
    this.setState({
      elements: JSON.parse(elements),
    });
  }
  render() {
    const { item } = this.props;
    const { toggle, elements } = this.state;
    // let listContainer = "";
    // if (patterns.length > 0) {
    //   console.log("patterns", patterns);
    //   console.log("json parse", JSON.parse(patterns[1]["elements"]));
    // }
    console.log("elements", elements);
    const elementsContainer =
      elements.length > 0
        ? elements.map((el) => <li key={el._id}>{el.text}</li>)
        : null;
    return (
      <React.Fragment>
        <tr>
          <td>{item.title}</td>
          <td>{item.status}</td>
          <td>{item.type}</td>
          <td>{item.createdBy}</td>
          <td>{item.responsoblePerson}</td>
          <td>{moment(item.termAt).format("YYYY-MM-DD HH:mm:ss")}</td>
          <td>{moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss")}</td>
          <td>
            <Button onClick={() => this.setState({ toggle: !toggle })}>
              <FontAwesomeIcon icon={faEdit} />
            </Button>
            {/* {console.log("elements", elements)} */}
          </td>
        </tr>
        {toggle ? (
          <tr>
            <td colspan="8">
              <ul className="elements-box">{elementsContainer}</ul>
            </td>
          </tr>
        ) : null}
      </React.Fragment>
    );
  }
}
export default PatternsItem;
