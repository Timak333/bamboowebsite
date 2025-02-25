import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import './ResultPage.css';
import resultBackground from '../assets/Images/resultBackground.png';
import { Button, Card, CardContent } from '@mui/material';

const ResultsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const emissionsData = location.state?.emissionsData;

    if(!emissionsData) {
        return (
            <div>
                <h2> No emissions data available, Please try again. </h2>
            </div>
        )
    }
    return (
        <div className="backgroundImage" style={{ backgroundImage: `url(${resultBackground})`}}>
        <div className="resultsContainer">
            <Card className="emissionsBox">
                <CardContent>
                <h1>Carbon Emission Results</h1>
                <p><strong>Material Emissions:</strong> {emissionsData.material_emissions.toFixed(2)} kg CO₂</p>
                <p><strong>Transport Emissions:</strong> {emissionsData.transport_emissions.toFixed(2)} kg CO₂</p>
                <p><strong>Energy Emissions:</strong> {emissionsData.energy_emissions.toFixed(2)} kg CO₂</p>
                <hr />
                <h2><strong>Total emissions: </strong>{emissionsData.total_emissions.toFixed(2)} kg CO₂</h2>
                </CardContent>
            </Card>
            </div>
            <div className="buttonContainer">
                <Button
                    variant="contained"
                    onClick={() => navigate("/EcoCalculator")}
                    className="newCalculationButton"
                >
                    New Calculation
                </Button>
        </div>
        </div>
    );
};

export default ResultsPage;
