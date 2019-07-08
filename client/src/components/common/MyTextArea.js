import React from "react";
import classNames from "classnames";

const InputFeedback = ({ error }) =>
  error ? <div className={classNames("input-feedback")}>{error}</div> : null;

export const MyTextArea = ({
  id,
  label,
  placeholder,
  defaultValue,
  onChange,
  onFocus,
  onBlur,
  touched,
  className,
  ...props
}) => {
  return (
    <div>
      <input
        type="text"
        margin="normal"
        class="form-control" 
        aria-label="Sizing example input" 
        aria-describedby="inputGroup-sizing-default"
        multiline
        id={id}
        placeholder={placeholder}
        defaultValue={defaultValue} 
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <label htmlFor={id}>{label}</label>
      {/* {touched[name] && <InputFeedback error={errors[name]} />} */}
    </div>
  );
};

