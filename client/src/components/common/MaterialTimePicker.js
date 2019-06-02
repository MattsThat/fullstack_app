import 'date-fns';
import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import  DateFnsUtils  from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers';

const styles = {
  grid: {
    width: '60%',
  },
};

class MaterialTimePicker extends React.Component {
  state = {
    // The first commit of Material-UI
    selectedDate: new Date(),
  };

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };

  render() {
    const { classes } = this.props;
    const { selectedDate } = this.state;
    // console.log("this.props book event", this.props);

    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardTimePicker
            margin="normal"
            label={this.props.label}
            value={selectedDate}
            onChange={this.handleDateChange}
          />
      </MuiPickersUtilsProvider>
    );
  }
}

MaterialTimePicker.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MaterialTimePicker);