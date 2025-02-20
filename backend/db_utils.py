import sqlite3

#utility function to query database
def query_database(query, params=()):
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    cursor.execute(query, params)
    rows = cursor.fetchall()
    conn.close()
    return rows

#function to get embodied carbon (kgCO₂e/kg) for a selected material
def get_material_carbon(material_name, table_name):
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    column_name = "Material Type" if "concrete" not in table_name else "Concrete Type"
    query = f"""
            SELECT "Embodied Carbon kgCO2e/kg"
            FROM {table_name}
            WHERE "{column_name}" = ?
        """
    cursor.execute(query, (material_name,))
    row = cursor.fetchone()
    conn.close()
    return row[0] if row else 0

#function to get lat and long for a given location
def get_location_coordinates(location_name, table_name):
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    query = f"SELECT latitude, longitude FROM {table_name} WHERE city = ?"
    cursor.execute(query, (location_name,))
    row = cursor.fetchone()
    conn.close()
    return (row[0], row[1]) if row else (None, None)


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
    if None in (lat1, lat2, lon1, lon2):
        return None
    return haversine(lat1, lat2, lon1, lon2)