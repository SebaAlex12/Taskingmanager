import React from "react";

export default function TasksItem({ item }) {
  return (
    <div>
      <div key={item.id}>{item.title}</div>
    </div>
  );
}
