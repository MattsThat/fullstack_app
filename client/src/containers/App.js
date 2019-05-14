import React from 'react'
import Home from '../components/Home/Home'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Login from '../components/Login/Login';
import InvalidLogin from '../components/Login/InvalidLogin';
import LoginEmail from '../components/Login/Loginemail';
import Dashboard from '../components/Dashboard/Dashboard';
import MyProfile from '../components/Profile/myProfile';
import BookAnEvent from '../components/Events/BookAnEvent';
import { Route } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
//import AuthHelperMethods from './components/AuthHelperMethods';
//Our higher order component
//import withAuth from './components/withAuth';

class App extends React.Component{
  
  constructor(props) {
    super(props);
    // Auth = new AuthHelperMethods();
    //console.log(this.props);
  }

  render() {
    return(
            <div>
            <Layout>  
              <Route  exact path='/' component={Home}/>
              <Route  exact path='/signup' component={Login}/>
              <Route  exact path='/email' exact component={LoginEmail}/>
              <Route  exact path='/invalidlogin' exact component={InvalidLogin}/>
              <Route  exact path='/dashboard' component={Dashboard}/>
              <Route  exact path='/myprofile' component={MyProfile}/> 
              <Route  exact path='/bookAnEvent' component={BookAnEvent}/> 
            </Layout>             
            </div>
      );//end of return
  }//end of render
}//end of class

// export default withAuth(App)
export default App

