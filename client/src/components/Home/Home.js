import React, { Component } from 'react'
import CardGrid from './CardGrid';
import Grid from '@material-ui/core/Grid';
import Header from '../Header/Header';
import CarouselHP from './carouselhp'
import classes from './Home.css'

class Home extends Component {

  constructor(props){
    super(props);
    //console.log(this.props);
  }

  render(){
    return(
        <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
              <Header props={this.props}/>
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
}
}
export default Home

 
