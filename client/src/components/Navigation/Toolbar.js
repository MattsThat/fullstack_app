import React from 'react';
import classes from './Toolbar.css'
// import Logo from '../UI/Logo'
import NavItems from './NavItems'
import SideToggle from './SideToggle';
import Header from '../Header/Header';
import LoggedInHeader from '../Header/LoggedInHeader';

const toolbar = ( props ) => {
  return ( props.open ?
    <header className={classes.Toolbar}>
        {/* <Logo height='80%'/> */}
        <nav className={classes.Desktop}>
          {!props.isAuth 
          ? <Header/>
          : <LoggedInHeader/> }
        </nav>
      </header>
      :
      <header className={classes.Toolbar}>
        <SideToggle clicked={props.close}/>
        {/* <Logo height='80%'/> */}
        <nav className={classes.Desktop}>
        {!props.isAuth 
          ? <Header/>
          : <LoggedInHeader/> }
        </nav>
      </header>
  )
}

export default toolbar
