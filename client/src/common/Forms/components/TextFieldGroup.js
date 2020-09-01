import React from "react";

export default function TextFieldGroup({
  type,
  title,
  onChange,
  name,
  value,
  disabled,
  placeholder,
}) {
  return (
    <div className="form-group">
      <input
        className="form-control"
        type={type}
        title={title}
        onChange={onChange}
        name={name}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
      />
    </div>
  );
}
