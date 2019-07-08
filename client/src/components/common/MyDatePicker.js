import React from "react";
import classNames from "classnames";

const InputFeedback = ({ error }) =>
  error ? <div className={classNames("input-feedback")}>{error}</div> : null;

export const MyDatePicker = ({
  id,
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
        <label for={id}>{label}</label>
        <input 
            type="date" 
            class="form-control" 
            aria-label="Sizing example input" 
            aria-describedby="inputGroup-sizing-default"
            margin="normal"
            label={label}
            defaultValue={value}
            id={id}
            onChange={onChange} 
            onBlur={onBlur}/> 
    </div>    
  );
};

