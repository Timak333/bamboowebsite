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
    Checkbox,
    Autocomplete,
    // Tooltip,
 } from '@mui/material';

const EcoCalculator = () => {
    const materials = ['Bamboo', 'Wood', 'Steel', 'Concrete']
    const locations = ['California', 'New York', 'Texas', 'Florida']
    const modeTransportation = ['Truck', 'Train', 'Ship', 'Plane']
    const energySources = ['Solar', 'Wind', 'Hydro', 'Nuclear']
    const destination = ['Arizona', 'New Mexico', 'Utah', 'Colorado']
    const [selections, setSelections] = useState({
        materials: [],
        locations: [],
        transport: [],
        energy: [],
        destination: [],
    });
    //general handler for changes to materials, location and energy
    const handleSelectionChange = (event, type) => {
        setSelections({ ...selections, [type]: event.target.value });
    };
    //keep track of selected modes of transport
    const [selectedTransport, setSelectedTransport] = useState([]);
    const [transportPercentages, setTransportPercentages] = useState({});

    //add or remove transport mode from selectedTransport
    const handleTransportSelection = (transport) => {
        setSelectedTransport((prevSelected) => {
            if (prevSelected.includes(transport)) {
            //remove transport from selection
            return prevSelected.filter((item) => item !== transport);
        } else {
            //add transport to selection
            return [...prevSelected, transport];
        }
    });

    //show percentage input if transport is selected
    setTransportPercentages((prev) => {
        const updatedPercentages = { ...prev };
        if (selectedTransport.includes(transport)) {
            delete updatedPercentages[transport];
        } else {
            updatedPercentages[transport] = "";
        }
        return updatedPercentages;
    });
    }
    //handle percentage input changes
    const handlePercentageChange = (event, transport) => {
        setTransportPercentages((prev) => ({
            ...prev,
            [transport]: event.target.value,
        }));
    };

    // const handleAutoCompleteChange = (event, newValue, field) => {
    //     setSelections({ ...selections, [field]: newValue });
    // };

    return (
        <div className="backgroundImage" style={{ backgroundImage: `url(${vect3})` }}>
            <div className="ecoCalculatorContainer">
                <Card className='ecoCalculatorCard'>
                    <CardContent>
                        <h1>EcoCalculator</h1>
                        <form className="ecoCalcForm">
                            <FormControl fullWidth>
                                <Autocomplete
                                    multiple
                                    options={destination}
                                    value={selections.destination}
                                    onChange={(event, newValue) =>
                                        setSelections({ ...selections, destination: newValue})}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Project Destination"/>
                                    )}
                                />
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
                            {/* dropdown for material location */}
                            <FormControl fullWidth>
                                <Autocomplete
                                    multiple
                                    options={locations}
                                    value={selections.locations}
                                    onChange={(event, newValue) =>
                                        setSelections({ ...selections, locations: newValue})}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Material Location"/>
                                    )}
                                />
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
                                    value={selectedTransport}
                                    renderValue={(selected) => selected.join(', ')}
                                >
                                {modeTransportation.map((transport) => (
                                    <MenuItem key={transport} value={transport}>
                                        <Checkbox
                                            checked={selectedTransport.includes(transport)}
                                            onChange={() => handleTransportSelection(transport)}/>
                                        <ListItemText primary={transport}/>
                                        {selectedTransport.includes(transport) && (
                                            // <Tooltip title="Specify the percentage for each mode of transportation" arrow>
                                             <TextField
                                                className="transportPercentageInput"
                                                type="number"
                                                placeholder="%"
                                                value={transportPercentages[transport] || ""}
                                                onChange={(event) => handlePercentageChange(event, transport)}
                                                onClick={(event) => event.stopPropagation()}
                                                onFocus={(event) => event.stopPropagation()}
                                                slotProps={{ htmlInput: { min: 0, max: 100 } }}
                                                />
                                            // </Tooltip>
                                            )}
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