import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  TimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

const MaterialTimePicker = ({ field, form, ...other }) => {
  const currentError = form.errors[field.name];
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <TimePicker
        variant="inline"
        clearable
        minutesStep={30}
        format="hh:mm"
        ampm={true}
        name={field.name}
        value={field.value}
        helperText={currentError}
        error={Boolean(currentError)}
        onError={(_, error) => form.setFieldError(field.name, error)}
        onChange={time => form.setFieldValue(field.name, time, true)}
        {...other}
      />
    </MuiPickersUtilsProvider>

  );
};

export default MaterialTimePicker;