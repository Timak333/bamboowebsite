import React from 'react';
import './Home.css';
import homeBackground2 from '../assets/Images/homeBackground2.png';
// import websiteLogo from '../assets/Images/websiteLogo.png';

const Home = () => {
    return (
        <div className="backgroundImage" style={{ backgroundImage: `url(${homeBackground2})` }}>
            {/* <img src={websiteLogo} alt="Top Left" className="websiteLogo" /> */}
            <div className="backgroundContent">
            <h1>Green Promise</h1>
            <p>Lorem Ipsum Filler</p>
            <p>Best experienced with sound</p>
            <div className="scrollDown">Scroll down for more</div>
        </div>
        </div>
    );
}
export default Home;