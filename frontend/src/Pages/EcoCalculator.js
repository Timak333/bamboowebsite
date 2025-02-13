import React, { useState, useEffect } from 'react';
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
    ListSubheader,
 } from '@mui/material';

 import {
    fetchEnergySources,
    fetchMaterialLocations,
    fetchProjectDestinations,
    fetchTransportationModes,
    fetchMaterials
 } from '../components/apiCalls';

const EcoCalculator = () => {
    const [materials, setMaterials] = useState([]);
    const [locations, setLocations] = useState([]);
    const [destination, setDestination] = useState([]);
    const [modeTransportation, setModeTransportation] = useState([]);
    const [energySources, setEnergySources] = useState([]);
    const [selections, setSelections] = useState({
        materials: [],
        locations: [],
        transport: [],
        energy: [],
        destination: [],
    });

    //flattened materials array for Autocomplete
    const [flattenedMaterials, setFlattenedMaterials] = useState([]);
    //fetch data from backend
    useEffect(() => {
        fetchMaterialLocations().then(setLocations).catch((error) => console.error('Error fetching material locations:', error));
        // fetchMaterials().then(setMaterials).catch((error) => console.error('Error fetching materials:', error));
        fetchMaterials().then((data) => {
            console.log("Fetched materials:", data);
            setMaterials(data);
            const flattened = data.flatMap((group) =>
            group?.materials?.map((material) => ({
                category: group?.category,
                material: material
            }))
            );
            setFlattenedMaterials(flattened)
        }).catch((error) => console.error('Error fetching materials:', error));
        fetchProjectDestinations().then(setDestination).catch((error) => console.error('Error fetching project destinations:', error));
        fetchTransportationModes().then(setModeTransportation).catch((error) => console.error('Error fetching transportation modes:', error));
        fetchEnergySources().then(setEnergySources).catch((error) => console.error('Error fetching energy sources:', error));
    }, []);

    //general handler for changes to materials, location and energy
    const handleSelectionChange = (event, type) => {
        setSelections({ ...selections, [type]: event.target.value });
    };
    //keep track of selected modes of transport
    const [selectedTransport, setSelectedTransport] = useState([]);
    const [transportPercentages, setTransportPercentages] = useState({});

    //add or remove transport mode from selectedTransport
    const handleTransportSelection = (transportMode) => {
        setSelectedTransport((prevSelected) => {
            if (prevSelected.includes(transportMode)) {
            //remove transport from selection
            return prevSelected.filter((item) => item !== transportMode);
        } else {
            //add transport to selection
            return [...prevSelected, transportMode];
        }
    });

    //show percentage input if transport is selected
    setTransportPercentages((prev) => {
        const updatedPercentages = { ...prev };
        if (selectedTransport.includes(transportMode)) {
            delete updatedPercentages[transportMode];
        } else {
            updatedPercentages[transportMode] = "";
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
                                    getOptionLabel={(option) => option.city}
                                    onChange={(event, newValue) =>
                                        setSelections({ ...selections, destination: newValue})}
                                    renderOption={(props, option) => (
                                        <li {...props} key={option.id}>
                                            {option.city}
                                        </li>
                                    )}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Project Destination"/>
                                    )}
                                />
                            </FormControl>
                            {/* dropdown for materials */}
                            <FormControl fullWidth >
                                <Autocomplete
                                    multiple
                                    options={flattenedMaterials}
                                    groupBy={(option) => option.category}
                                    getOptionLabel={(option) => option.material}
                                    value={selections.materials.map((name) =>
                                        flattenedMaterials.find((item) => item.material === name)
                                        )}
                                    onChange={(event, newValue) =>
                                        setSelections({
                                            ...selections,
                                            materials: newValue.map((item) => item.material),
                                        })
                                    }
                                    renderInput={(params) => (
                                        <TextField {...params} label="Materials" variant="outlined"/>
                                    )}
                                    renderOption={(props, option) => (
                                        <li {...props} key={option.material}>
                                            {option.material}
                                        </li>
                                    )}
                                    classes={{
                                        groupLabel: 'materialsDropdownHeader',
                                    }}
                                    />
                            </FormControl>
                            {/* dropdown for material location */}
                            <FormControl fullWidth>
                                <Autocomplete
                                    multiple
                                    options={locations}
                                    getOptionLabel={(option) => option.city}
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
                            {/* input for duration of project */}
                            <TextField
                                label="Duration of Project"
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
                                    renderValue={(selected) => selected.map((id) => {
                                        const transport = modeTransportation.find((item) => item.id === id);
                                        return transport ? transport.mode : '';
                                    }).join(', ')}
                                >
                                {modeTransportation.map((transport) => (
                                    <MenuItem key={transport.id} value={transport.id}>
                                        <Checkbox
                                            checked={selectedTransport.includes(transport.id)}
                                            onChange={() => handleTransportSelection(transport.id)}/>
                                        <ListItemText primary={transport.mode}/>
                                        {selectedTransport.includes(transport.id) && (
                                            // <Tooltip title="Specify the percentage for each mode of transportation" arrow>
                                             <TextField
                                                className="transportPercentageInput"
                                                type="number"
                                                placeholder="%"
                                                value={transportPercentages[transport.id] || ""}
                                                onChange={(event) => handlePercentageChange(event, transport.id)}
                                                onClick={(event) => event.stopPropagation()}
                                                onFocus={(event) => event.stopPropagation()}
                                                slotProps={{ htmlInput: { min: 0, max: 100 } }}
                                                />
                                            )}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {/* input for energy sources */}
                            <FormControl fullWidth>
                                <Autocomplete
                                    multiple
                                    options={energySources}
                                    getOptionLabel={(option) => option.source}
                                    value={selections.energy}
                                    onChange={(event, newValue) =>
                                        setSelections({ ...selections, energy: newValue})}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Energy Sources"/>
                                    )}
                                />
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