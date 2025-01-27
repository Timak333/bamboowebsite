import React, { useState } from 'react';
import EcoCalculatorBackground from '../assets/Images/EcoCalculatorBackground.png';
import ecocalcbackground from '../assets/Images/ecocalcbackground.png';
import vect3 from '../assets/Images/vect3.jpg';
import './EcoCalculator.css';
import {
    Card,
    CardContent,
    TextField,
    MenuItem,
    Button,
    FormControl,
    InputLabel,
    Select,
    ListItemText,
 } from '@mui/material';
import { Form } from 'react-router-dom';
// import Grid from '@mui/material/Grid'

const EcoCalculator = () => {
    const materials = ['Bamboo', 'Wood', 'Steel', 'Concrete']
    const locations = ['California', 'New York', 'Texas', 'Florida']
    const modeTransportation = ['Truck', 'Train', 'Ship', 'Plane']
    const energySources = ['Solar', 'Wind', 'Hydro', 'Nuclear']
    const [selections, setSeletions] = useState({
        materials: [],
        locations: [],
        transport: [],
        energy: [],
    });
    const handleSelectionChange = (event, type) => {
        setSeletions({ ...selections, [type]: event.target.value });
    };

    return (
        <div className="backgroundImage" style={{ backgroundImage: `url(${vect3})` }}>
            <div className="ecoCalculatorContainer">
                <Card className='ecoCalculatorCard'>
                    <CardContent>
                        <h1>EcoCalculator</h1>
                        <form className="ecoCalcForm">
                            <FormControl fullWidth>
                                <InputLabel>Project Location</InputLabel>
                                <Select
                                    label="Project Location"
                                    multiple
                                    value={selections.locations}
                                    onChange={(event) => handleSelectionChange(event, 'locations')}
                                    renderValue={(selected) => selected.join(', ')}
                                >
                                    {locations.map((location) => (
                                        <MenuItem
                                            key={location}
                                            value={location}
                                            >
                                            <ListItemText
                                                primary={location}
                                                slotProps={{
                                                    primary: {
                                                        style: {fontWeight: selections.locations.indexOf(location) > -1 ? 'bold' : 'normal' },
                                                },
                                                }}
                                             />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {/* dropdown for materials */}
                            <FormControl fullWidth>
                                <InputLabel>Materials</InputLabel>
                                <Select
                                    label="Materials"
                                    multiple
                                    value={selections.materials}
                                    onChange={(event) => handleSelectionChange(event, 'materials')}
                                    renderValue={(selected) => selected.join(', ')}
                                >
                                    {materials.map((material) => (
                                        <MenuItem
                                            key={material}
                                            value={material}
                                            >
                                            <ListItemText
                                                primary={material}
                                                slotProps={{
                                                    primary: {
                                                        style: {fontWeight: selections.materials.indexOf(material) > -1 ? 'bold' : 'normal' },
                                                },
                                                }}
                                             />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {/* input for quantity */}
                            <TextField
                                label="Quantity"
                                fullWidth
                                margin="normal"
                            />
                            {/* dropdown for mode of transportation */}
                            <FormControl fullWidth>
                                <InputLabel>Mode of Transportation</InputLabel>
                                <Select
                                    label="Mode of Transportation"
                                    multiple
                                    value={selections.transport}
                                    onChange={(event) => handleSelectionChange(event, 'transport')}
                                    renderValue={(selected) => selected.join(', ')}
                                >
                                    {modeTransportation.map((transport) => (
                                        <MenuItem
                                            key={transport}
                                            value={transport}
                                            >
                                            <ListItemText
                                                primary={transport}
                                                slotProps={{
                                                    primary: {
                                                        style: {fontWeight: selections.transport.indexOf(transport) > -1 ? 'bold' : 'normal' },
                                                },
                                                }}
                                             />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {/* input for energy sources */}
                            <FormControl fullWidth>
                                <InputLabel>Energy Sources</InputLabel>
                                <Select
                                    label="Energy Sources"
                                    multiple
                                    value={selections.energy}
                                    onChange={(event) => handleSelectionChange(event, 'energy')}
                                    renderValue={(selected) => selected.join(', ')}
                                >
                                    {energySources.map((energy) => (
                                        <MenuItem
                                            key={energy}
                                            value={energy}
                                            >
                                            <ListItemText
                                                primary={energy}
                                                slotProps={{
                                                    primary: {
                                                        style: {fontWeight: selections.energy.indexOf(energy) > -1 ? 'bold' : 'normal' },
                                                },
                                                }}
                                             />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
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