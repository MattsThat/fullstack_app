import React from "react";
import classNames from "classnames";
import Select from 'react-select';

// const InputFeedback = ({ error }) =>
//   error ? <div className={classNames("input-feedback")}>{error}</div> : null;
//please read this before.
//not able to use as i cant pick values when form is submitted.

export const MyMultiSelect = ({
  name,
  selectedvalue,
  options,
  onMultiSelectChange,
  onBlur,
  errors,
  touched,
  id,
  className,
  ...props
}) => {
  return (
    <div>
      {/* <Select
          isMulti
          name={selectedvalue}
          // id={id}
          value={selectedvalue}        
          options={options}
          onChange={onChange} 
          onBlur={onBlur} 
          className="basic-multi-select"
          classNamePrefix="select"
      /> */}
      <Select
          className="basic-multi-select"
          classNamePrefix="select"
          isMulti
          name={name}
          options={options}
          onChange={onMultiSelectChange} 
      />
    </div>
  );
};

