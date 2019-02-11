import React from 'react'
import { render } from 'react-dom'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import App from './../App';
import Login from './../Login/Login';
import NotFoundPage from './../notfound';
import LoginEmail from './../Login/Loginemail';
// import GoogleLogin from './../Login/googlelogin';
import Dashboard from './../Dashboard/Dashboard';
import Home from './../Home/Home';


const MenuNavigation = () => (
  <Router>
    <div>
      <Switch>
          <Route  path="/" component={Home}/>
          <Route  path='/signup' component={Login}/>
          <Route  path="/home" component={Home}/>
          <Route  path='/email' component={LoginEmail}/>
          <Route  path='/facebook' component={Dashboard}/>
          <Route  path='/google' component={Dashboard}/>
          <Route  path="*" component={NotFoundPage}/>
      </Switch>
      </div>
    </Router>
)

export default MenuNavigation