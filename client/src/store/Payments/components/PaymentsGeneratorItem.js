import React, { Component } from "react";
import moment from "moment";

import { Button } from "../../../themes/basic";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class PaymentsGeneratorItem extends Component {
  showDetails = () => {
    console.log("show details");
  };
  render() {
    const {
      item: {
        _id,
        paymentType,
        paymentMonth,
        paymentCycle,
        paymentNumber,
        contractorName,
        netValue,
        grossValue,
        status,
        termAt,
        createdAt
      },
      item
    } = this.props;

    return (
      <tr>
        <td>{paymentNumber}</td>
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
          <Button onClick={this.showDetails}>
            <FontAwesomeIcon icon={faFilePdf} />
          </Button>
        </td>
      </tr>
    );
  }
}
export default PaymentsGeneratorItem;
