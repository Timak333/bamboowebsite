import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import './ResultPage.css';
import resultBackground from '../assets/Images/resultBackground.png';
import { Button, Card, CardContent } from '@mui/material';
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ResultsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [pastCalculations, setPastCalculations] = useState([]);
    const [selectedResult, setSelectedResult] = useState(null);

    useEffect(() => {
        const savedData = sessionStorage.getItem("emissionsData");
        const parsedData = savedData ? JSON.parse(savedData) : [];
        setPastCalculations(parsedData);

        if (location.state?.emissionsData) {
            console.log("Received Emissions Data:", location.state.emissionsData);
            console.log("Received User Input Data:", location.state.userInput);

            let newCalculation = {
                ...location.state.emissionsData,
                ...location.state.userInput,

                total_emissions: location.state.emissionsData.total_emissions || 0,
                material_emissions: location.state.emissionsData.material_emissions || 0,
                transport_emissions: location.state.emissionsData.transport_emissions || 0,
                energy_emissions: location.state.emissionsData.energy_emissions || 0,

                material_location: location.state.userInput?.material_location || "N/A",
                project_destination: location.state.userInput?.project_destination || "N/A",
                duration_days: location.state.userInput?.duration_days || "N/A",
                materials: location.state.userInput?.materials?.length > 0
                    ? location.state.userInput.materials
                    : [{ name: "N/A", category: "N/A" }],
                material_quantity: location.state.userInput?.material_quantity || "N/A",
                energy_source: location.state.userInput?.energy_source?.length > 0
                    ? location.state.userInput.energy_source
                    : [{ name: "N/A", category: "N/A" }],
                transport_modes: location.state.userInput?.transport_modes?.length > 0
                    ? location.state.userInput.transport_modes
                    : ["N/A"]
            };
            console.log("New Calculation to be Stored:", newCalculation);
            
            setSelectedResult(newCalculation);
            const isDuplicate = parsedData.some(
                (calc) => JSON.stringify(calc) === JSON.stringify(newCalculation)
            );
            if (!isDuplicate) {
                const updatedCalculations = [...parsedData, newCalculation];
                setPastCalculations(updatedCalculations);
                sessionStorage.setItem("emissionsData", JSON.stringify(updatedCalculations));
        }
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
            {pastCalculations.length > 1 && (
                <Button
                    variant="contained"
                    onClick={() => navigate("/PreviousResults", { state: { pastCalculations } })}
                    className="previousCalculationButton"
                >
                    Previous Results
                     </Button>       
                )}
        </div>
    </div>
    );
}

export default ResultsPage;