import React, { Component } from "react";
import moment from "moment";

import { Button } from "../../../themes/basic";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class PaymentsGeneratorItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: false,
    };
  }
  onChangeSelectHandler = (element) => {
    const {
      itemSelectorHandler,
      item: { _id },
    } = this.props;
    const { selectedItem } = this.state;
    itemSelectorHandler(_id, !selectedItem);

    this.setState({
      ...this.state,
      ...element,
    });
  };
  render() {
    const {
      item: {
        paymentType,
        paymentMonth,
        paymentCycle,
        paymentNumber,
        contractorName,
        description,
        netValue,
        grossValue,
        status,
        termAt,
        createdAt,
      },
    } = this.props;

    const { selectedItem } = this.state;

    return (
      <tr>
        <td>
          <Button title={description}>
            <FontAwesomeIcon icon={faInfo} />
          </Button>
          {paymentNumber}
        </td>
        <td>{contractorName}</td>
        <td>{paymentType}</td>
        <td>{status}</td>
        <td>{paymentCycle}</td>
        <td>{paymentMonth}</td>
        <td>{termAt}</td>
        <td>{moment(createdAt).format("YYYY-MM-DD HH:mm:ss")}</td>
        <td>{netValue}</td>
        <td>{grossValue}</td>
        <td className="details">
          <input
            className="form-control"
            type="checkbox"
            name="selectedItem"
            value={selectedItem}
            onChange={() =>
              this.onChangeSelectHandler({ selectedItem: !selectedItem })
            }
          />
        </td>
      </tr>
    );
  }
}
export default PaymentsGeneratorItem;
