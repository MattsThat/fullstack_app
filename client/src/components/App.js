import React from 'react'
import Home from './Home/Home'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Login from './Login/Login';
import InvalidLogin from './Login/InvalidLogin';
import LoginEmail from './Login/Loginemail';
import Dashboard from './Dashboard/Dashboard';
import { Route, Switch } from 'react-router-dom';

class App extends React.Component{
  
  constructor(props) {
    super(props);
    //console.log(this.props);
  }

  render() {
    return(
            <div>
              <Route  exact path='/' component={Home}/>
              <Route  exact path='/signup' component={Login}/>
              <Route  exact path='/email' exact component={LoginEmail}/>
              <Route  exact path='/invalidlogin' exact component={InvalidLogin}/>
              <Route  exact path='/dashboard' component={Dashboard}/>
            </div>
      );//end of return
  }//end of render
}//end of class

export default App
