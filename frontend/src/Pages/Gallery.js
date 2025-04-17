import React from 'react';
import { motion } from 'framer-motion';
import swayingBamboo1 from '../assets/Images/swayingBamboo1.png';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Gallery.css';

const swayVariant= {
    animate: {
        rotate: [0, 8, 0, -8, 0],
        transition: {
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity
        }
    }
}

const Gallery = () => {
    const navigate = useNavigate();

    return (
        <div className="galleryBackground">
            <div className="backgroundContent">
                <h1>Welcome</h1>
                <p>Across continents and cultures, bamboo has been used to shape</p>
                <p> homes,temples, and pavilions, each structure a legacy of ingenuity,</p>
                <p> balance and natural harmony. Let these images inspire you</p>
                <p> to see the beauty and potential of bamboo in architecture.</p>
                <div className="buttonContainer">
                    <Button
                        variant="contained"
                        onClick={() => navigate("/ViewGallery")}
                        className="viewButton"
                    >
                        View
                    </Button>
                </div>
                <motion.img
                    src={swayingBamboo1}
                    alt="Bamboo"
                    className="framerSway bottomLeft"
                    variants={swayVariant}
                    animate="animate"
                />
                <motion.img
                    src={swayingBamboo1}
                    alt="Bamboo"
                    className="framerSway bottomRight"
                    variants={swayVariant}
                    animate="animate"
                />
            </div>
        </div> 
    );
}
export default Gallery;