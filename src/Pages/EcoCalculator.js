import React from 'react';
import EcoCalculatorBackground from '../assets/Images/EcoCalculatorBackground.png';
import ecocalcbackground from '../assets/Images/ecocalcbackground.png';
import vect3 from '../assets/Images/vect3.jpg';
import './EcoCalculator.css';
import { Card, CardContent, TextField, MenuItem, Button } from '@mui/material';
// import Grid from '@mui/material/Grid'

const EcoCalculator = () => {
    const materials = ['Bamboo', 'Wood', 'Steel', 'Concrete']
    const locations = ['California', 'New York', 'Texas', 'Florida']
    const modeTransportation = ['Truck', 'Train', 'Ship', 'Plane']

    return (
        <div className="backgroundImage" style={{ backgroundImage: `url(${vect3})` }}>
            <div className="ecoCalculatorContainer">
                <Card className='ecoCalculatorCard'>
                    <CardContent>
                        <h1>EcoCalculator</h1>
                        <form className="ecoCalcForm">
                            <TextField
                                select
                                label="Project Location"
                                fullWidth
                                variant="outlined"
                            >
                                {locations.map((location) => (
                                    <MenuItem key={location} value={location}>
                                        {location}
                                    </MenuItem>
                                ))}
                            </TextField>

                            {/* dropdown for materials */}
                            <TextField
                                select
                                label="Materials"
                                fullWidth
                                // margin="normal"
                                variant="outlined"
                            >
                                {materials.map((material) => (
                                    <MenuItem key={material} value={material}>
                                        {material}
                                    </MenuItem>
                                ))}
                            </TextField>
                            {/* input field for quanity of material */}
                            <TextField
                                label="Quantity"
                                fullWidth
                                margin="normal"
                                variant="outlined"
                            />
                            {/* dropdown for mode of transportation */}
                            <TextField
                                select
                                label="Mode of Transportation"
                                fullWidth
                                margin="normal"
                                variant="outlined"
                            >
                                {modeTransportation.map((transport) => (
                                    <MenuItem key={transport} value={transport}>
                                        {transport}
                                    </MenuItem>
                                ))}
                            </TextField>
                            {/* input for energy sources */}
                            <TextField
                                label="Energy Sources"
                                fullWidth
                                margin="normal"
                                variant="outlined"
                            />
                        </form>
                        <Button
                                variant="contained"
                                className="calculateButton"
                                fullWidth
                                type="submit"
                            >
                                Calculate
                            </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
export default EcoCalculator;