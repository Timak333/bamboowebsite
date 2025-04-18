import React from 'react';
import Slider from 'react-slick';
import Flipcard from '../components/Flipcard/Flipcard';
import GalleryData from '../assets/Data/GalleryData';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ViewGallery.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const NextArrow = ({ onClick }) => (
    <div className="nextArrow" onClick={onClick}>
        <ArrowForwardIosIcon />
    </div>
)

const PrevArrow = ({ onClick }) => (
    <div className="prevArrow" onClick={onClick}>
        <ArrowBackIosIcon />
    </div>
)

const ViewGallery = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 600,
        fade: true,
        cssEase: 'ease-in-out',
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
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
      