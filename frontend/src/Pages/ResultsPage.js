import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import './ResultPage.css';
import resultBackground from '../assets/Images/resultBackground.png';
import { Button, Card, CardContent } from '@mui/material';
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip,Legend } from "chart.js";
import Cookies from "js-cookie";

ChartJS.register(ArcElement, Tooltip, Legend);

const ResultsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    let emissionsData = location.state?.emissionsData;
    if(!emissionsData) {
        const savedData = Cookies.get("emissionsData");
        if(savedData) {
            emissionsData = JSON.parse(savedData);
        }
    }
    if(!emissionsData) {
        return (
            <div>
                <h2> No emissions data available, Please try again. </h2>
            </div>
        )
    }
    const data = {
        labels: ["Material Emissions", "Transport Emissions", "Energy Emissions"],
        datasets: [
            {
                data: [
                emissionsData.material_emissions, emissionsData.transport_emissions, emissionsData.energy_emissions],
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            },
        ],
    }
    return (
        <div className="backgroundImage" style={{ backgroundImage: `url(${resultBackground})`}}>
        <div className="resultsContainer">
            <Card className="emissionsBox">
                <CardContent>
                <h1>Carbon Emission Results</h1>
                <div className="chartContainer">
                <Pie data={data}/>
                </div>
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
