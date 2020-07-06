import React, { Component } from "react";

class CalendarTasksList extends Component {
  render() {
    const { tasksList } = this.props;

    let listContainer = "";
    listContainer = tasksList.map((item) => {
      // console.log("item", item);
      return <div key={item._id}>{item._id}</div>;
    });

    return (
      <div>
        <h1>Daily tasksList list</h1>
        {listContainer}
      </div>
    );
  }
}
export default CalendarTasksList;
