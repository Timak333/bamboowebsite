import React from 'react';
import './Home.css';
import BambooWebsiteBackground from '../assets/Images/BambooWebsiteBackground.png';

const Home = () => {
    return (
        <div className="backgroundImage" style={{ backgroundImage: `url(${BambooWebsiteBackground})` }}>
            <div className="backgroundContent"></div>
            <h1>Green Promise</h1>
            <p>Lorem Ipsum Filler</p>
            <p>Best experienced with sound</p>
            <div className="scroll-down">Scroll down for more &darr;</div>
        </div>
    );
}
export default Home;