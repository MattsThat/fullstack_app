import React from "react";
import classNames from "classnames";

const InputFeedback = ({ error }) =>
  error ? <div className={classNames("input-feedback")}>{error}</div> : null;

export const MySelect = ({
  id,
  name,
  label,
  onChange,
  onBlur,
  optionData,
  touched,
  className,
  ...props
}) => {
  return (
    <div>
      <select 
        class="custom-select" 
        id={id}
        name={name} 
        onChange={onChange} 
        onBlur={onBlur}>
        {optionData}
      </select>
      <label htmlFor={id}>{label}</label>
      {/* {touched[name] && <InputFeedback error={errors[name]} />} */}
    </div>
  );
};

