import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Home.css';
import homeBackground3 from '../assets/Images/homeBackground3.png';
import bambooShootFalling from '../assets/Images/bambooShootFalling.png';

const Home = () => {

    const [bambooShoots, setBambooShoots] = useState([]);
    useEffect(() => {
        const dropBamboo = () => {
            setBambooShoots((prev) => [
                ...prev,
                {
                    id: Math.random(),
                    left: `${Math.random() * 90 + 5}%`,
                    size: `${Math.random() * 50 + 80}px`
                }
            ])
        }
        const interval = setInterval(dropBamboo, 1000);
        return () => {
            clearInterval(interval);
        }
    }, [])

    return (
        <div className="backgroundImage" style={{ backgroundImage: `url(${homeBackground3})` }}>
            <div className="fallingBamboo">
                {bambooShoots.map((shoot) => (
                    <motion.img
                        key={shoot.id}
                        src={bambooShootFalling}
                        alt="Bamboo Shoot"
                        className="bamboo"
                        initial={{ y: -100, opacity: 1 }}
                        animate={{ y: "100vh", opacity: [1, 1, 0] }}
                        transition={{ duration: Math.random() * 4 + 3, ease: "linear" }}
                        style={{
                            left: shoot.left,
                            width: shoot.size,
                            position: "absolute"
                        }}
                    />
                ))}
            </div>
            <div className="backgroundContent">
            <h1>Green Promise</h1>
            <p>A senior project submitted in partial fulfillment of the requirements</p>
            <p>for a Bachelor of Arts degree in Computing and the Arts: Architecture,</p>
            <p>April <span class="numbers">2025</span>, Yale University.</p>
        </div>
        </div>
    );
}
export default Home;