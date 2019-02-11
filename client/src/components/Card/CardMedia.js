import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';

const styles = theme => ({
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    //height: 38,
    width: 15
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  playIcon: {
    height: 30,
    width: 38,
  },
});

function MediaControlCard(props) {
  const { classes, theme } = props;

  return (
    <div>
    <Card className={classes.card}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            Events
          </Typography>
        </CardContent>
        <div className={classes.controls}>
          <CardMedia
          className={classes.cover}
          image="https://source.unsplash.com/user/erondu/600x400"
          title="Live from space album cover"
          />
        </div>
      </div>
      </Card>
      <Card className={classes.card}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              Reserve
            </Typography>
          </CardContent>
          <div className={classes.controls}>
            <CardMedia
            className={classes.cover}
            image="https://source.unsplash.com/user/erondu/600x400"
            title="Live from space album cover"
            />
          </div>
        </div>
      </Card>
      <Card className={classes.card}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              Friends Group
            </Typography>
          </CardContent>
          <div className={classes.controls}>
            <CardMedia
            className={classes.cover}
            image="https://source.unsplash.com/user/erondu/600x400"
            title="Live from space album cover"
            />
          </div>
        </div>
      </Card>
      </div>
  );
}

MediaControlCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MediaControlCard);