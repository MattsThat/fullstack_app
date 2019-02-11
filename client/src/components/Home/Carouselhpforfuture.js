import React from 'react';
import { AutoRotatingCarousel } from 'material-auto-rotating-carousel';
import { Slide } from 'material-auto-rotating-carousel';
import { red, blue, green } from '@material-ui/core/colors';

class CarouselHP extends React.Component
{
  
  constructor(props) {
    super(props);
  }
  /**
   * 
   * 
   * <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner">
            <div class="carousel-item active">
               <img className="d-block w-100" src="https://source.unsplash.com/user/erondu/600x400" alt="First slide"/>
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src="https://source.unsplash.com/user/erondu/600x400" alt="Second slide"/>
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src="https://source.unsplash.com/user/erondu/600x400" alt="Third slide"/>
            </div>
        </div>
        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
        </a>
    </div>
    <Button onClick={() => setState({ open: true })}>Open carousel</Button>
   */
  render() {
    return(
    <div style={{ position: 'relative', width: '100%', height: 500 }}>
    <AutoRotatingCarousel
      label='Get started'
      open = {true}
      style={{ position: 'absolute' }}
    >
      <Slide
        media={<img src='http://www.icons101.com/icon_png/size_256/id_79394/youtube.png' />}
        mediaBackgroundStyle={{ backgroundColor: red[400] }}
        style={{ backgroundColor: red[600] }}
        title='This is a very cool feature'
        subtitle='Just using this will blow your mind.'
      />
      <Slide
        media={<img src='http://www.icons101.com/icon_png/size_256/id_80975/GoogleInbox.png' />}
        mediaBackgroundStyle={{ backgroundColor: blue[400] }}
        style={{ backgroundColor: blue[600] }}
        title='Ever wanted to be popular?'
        subtitle='Well just mix two colors and your are good to go!'
      />
      <Slide
        media={<img src='http://www.icons101.com/icon_png/size_256/id_76704/Google_Settings.png' />}
        mediaBackgroundStyle={{ backgroundColor: green[400] }}
        style={{ backgroundColor: green[600] }}
        title='May the force be with you'
        subtitle='The Force is a metaphysical and ubiquitous power in the Star Wars fictional universe.'
      />
    </AutoRotatingCarousel>
  </div>
    );
  }
}

export default CarouselHP;
