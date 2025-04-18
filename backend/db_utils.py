import sqlite3

#mapping display category to table name in database
category_to_table = {
    "Concrete In-Situ": "concrete_insitu",
    "Concrete Precast": "concrete_precast",
    "Timber" : "timber",
    "Glass" : "glass",
    "Ceramic" : "ceramic",
    "Clay Brick" : "clay_brick",
    "Plaster" : "plaster",
    "Steel" : "steel",
    "Vinyl" : "vinyl",
    "Bamboo" : "bamboo",
}
#utility function to query database
def query_database(query, params=()):
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    cursor.execute(query, params)
    rows = cursor.fetchall()
    conn.close()
    return rows

#function to get embodied carbon (kgCO₂e/kg) for a selected material
def get_material_carbon(material_name, category_name):
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    table_name = category_to_table.get(category_name)
    if not table_name:
        print(f"Error: No table found for '{category_name}")
        return 0
    
    column_name = "Material Type" if "concrete" not in table_name else "Concrete Type"
    query = f"""
            SELECT "Embodied Carbon kgCO2e/kg"
            FROM "{table_name}"
            WHERE "{column_name}" = ?
        """
    cursor.execute(query, (material_name,))
    row = cursor.fetchone()
    conn.close()
    return row[0] if row else 0

def get_location_coordinates(city, table_name):
    query = f"SELECT latitude, longitude FROM {table_name} WHERE city = ?"
    result = query_database(query, (city,))

    if result:
        return result[0]  # Return the first (latitude, longitude) tuple
    else:
        print(f"Error: No coordinates found for {city} in {table_name}")
        return None, None  # Return None if no match is found

#function to get emission for transportation mode
def get_transport_emission(mode):
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    query = """
            SELECT "CO2 Emissions (gCO₂/tkm)"
            FROM transportation_modes
            WHERE mode = ?
    """
    cursor.execute(query, (mode,))
    row = cursor.fetchone()
    conn.close()
    return row[0] if row else 0

#function to get emission for energy source
def get_energy_source_emission(source):
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    query = """
            SELECT "CO2 pounds per kWh"
            FROM energy_sources
            WHERE source = ?
    """
    cursor.execute(query, (source,))
    row = cursor.fetchone()
    conn.close()
    return row[0] if row else 0

def get_distance_between_locations(material_location, project_destination):
    from calculations import haversine
    lat1, lon1 = get_location_coordinates(material_location, "material_location")
    lat2, lon2 = get_location_coordinates(project_destination, "project_destination")

    if None in (lat1, lon1, lat2, lon2):
        print(f"Error: Invalid coordinates for locations: {material_location}, {project_destination}")
        return None

    return haversine(lat1, lon1, lat2, lon2)