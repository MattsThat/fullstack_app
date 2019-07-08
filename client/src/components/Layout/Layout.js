import React, {Component} from 'react';
import classes from './Layout.css';
import Aux from '../../HOC/Aux';
import Toolbar from '../Navigation/Toolbar';
import SideDrawer from '../Navigation/SideDrawer';
import { connect } from 'react-redux';


class Layout extends Component {
  state= {
    show: false
  }
  handler= {
    sideDrawer: () => {
      this.state.show ? this.setState({show: false}) : this.setState({show: true})
    }
  }
  render () {
    return (
      <Aux>
        <Toolbar 
          isAuth = {this.props.isAuthenticated}
          isHostSignUp = {this.props.isHostSignUp}
          open={this.state.show}
          close={this.handler.sideDrawer}/>
        <SideDrawer
          isAuth = {this.props.isAuthenticated}
          open={this.state.show}
          close={this.handler.sideDrawer}/>
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    )
  }//end of render
}// end of class

const mapStateToProps = state => {
  return {
    isAuthenticated : state.auth.token != null,
    isHostSignUp : state.auth.hostsignup
  };
};

export default connect(mapStateToProps)(Layout);
