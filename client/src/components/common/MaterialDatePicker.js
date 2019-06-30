import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

const MaterialDatePicker = ({ field, form, ...other }) => {
  const currentError = form.errors[field.name];
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <DatePicker
      clearable
      variant="inline"
      disablePast
      showTodayButton
      name={field.name}
      value={field.value}
      format="dd/MM/yyyy"
      helperText={currentError}
      error={Boolean(currentError)}
      onError={(_, error) => form.setFieldError(field.name, error)}
      onChange={date => form.setFieldValue(field.name, date, true)}
      {...other}
    />
    </MuiPickersUtilsProvider>
  );
};

export default MaterialDatePicker;