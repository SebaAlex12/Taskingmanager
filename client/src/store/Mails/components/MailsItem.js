import React, { Component } from "react";
import moment from "moment";

class MailsItem extends Component {
  render() {
    const { item } = this.props;
    return (
      <tbody>
        <td>{item.from}</td>
        <td>{item.to}</td>
        <td>{item.projectName}</td>
        <td>{item.title}</td>
        <td>{item.desciption}</td>
        <td>{item.absolutePathFile}</td>
        <td>{item.attachments}</td>
        <td>{item.createdBy}</td>
        <td className="createdAt">
          {moment(new Date(item.createdAt)).format("D/M/Y")}
        </td>
      </tbody>
    );
  }
}
export default MailsItem;
