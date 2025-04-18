import React, { useState} from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import webLogo from '../../assets/Images/webLogo.png';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const toggleNavBar = () => {
        setIsOpen(!isOpen);
    }
    //hide logo
    const hideLogoOnRoutes = ['/EcoCalculator', '/MosoBamboo', '/results'];
    const hideLogo = hideLogoOnRoutes.includes(location.pathname);
    //hide navbar for ecocalculator
    const hideNavBarOnRoutes = ['/EcoCalculator','/results', '/PreviousResults', '/ViewGallery'].includes(location.pathname);
    if (hideNavBarOnRoutes) {
        return null;
    }
    return (
        <>
            {/* Toggle Navigation for mobile} */}
            <div className="toggleBtn">
                <button onClick={toggleNavBar} style={{ color:'black'}}>
                    {isOpen ? <CloseIcon /> : <MenuIcon />}
                </button>
            </div>
           <nav className= {`navbar ${['/Gallery'].includes(location.pathname) ? 'galleryNavbar' : ''}`}>
            
            {!hideLogo ? (
            <Link to="/"><img src={webLogo} alt="Logo" className="logo" /></Link>
            ) : (
                <div className="logoPlaceholder"></div>
            )}
                <div className="navbarLinks">
                <Link to="/">Home</Link>
                <Link to="/MosoBamboo">Moso Bamboo</Link>
                <Link to="/Gallery">Gallery</Link>
                <Link to="/EcoCalculator">EcoCalculator</Link>
                </div>
            </nav>
            {/* Mobile navigation links */}
            {isOpen && (
                <div className="mobileNavLinks">
                    <Link to="/" onClick={toggleNavBar}>Home</Link>
                    <Link to="/MosoBamboo" onClick={toggleNavBar}>Moso Bamboo</Link>
                    <Link to="/Gallery" onClick={toggleNavBar}>Gallery</Link>
                    <Link to="/EcoCalculator" onClick={toggleNavBar}>EcoCalculator</Link>
                </div>
            )}
        </>
    );
};
export default Navbar;