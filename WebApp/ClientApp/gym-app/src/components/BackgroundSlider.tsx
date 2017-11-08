import * as React from 'react';
import './Slider.css';
import Slider from 'react-slick';

interface Props{
    backgroundCaptions: any;
}

export class BackgroundSlider extends React.Component<Props, any> {
  render() {
    let settings = {
      dots: false,
      infinite: true,
      speed: 400,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      easing: "ease-in-out",
      arrows: false
    };

    const { backgroundCaptions } = this.props;

    return (
      <Slider {...settings}>
        <div className="slider back1">{backgroundCaptions[0]}</div>
        <div className="slider back2"><h2>{backgroundCaptions[1]}</h2></div>
        <div className="slider back3"><h2>{backgroundCaptions[2]}</h2></div>
      </Slider>
    );
  }
}