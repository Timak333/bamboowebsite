import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Flipcard.css';

const Flipcard = ({ image, imageNotes }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div className="cardContainer" onClick={() => setIsFlipped(!isFlipped)}>
            <motion.div
                className="card"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.8 }}
                style={{ transformStyle: 'preserve-3d'}}
            >
                <div className="cardFace cardFront">
                    <img src={image} alt="Card Front" className="cardImage" />
                </div>
                <div className="cardFace cardBack">
                    <p className="cardText">{imageNotes}</p>
                </div>
            </motion.div>
        </div>
    );
}

export default Flipcard;