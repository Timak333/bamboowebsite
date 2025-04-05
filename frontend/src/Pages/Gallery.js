import React from 'react';
import { motion } from 'framer-motion';
import swayingBamboo1 from '../assets/Images/swayingBamboo1.png';
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
    return (
        <div className="galleryBackground">
            <div className="backgroundContent">
            <h1>Welcome to the gallery page</h1>
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