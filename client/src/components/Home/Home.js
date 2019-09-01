import React, { Component } from 'react'
import CardGrid from './CardGrid';
import Grid from '@material-ui/core/Grid';
import CarouselHP from './carouselhp'
import classes from '../Header/navigation.css'
import { connect } from 'react-redux';
// import { makeStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';

// const useStyles = makeStyles(theme => ({
//   root: {
//     flexGrow: 1,
//   },
//   paper: {
//     padding: theme.spacing(2),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//   },
// }));

// const classes = useStyles();

class Home extends Component{
  constructor(props){
    super(props);
    //console.log(this.props);
  }

  render(){

    // let header = this.props.isAuth ? <Header props={this.props}/> : <GuestHeader/>
    // let header = <Header props={this.props}/>
    return(
        <div className={classes.navigation}>
        <Grid container spacing={1}>
          <Grid item xs>
            <CarouselHP/>
          </Grid>
        </Grid>
        <Grid container spacing={1}>  
            <Grid item xs>
              <CardGrid title="1" desc="11111"/>
            </Grid>
            <Grid item xs>
              <CardGrid  title="2" desc="11111"/>
            </Grid>
            <Grid item xs>
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

 
