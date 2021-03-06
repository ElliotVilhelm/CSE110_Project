import React from 'react';
import Slider from 'react-slick';

class SimpleSlider extends React.Component {
    render() {
        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: true,
            // variableWidth: true,
            // lazyLoad: true,
        };
        var images = this.props.images.map(image =>
            <div className='location-image-div'>{image}</div>
        );
        return (
            <Slider {...settings} style={{display: 'inline-block'}}>
                {images}
            </Slider>
        );
    }
}

export default SimpleSlider;
