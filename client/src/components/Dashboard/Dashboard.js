import React from 'react';
import LoggedInHeader from './../Header/LoggedInHeader';

class Dashboard extends React.Component {
  // state = {
  //   open: true,
  // };

  render() {
    return (
      <React.Fragment>
        <LoggedInHeader/>
      </React.Fragment>
    );
  }
}

export default Dashboard;