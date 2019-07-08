import React from "react";
import classNames from "classnames";

const InputFeedback = ({ error }) =>
  error ? <div className={classNames("input-feedback")}>{error}</div> : null;

export const MyRadioButton = ({
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  touched,
  // className,
  ...props
}) => {
  return (
      <div class="form-check">
        <input class="form-check-input col-2" 
          type="radio" 
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          />
        <label 
          class="form-check-label col-10" 
          for={id}>
          {label}
        </label>
      </div>
  );
};

