import React, { Component } from 'react';
import Slider from 'react-slick';

import { Image } from 'semantic-ui-react'

import b1 from "../../images/b1.jpg";
import b2 from "../../images/b2.jpg";
import b3 from "../../images/b3.jpg";
import b4 from "../../images/b4.jpg";
import b5 from "../../images/b5.jpg";

class Carousel extends Component {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            adaptiveHeight: true
          };
        return (
            
                <Slider {...settings} style={{ marginTop: '5em'}} >
                    <div><Image src={b1} centered size='massive'/></div>
                    <div><Image src={b2} centered size='massive'/></div>
                    <div><Image src={b3} centered size='massive'/></div>
                    <div><Image src={b4} centered size='massive'/></div>
                    <div><Image src={b5} centered size='massive'/></div>
                </Slider>
        );
    }
}

export default Carousel;