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

# def calculate_transport_emissions(distance, transport_mode):
#     co2_per_tkm = get_transport_emission(transport_mode)
#     co2_per_tkm_kg = co2_per_tkm / 1000
#     return distance * co2_per_tkm_kg
def calculate_transport_emissions(distance, transport_mode):
    co2_per_tkm = get_transport_emission(transport_mode)
    
    if co2_per_tkm is None:
        print(f"❌ Error: No emission data found for transport mode: {transport_mode}")
        return 0  # Return 0 instead of None to avoid crashing

    co2_per_tkm_kg = co2_per_tkm / 1000

    if distance is None:
        print(f"❌ Error: Distance is None for transport mode: {transport_mode}")
        return 0  # Return 0 if distance is missing

    print(f"✅ Calculating transport emissions: Distance = {distance}, Emission Factor = {co2_per_tkm_kg}")
    
    return distance * co2_per_tkm_kg

def calculate_energy_emissions(duration_days, energy_source):
    hours = duration_days * 24
    co2_per_kWh_lbs = get_energy_source_emission(energy_source)
    co2_per_kWh_kg = co2_per_kWh_lbs * 0.453592
    return co2_per_kWh_kg * hours 