import React from "react";

import { SubTitle, Button } from "../../../themes/basic";
import { StyledTasksItem } from "../styles/StyledTasksItem";

export default function TasksItem({
  item,
  removeTaskHandler,
  updateStatusTaskHandler
}) {
  const isDone = item.status === "done" ? true : false;
  const statusText =
    item.status === "done" ? "switch to active" : "switch to done";
  return (
    <StyledTasksItem>
      <div className="info">
        <SubTitle>{item.title}</SubTitle>
        <div className="create-date">Created: {item.createdAt}</div>
      </div>
      <div className="decription">{item.description}</div>
      {isDone ? (
        <Button variant="warning" onClick={removeTaskHandler}>
          delete
        </Button>
      ) : null}
      <Button variant="success" onClick={updateStatusTaskHandler}>
        {statusText}
      </Button>
    </StyledTasksItem>
  );
}
