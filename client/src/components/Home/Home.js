import React, { Component } from 'react'
import CardGrid from './CardGrid';
import Grid from '@material-ui/core/Grid';
import CarouselHP from './carouselhp'
import classes from '../Header/navigation.css'
import { connect } from 'react-redux';

class Home extends Component{

  constructor(props){
    super(props);
    //console.log(this.props);
  }

  render(){
    
    // let header = this.props.isAuth ? <Header props={this.props}/> : <LoggedInHeader/>
    // let header = <Header props={this.props}/>
    return(
        <div className={classes.navigation}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
          {/* {header} */}
          </Grid>
          <Grid item xs={1}/>
          <Grid item xs={10} >
            <CarouselHP/>
          </Grid>
          <Grid item xs={1}/>
          <Grid item xs={1}/>
          <Grid item xs={3}>
            <CardGrid title="1" desc="11111"/>
          </Grid>
          <Grid item xs={4}>
            <CardGrid  title="2" desc="11111"/>
          </Grid>
          <Grid item xs={3}>
          <Grid item xs={1}/>
            <CardGrid title="3" desc="11111"/>
          </Grid>
        </Grid>
      </div>
    );
  }//end of render
}//end of class

const mapStateToProps = state => {
  return {
    showModal : state.login.showModal,
    // error: state.auth.error,
    // isAuth  : state.auth.token !== null,
    isAuth  : state.auth.isAuth,
    // authRedirectPath: state.auth.authRedirectPath
  };
};

export default connect(mapStateToProps)(Home) 

 
