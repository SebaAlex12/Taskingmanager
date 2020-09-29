import React from "react";

export default function TextFieldGroup({ name, items, onChange, disabled }) {
  let counter = 1;
  const selectOptionsContent = items
    ? items.map((item) => (
        <option key={counter++} value={item.name}>
          {item.name}
        </option>
      ))
    : null;
  return (
    <div className="form-group">
      <select
        name={name}
        id=""
        className="form-control"
        onChange={onChange}
        disabled={disabled ? "disabled" : null}
      >
        {selectOptionsContent}
      </select>
    </div>
  );
}
