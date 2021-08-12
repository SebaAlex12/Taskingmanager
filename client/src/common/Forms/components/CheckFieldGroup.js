import React from "react";

export default function CheckFieldGroup({
  key,
  name,
  value,
  text,
  isChecked = false,
  isDisabled = false,
  onChangeHandler,
}) {
  return (
    <div className="form-check" key={key}>
      <input
        className="form-check-input"
        type="checkbox"
        name={name}
        value={value}
        onChange={onChangeHandler}
        checked={isChecked}
        disabled={isDisabled ? true : false}
      />
      <label className="form-check-label" htmlFor={text}>
        {text}
      </label>
    </div>
  );
}
