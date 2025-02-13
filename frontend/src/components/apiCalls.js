import axios from "axios";

// base url for backend api
const BASE_URL = "http://127.0.0.1:5000/api";

//fetching data from different tables

export const fetchMaterialLocations = async () => {
    const response = await axios.get(`${BASE_URL}/material_locations`);
    return response.data;
};

export const fetchProjectDestinations = async () => {
    const response = await axios.get(`${BASE_URL}/project_destinations`);
    return response.data;
};

export const fetchTransportationModes = async () => {
    const response = await axios.get(`${BASE_URL}/transportation_modes`);
    return response.data;
};

export const fetchEnergySources = async () => {
    const response = await axios.get(`${BASE_URL}/energy_sources`);
    return response.data;
};
