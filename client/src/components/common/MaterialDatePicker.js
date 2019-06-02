import 'date-fns';
import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import  DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

const styles = {
  grid: {
    width: '60%',
  },
};

class MaterialDatePicker extends React.Component {
  state = {
    selectedDate: new Date(),
  };

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };

  render() {
    const { classes } = this.props;
    const { selectedDate } = this.state;

    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            margin="normal"
            label={this.props.label}
            value={selectedDate}
            onChange={this.handleDateChange}
          />
      </MuiPickersUtilsProvider>
    );
  }
}

MaterialDatePicker.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MaterialDatePicker);