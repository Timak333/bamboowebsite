import React from 'react';
import './MosoBamboo.css';
import homeBackground3 from '../assets/Images/homeBackground3.png';

const MosoBamboo = () => {
    return (
        <div className="backgroundImage" style={{ backgroundImage: `url(${homeBackground3})` }}>
            <div className="mosoContainer">
                <h1> Moso Bamboo Research</h1>
                <iframe
                src="/essays/thesisEssay.pdf"
                className="mosoIframe"
                title="Essay on Moso Bamboo"
                />
            </div>
        </div>
    );
};
export default MosoBamboo;