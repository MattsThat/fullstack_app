import React from "react";
import { Carousel } from "react-responsive-carousel";

const CarouselHp = () => (
  <div>
  <Carousel showThumbs={false} showArrows={false} showStatus={false} autoPlay width="100%">
    <div>
      <img src="https://source.unsplash.com/user/erondu/600x400" />
      <p className="legend">Legend 1</p>
    </div>
    <div>
      <img src="https://source.unsplash.com/user/erondu/600x400" />
      <p className="legend">Legend 2</p>
    </div>
    <div>
      <img src="https://source.unsplash.com/user/erondu/600x400" />
      <p className="legend">Legend 3</p>
    </div>
  </Carousel>
  </div>
);

export default CarouselHp;