import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import './ResultPage.css';
import resultBackground from '../assets/Images/resultBackground.png';
import { Button, Card, CardContent } from '@mui/material';
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Cookies from "js-cookie";

ChartJS.register(ArcElement, Tooltip, Legend);

const ResultsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [pastCalculations, setPastCalculations] = useState([]);
    const [selectedResult, setSelectedResult] = useState(null);

    useEffect(() => {
        let savedData = Cookies.get("emissionsData");
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            setPastCalculations(parsedData);
            setSelectedResult(location.state?.emissionsData || parsedData[parsedData.length - 1]);
        }
    }, [location.state]);

    if (!selectedResult) {
        return (
            <div>
                <h2>No emissions data available, Please try again.</h2>
            </div>
        );
    }

    const data = {
        labels: ["Material Emissions", "Transport Emissions", "Energy Emissions"],
        datasets: [
            {
                data: [
                    selectedResult.material_emissions,
                    selectedResult.transport_emissions,
                    selectedResult.energy_emissions
                ],
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            },
        ],
    };

    return (
        <div className="backgroundImage" style={{ backgroundImage: `url(${resultBackground})` }}>
            <div className="resultsContainer">
                <Card className="emissionsBox">
                    <CardContent>
                        <h1>Carbon Emission Results</h1>
                        <div className="chartContainer">
                            <Pie data={data} />
                        </div>
                        <p><strong>Material Emissions:</strong> {selectedResult.material_emissions.toFixed(2)} kg CO₂</p>
                        <p><strong>Transport Emissions:</strong> {selectedResult.transport_emissions.toFixed(2)} kg CO₂</p>
                        <p><strong>Energy Emissions:</strong> {selectedResult.energy_emissions.toFixed(2)} kg CO₂</p>
                        <hr />
                        <h2><strong>Total emissions: </strong>{selectedResult.total_emissions.toFixed(2)} kg CO₂</h2>
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
            {pastCalculations.length > 1 && (
                    <div className="buttonContainer">
                        <Button
                            variant="contained"
                            onClick={() => navigate("/PreviousResults", { state: { pastCalculations } })}
                            className="previousCalculationButton"
                        >
                            Previous Calculations
                        </Button>
                    </div>
                )}
        </div>
    );
}

export default ResultsPage;