import React from "react";
import classNames from "classnames";

const InputFeedback = ({ error }) =>
  error ? <div className={classNames("input-feedback")}>{error}</div> : null;

export const MyTimePicker = ({
  step,
  min,
  name,
  label,
  value,
  onChange,
  onBlur,
  optionData,
  touched,
  className,
  ...props
}) => {
  return (
    <div>  
        <label for={name}>{label}</label>
        <input 
            type="time" 
            class="form-control" 
            aria-label="Sizing example input" 
            aria-describedby="inputGroup-sizing-default"
            margin="normal"
            label={label}
            defaultValue={value}
            name={name}
            step={step} 
            min={min}
            onChange={onChange} 
            onBlur={onBlur}/> 
    </div>    
  );
};

