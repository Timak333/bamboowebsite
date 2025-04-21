import React from 'react';
import './MosoBamboo.css';
import homeBackground3 from '../assets/Images/homeBackground3.png';
import Flipbook from '../components/FlipBook/Flipbook';

const MosoBamboo = () => {
    return (
        <div className="backgroundImage" style={{ backgroundImage: `url(${homeBackground3})` }}>
            <h1>Moso Bamboo Thesis Essay</h1>
            <div className="mosoContainer">
                <Flipbook />
            </div>
        </div>
    );
};
export default MosoBamboo;