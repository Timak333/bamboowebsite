import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav>
            <ul>
                <li><Link to="/Home"></Link></li>
                <li><Link to="/About"></Link></li>
                <li><Link to="/Calculator"></Link></li>
                <li><Link to="/Gallery"></Link></li>
                <li><Link to="/MosoBamboo"></Link></li>
                <li><Link to="/ContactUs"></Link></li>
            </ul>
        </nav>
    )
}

export default Navbar;