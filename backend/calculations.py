import math
from db_utils import get_energy_source_emission, get_transport_emission

def haversine(lat1, lon1, lat2, lon2):
    R = 6371.0 
    lat1, lon1, lat2, lon2 = map(math.radians,[lat1, lon1, lat2, lon2])
    diffLat = lat2 - lat1
    diffLon = lon2 - lon1

    a = math.sin(diffLat / 2)**2 + math.cos(lat1) * math.cos(lat2) * math.sin(diffLon / 2)**2
    c = 2 * math.asin(math.sqrt(a))
    return R * c

def calculate_transport_emissions(distance, transport_mode):
    co2_per_tkm = get_transport_emission(transport_mode)
    co2_per_tkm_kg = co2_per_tkm / 1000
    return distance * co2_per_tkm_kg

def calculate_energy_emissions(duration_days, energy_source):
    hours = duration_days * 24
    co2_per_kWh_lbs = get_energy_source_emission(energy_source)
    co2_per_kWh_kg = co2_per_kWh_lbs * 0.453592
    return co2_per_kWh_kg * hours 