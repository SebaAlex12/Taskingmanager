import React from "react";

export default function TasksItem({
  item,
  removeTaskHandler,
  updateStatusTaskHandler
}) {
  return (
    <div>
      <div className="info">
        <div className="title">{item.title}</div>
        <div className="create-date">{item.createdAt}</div>
      </div>
      <div className="decription">{item.description}</div>
      <button onClick={removeTaskHandler}>delete</button>
      <button onClick={updateStatusTaskHandler}>done</button>
    </div>
  );
}
