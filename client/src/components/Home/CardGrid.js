import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import home12 from './home1.jpg';

  const CardGrid = (props) => {
    const styles = {
      card: {
        maxWidth: 345,
      },
      media: {
        height: 140,
      },
    };

    return(
      <Card className="card">
      <CardActionArea>
        <CardMedia
          className="media"
          //source="https://source.unsplash.com/user/erondu/600x400"
          src={home12}
          title=" Reptile"/>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography component="p">
            {props.desc}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
    ); //end of return
  }//end of const

export default CardGrid;