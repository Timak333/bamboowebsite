import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import websiteLogo from '../../assets/Images/websiteLogo.png';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavBar = () => {
        setIsOpen(!isOpen);
    }
    return (
        <>
           <nav className="navbar">
            <Link to="/" className="logoLink">
                        <img src={websiteLogo} alt="Logo" className="logo" />
                    </Link>
                <div className="navbarLinks">
                <Link to="/">Home</Link>
                <Link to="/MosoBamboo">Moso Bamboo</Link>
                <Link to="/Gallery">Gallery</Link>
                <Link to="/EcoCalculator">EcoCalculator</Link>
                <Link to="/About">About</Link>
                </div>
                {/* Navigtion for full desktop screen */}
                <div className="navLinks">
                    <Link to="/">Home</Link>
                    <Link to="/MosoBamboo">Moso Bamboo</Link>
                    <Link to="/Gallery">Gallery</Link>
                    <Link to="/EcoCalculator">EcoCalculator</Link>
                    <Link to="/About">About</Link>
                </div>
                {/* Toggle Navigation for mobile} */}
                <div className="toggleBtn">
                    <button onClick={toggleNavBar}>
                        {isOpen ? <CloseIcon /> : <MenuIcon />}
                    </button>
                </div>
            </nav>
            {/* Navigation for mobile */}
            {isOpen && (
                <div className="mobileNavLinks">
                    <Link to="/" onClick={toggleNavBar}>Home</Link>
                    <Link to="/MosoBamboo" onClick={toggleNavBar}>Moso Bamboo</Link>
                    <Link to="/Gallery" onClick={toggleNavBar}>Gallery</Link>
                    <Link to="/EcoCalculator" onClick={toggleNavBar}>EcoCalculator</Link>
                    <Link to="/About" onClick={toggleNavBar}>About</Link>
                </div>
            )}
        </>
    );
};

export default Navbar;