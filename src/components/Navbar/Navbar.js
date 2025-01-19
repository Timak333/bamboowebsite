import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import websiteLogo from '../../assets/Images/websiteLogo.png';
const Navbar = () => {
    return (
        <nav className="navbar">
                <Link to="/" className="logoLink">
                    <img src={websiteLogo} alt="Logo" className="logo" />
                </Link>
                <Link to="/">Home</Link>
                <Link to="/MosoBamboo">Moso Bamboo</Link>
                <Link to="/Gallery">Gallery</Link>
                <Link to="/EcoCalculator">EcoCalculator</Link>
                <Link to="/About">About</Link>
        </nav>
    )
}
export default Navbar;