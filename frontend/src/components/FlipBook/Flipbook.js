import React from 'react';
import HTMLFlipBook from 'react-pageflip';
import './Flipbook.css';

const importAll = (r) => r.keys()
.sort((a, b) => {
    const numA = parseInt(a.match(/(\d+)/)[0]);
    const numB = parseInt(b.match(/(\d+)/)[0]);
    return numA - numB;
})
.map(r);
const pages = importAll(require.context('../../assets/FlipbookImages', false, /\.(png|jpe?g)$/));
const Flipbook = () => {

    return (
        <div className="flipbookContainer">
            <HTMLFlipBook width={500} height={700}>
                {pages.map((src, index) => (
                    <div key={index} className="page">
                        <img src={src} alt={`Page ${index + 1}`} className="pageImage" />
                    </div>
                ))}
            </HTMLFlipBook>
        </div>
    );
};

export default Flipbook;