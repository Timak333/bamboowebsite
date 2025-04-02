import React from 'react';
import { useLocation } from "react-router-dom";
import { Card, CardContent, List} from '@mui/material';
import resultBackground from '../assets/Images/resultBackground.png';
import './PreviousResults.css';

const PreviousResults = () => {
    const location = useLocation();

    const pastCalculations = location.state?.pastCalculations || [];

    return (
        <div className="backgroundImage" style={{ backgroundImage: `url(${resultBackground})` }}>
            <div className="previousResultsContainer">
            <h1>Previous Calculations</h1>
            {pastCalculations.length === 0 ? (
                <p>No previous calculations available</p>
            ) : (
                <List className="calculationsList">
                    {pastCalculations.map((calc, index) => (
                        <Card key={index} className="calculationCard">
                            <CardContent>
                                <h2>Calculation {index + 1}</h2>
                                <p><strong>Total Emissions: </strong> {calc.total_emissions.toFixed(2)} kg CO₂</p>
                                <p><strong>Material Location: </strong>{calc.material_location || "N/A"} </p>
                                <p><strong>Project Destination: </strong>{calc.project_destination || "N/A"} </p>
                                <p><strong>Duration: </strong>{calc.duration_days !==  "N/A" ? `${calc.duration_days} days` : "N/A"} </p>
                                <p><strong>Materials: </strong>
                                    {Array.isArray(calc.materials)
                                        ? calc.materials.map(m => m.name).join(', ')
                                        : "N/A"}
                                </p>
                                <p><strong>Energy Sources: </strong>
                                    {Array.isArray(calc.energy_source)
                                        ? calc.energy_source.join(', ')  
                                        : calc.energy_source || "N/A"} 
                                </p>
                                <p><strong>Quantity: </strong> {calc.material_quantity !== "N/A" ? `${calc.material_quantity} kg` : "N/A"}</p>
                                <p><strong>Transport Modes: </strong>
                                {Array.isArray(calc.transport_modes)
                                    ? calc.transport_modes.join(', ')
                                    : calc.transport_modes || "N/A"}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </List>
            )}
        </div>
    </div>
    );
}

export default PreviousResults;
