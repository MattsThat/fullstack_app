import React from "react";
import classNames from "classnames";

const InputFeedback = ({ error }) =>
  error ? <div className={classNames("input-feedback")}>{error}</div> : null;

export const MySwitch = ({
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
    <div className="custom-control custom-switch">
    <div className="custom-switch">
      <input type="checkbox" 
        class="custom-control-input" 
        id={id}
        onChange={onChange} 
        onBlur={onBlur}/>
      <label class="custom-control-label" for={id}>{label}</label>
    </div>  
  </div>    
  );
};

