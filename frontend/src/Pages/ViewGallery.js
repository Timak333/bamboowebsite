import React from 'react';
import Slider from 'react-slick';
import Flipcard from '../components/Flipcard';
import galleryData from '../data/GalleryData';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ViewGallery.css';

const ViewGallery = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                },
            },
        ]
    };

    return (
        <div className="galleryContainer">
            <h1> Bamboo Gallery</h1>
            <Slider {...settings}>
                {GalleryData.map((item, index) => (
                    <Flipcard key={index} image={item.image} imageNotes={item.imageNotes} />
                ))}
            </Slider>
        </div>
    )
}

export default ViewGallery;
      