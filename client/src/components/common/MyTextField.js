import React from "react";
import classNames from "classnames";

const InputFeedback = ({ error }) =>
  error ? <div className={classNames("input-feedback")}>{error}</div> : null;

export const MyTextField = ({
  id,
  label,
  placeholder,
  defaultValue,
  classtype,
  onChange,
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
        class={classtype} 
        // class="form-control" 
        aria-label="Sizing example input" 
        aria-describedby="inputGroup-sizing-default"
        required
        // name={name}
        // required={required.toString()}
        id={id}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
      />
      <label htmlFor={id}>{label}</label>
      {/* {touched[name] && <InputFeedback error={errors[name]} />} */}
    </div>
  );
};

