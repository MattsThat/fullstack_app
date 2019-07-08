import React from "react";
import classNames from "classnames";
import { MyRadioButton } from "./MyRadioButton";

const InputFeedback = ({ error }) =>
  error ? <div className={classNames("input-feedback")}>{error}</div> : null;

export const MyRadioButtonGroup = ({
  id,
  label,
  value,
  optionsData,
  onChange,
  onBlur,
  touched,
  className,
  ...props
}) => {
  return (
    <div>
      <fieldset class="form-group">
          <div class="row">
            <legend class="col-form-label col-2">{label}</legend>
            <div class="col-10">
              {optionsData}
              {/* <div class="form-check">
                <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked/>
                <label class="form-check-label" for="gridRadios1">
                  First radio
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2"/>
                <label class="form-check-label" for="gridRadios2">
                  Second radio
                </label>
              </div>
              <div class="form-check disabled">
                <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios3" value="option3" disabled/>
                <label class="form-check-label" for="gridRadios3">
                  Third disabled radio
                </label>
              </div> */}
            </div>
          </div>
      </fieldset>    
    </div>
  );
};

