import React from 'react';
import classes from './Toolbar.css'
// import Logo from '../UI/Logo'
import NavItems from './NavItems'
import SideToggle from './SideToggle';
import Header from '../Header/Header';
import LoggedInHeader from '../Header/LoggedInHeader';
import HostHeader from '../Header/HostHeader';

const toolbar = ( props ) => {
  let headerName=null;
  if(props.isAuth)
    if(props.isHostSignUp) 
      headerName = <HostHeader/>;
    else
      headerName = <LoggedInHeader/>;
  else
    headerName = <Header/>;
          
  return ( props.open ?
    <header className={classes.Toolbar}>
        {/* <Logo height='80%'/> */}
        <nav className={classes.Desktop}>
          {headerName}
        </nav>
      </header>
      :
      <header className={classes.Toolbar}>
        <SideToggle clicked={props.close}/>
        {/* <Logo height='80%'/> */}
        <nav className={classes.Desktop}>
          {headerName}
        </nav>
      </header>
  )
}

export default toolbar
