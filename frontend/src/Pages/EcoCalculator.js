import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import vect3 from '../assets/Images/vect3.jpg';
import './EcoCalculator.css';
import axios from 'axios';
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
 } from '@mui/material';

 import {
    fetchEnergySources,
    fetchMaterialLocations,
    fetchProjectDestinations,
    fetchTransportationModes,
    fetchMaterials
 } from '../components/apiCalls';

const EcoCalculator = () => {
    const navigate = useNavigate();

    const [setMaterials] = useState([]);
    const [locations, setLocations] = useState([]);
    const [destination, setDestination] = useState([]);
    const [modeTransportation, setModeTransportation] = useState([]);
    const [energySources, setEnergySources] = useState([]);
    const [selections, setSelections] = useState({
        materials: [],
        material_quantity: "",
        material_location: "",
        transport_modes: [],
        duration_days: "",
        project_destination: "",
        energy_source: [],
        transport_percentages: {},
    });
    //keep track of selected modes of transport
    const [selectedTransport, setSelectedTransport] = useState([]);
    const [transportPercentages, setTransportPercentages] = useState({});
    //flattened materials array for Autocomplete
    const [flattenedMaterials, setFlattenedMaterials] = useState([]);

    //fetch data from backend
    useEffect(() => {
        fetchMaterialLocations()
            .then((data) => {
                console.log("Material Locations Data:", data); // Debugging log
                setLocations(data);
            })
            .catch((error) => console.error('Error fetching material locations:', error));
    
        fetchMaterials()
            .then((data) => {
                console.log("Materials Data:", data); // Debugging log
                setMaterials(data);
                const flattened = data.flatMap((group) =>
                    group?.materials?.map((material) => ({
                        category: group?.category,
                        material: material
                    }))
                );
                setFlattenedMaterials(flattened);
            })
            .catch((error) => console.error('Error fetching materials:', error));
    
        fetchProjectDestinations()
            .then((data) => {
                console.log("Project Destinations Data:", data); // Debugging log
                setDestination(data);
            })
            .catch((error) => console.error('Error fetching project destinations:', error));
    
        fetchTransportationModes()
            .then((data) => {
                console.log("Transportation Modes Data:", data); // Debugging log
                setModeTransportation(data);
            })
            .catch((error) => console.error('Error fetching transportation modes:', error));
    
        fetchEnergySources()
            .then((data) => {
                console.log("Energy Sources Data:", data); // Debugging log
                setEnergySources(data);
            })
            .catch((error) => console.error('Error fetching energy sources:', error));
    }, []);

    //general handler for changes to materials, location and energy
    const handleSelectionChange = (event, field) => {
        setSelections({ ...selections, [field]: event.target.value });
    };

    //add or remove transport mode from selectedTransport
    const handleTransportSelection = (transportMode) => {
        setSelections((prev) => {
            const updatedTransportModes = prev.transport_modes.includes(transportMode)
                ? prev.transport_modes.filter((item) => item !== transportMode)
                : [...prev.transport_modes, transportMode];
    
            // Update transport percentages inside selections
            const updatedPercentages = { ...prev.transport_percentages };
            if (prev.transport_modes.includes(transportMode)) {
                delete updatedPercentages[transportMode];
            } else {
                updatedPercentages[transportMode] = "";
            }
    
            return { 
                ...prev, 
                transport_modes: updatedTransportModes,
                transport_percentages: updatedPercentages 
            };
        });
    };
    //handle percentage input changes
    const handlePercentageChange = (event, transport) => {
        const value = event.target.value;
        setSelections((prev) => ({
            ...prev,
            transport_percentages: {
                ...prev.transport_percentages,
                [transport]: value
            }
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Calculate button clicked! Sending data:", selections);
        try {
            const response = await axios.post("http://localhost:5000/api/calculate_total_emissions", selections,
            {headers: { "Content-Type": "applications/json"}});
            console.log("Emissions response:", response.data);
            navigate("/results", { state: { emissionsData: response.data } });
        } catch (error) {
            console.error("Error calculating emissions:", error);
        }
        };

    return (
        <div className="backgroundImage" style={{ backgroundImage: `url(${vect3})` }}>
            <div className="ecoCalculatorContainer">
                <Card className='ecoCalculatorCard'>
                    <CardContent>
                        <h1>EcoCalculator</h1>
                        <form className="ecoCalcForm" onSubmit={handleSubmit}>
                            <FormControl fullWidth>
                                <Autocomplete
                                    multiple
                                    options={destination || []}
                                    value={selections.project_destination || []}
                                    getOptionLabel={(option) => option.city}
                                    onChange={(event, newValue) =>
                                        setSelections({ ...selections, project_destination: newValue })}
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
                                    options={flattenedMaterials || []}
                                    groupBy={(option) => option.category}
                                    getOptionLabel={(option) => option.material}
                                    value={flattenedMaterials.filter((item) =>
                                        selections.materials.includes(item.material))}
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
                                    options={locations || []}
                                    value={selections.material_location || []}
                                    getOptionLabel={(option) => option.city}
                                    onChange={(event, newValue) =>
                                        setSelections({ ...selections, material_location: newValue})}
                                    renderOption={(props, option) => (
                                        <li {...props} key={option.id}>
                                            {option.city}
                                        </li>
                                    )}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Material Location"/>
                                    )}
                                />
                            </FormControl>
                            {/* input for quantity */}
                            <TextField
                                label="Quantity (kg)"
                                fullWidth
                                type ="number"
                                value={selections.material_quantity}
                                onChange={(event) => handleSelectionChange (event, "material_quantity")}
                                margin="normal"
                            />
                            {/* input for duration of project */}
                            <TextField
                                label="Duration of Project (days)"
                                fullWidth
                                type="number"
                                value={selections.duration_days}
                                onChange={(event) => handleSelectionChange (event, "duration_days")}
                                margin="normal"
                            />
                            {/* dropdown for mode of transportation */}
                            <FormControl fullWidth>
                                <InputLabel>Mode of Transportation</InputLabel>
                                <Select
                                    label="Mode of Transportation"
                                    multiple
                                    value={selections.transport_modes || []}
                                    onChange={(event) =>
                                            setSelections({ ...selections,transport_modes: event.target.value })}   
                                    renderValue={(selected) => selected.map((mode) => {
                                        const transport = modeTransportation.find((item) => item.mode === mode);
                                        return transport ? transport.mode : mode;
                                    }).join(', ')}
                                >
                                {modeTransportation.map((transport) => (
                                    <MenuItem key={transport.id} value={transport.mode}>
                                        <Checkbox
                                            checked={selections.transport_modes.includes(transport.mode)}
                                            onChange={() => handleTransportSelection(transport.mode)}/>
                                        <ListItemText primary={transport.mode}/>
                                        {selections.transport_modes.includes(transport.mode) && (
                                            // <Tooltip title="Specify the percentage for each mode of transportation" arrow>
                                             <TextField
                                                className="transportPercentageInput"
                                                type="number"
                                                placeholder="%"
                                                value={selections.transport_percentages[transport.mode] || ""}
                                                onChange={(event) => handlePercentageChange(event, transport.mode)}
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
                                <InputLabel>Energy Sources</InputLabel>
                                <Select
                                    label="Energy Sources"
                                    multiple
                                    value={selections.energy_source}
                                    onChange={(event) => handleSelectionChange(event, 'energy_source')}
                                    renderValue={(selected) => selected.join(', ')}
                                >
                                    {energySources.map((source) => (
                                        <MenuItem key={source} value={source}>
                                            {source}
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
                                onClick={handleSubmit}
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