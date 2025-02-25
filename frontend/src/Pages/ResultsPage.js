import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import './ResultPage.css';

const ResultsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const emissionsData = location.state?.emissionsData;

    if(!emissionsData) {
        return 
        <div>
            No emissions data available, Please try again.
        </div>
    }
    return (
        <div className="resultsContainer">
            <h1>Carbon Emission Results</h1>
            <div className="emissionsBox">
                <p><strong>Material Emissions:</strong> {emissionsData.material_emissions.toFixed(2)} kg CO₂</p>
                <p><strong>Transport Emissions:</strong> {emissionsData.transport_emissions.toFixed(2)} kg CO₂</p>
                <p><strong>Energy Emissions:</strong> {emissionsData.energy_emissions.toFixed(2)} kg CO₂</p>
                <hr />
                <h2><strong>Total emissions:</strong>{emissionsData.total_emissions.toFixed(2)} kg CO₂</h2>
            </div>
            <button className="backButton" onClick={() => navigate("/")}>New Calculation</button>
        </div>
    );
};

export default ResultsPage;
