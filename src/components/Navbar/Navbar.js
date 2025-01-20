import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import websiteLogo from '../../assets/Images/websiteLogo.png';
import { slide as Menu } from 'react-burger-menu';

const Navbar = () => {
    return (
        <nav className="navbar">
                <Link to="/" className="logoLink">
                    <img src={websiteLogo} alt="Logo" className="logo" />
                </Link>
                <div className="navlinks">
                <Link to="/">Home</Link>
                <Link to="/MosoBamboo">Moso Bamboo</Link>
                <Link to="/Gallery">Gallery</Link>
                <Link to="/EcoCalculator">EcoCalculator</Link>
                <Link to="/About">About</Link>
                </div>
                <Menu right>
                    <Link to="/" className="menu-item">Home</Link>
                    <Link to="/MosoBamboo" className="menu-item">Moso Bamboo</Link>
                    <Link to="/Gallery" className="menu-item">Gallery</Link>
                    <Link to="/EcoCalculator" className="menu-item">EcoCalculator</Link>
                    <Link to="/About" className="menu-item">About</Link>
                </Menu>
        </nav>
    )
}
export default Navbar;