from flask import Flask, jsonify, request
from flask_cors import CORS
from db_utils import query_database, get_distance_between_locations, get_material_carbon, get_location_coordinates
from calculations import calculate_energy_emissions, calculate_transport_emissions

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

@app.route('/')
def home():
    return jsonify({"message": "Backend working"})

#endpoint for material locations
@app.route('/api/material_locations', methods=['GET'])
def get_material_locations():
    rows = query_database("SELECT id, city FROM material_location")
    locations = [{"id": row[0], "city": row[1]} for row in rows]
    return jsonify(locations)

#endpoint for project destinations
@app.route('/api/project_destinations', methods=['GET'])
def get_project_destinations():
    rows = query_database("SELECT id, city FROM project_destination")
    destinations = [{"id": row[0], "city": row[1]} for row in rows]
    return jsonify(destinations)

#endpoint for energy sources
@app.route('/api/energy_sources', methods=['GET'])
def get_energy_sources():
    rows = query_database("SELECT source FROM energy_sources")
    energy_sources = [row[0] for row in rows]
    return jsonify(energy_sources)

#endpoint for transportation modes
@app.route('/api/transportation_modes', methods=['GET'])
def get_transportation_modes():
    rows = query_database("SELECT id, mode FROM transportation_modes")
    transportation_modes = [{"id": row[0], "mode": row[1]} for row in rows]
    return jsonify(transportation_modes)

#endpoint for materials
@app.route('/api/materials', methods=['GET'])
def get_materials():
    queries = [
        ("Glass", 'SELECT "Material Type" FROM glass'),
        ("Steel", 'SELECT "Material Type" FROM steel'),
        ("Timber", 'SELECT "Material Type" FROM timber'),
        ("Aluminum", 'SELECT "Material Type" FROM aluminum'),
        ("Ceramic", 'SELECT "Material Type" FROM ceramic'),
        ("Clay Brick", 'SELECT "Material Type" FROM clay_brick'),
        ("Insulation", 'SELECT "Material Type" FROM insulation'),
        ("Plaster", 'SELECT "Material Type" FROM plaster'),
        ("Rubber", 'SELECT "Material Type" FROM rubber'),
        ("Vinyl", 'SELECT "Material Type" FROM vinyl'),
        ("Bamboo", 'SELECT "Material Type" FROM bamboo'),
        ("Concrete Precast", 'SELECT "Concrete Type" FROM concrete_precast'),
        ("Concrete In-Situ", 'SELECT "Concrete Type" FROM concrete_insitu')
    ]
    material_by_category = {}

    for category, query in queries:
        rows = query_database(query)
        materials = [row[0] for row in rows]
        material_by_category[category] = materials
    response = [{"category": key, "materials": value} for key, value in material_by_category.items()]
    return jsonify(response)

@app.route('/api/calculate_total_emissions', methods=['POST', 'OPTIONS'])
def calculate_total_emissions_api():
    if request.method == "OPTIONS":
        return jsonify({"message": "CORS preflight success"}), 200
    data = request.json
    materials = data.get("materials", [])
    material_quantity = data.get("material_quantity", 0)
    material_location = data.get("material_location")
    project_destination = data.get("project_destination")
    transport_modes = data.get("transport_modes", [])
    transport_percentages = data.get("transport_percentages", {})
    duration_days = data.get("duration_days")
    energy_source = data.get("energy_source", [])

    if not all([materials, material_location, project_destination,
                material_quantity, transport_modes, duration_days, transport_percentages, energy_source]):
        return jsonify({"error": "All fields required"}), 400
    
    total_material_emissions = sum(get_material_carbon(m["name"], m["category"]) for m in materials)
    total_material_emissions *= material_quantity

    distance_km = get_distance_between_locations(material_location, project_destination)
    total_transport_emissions = sum(
        calculate_transport_emissions(distance_km, mode) * (transport_percentages.get(mode, 100) / 100)
        for mode in transport_modes
    )
    total_energy_emissions = sum(calculate_energy_emissions(duration_days, source) for source in energy_source)

    total_emissions = total_material_emissions + total_transport_emissions + total_energy_emissions
    return jsonify({
        "material_emissions": total_material_emissions,
        "transport_emissions": total_transport_emissions,
        "energy_emissions": total_energy_emissions,
        "total_emissions": total_emissions
    })

@app.route('/api/test_coordinates', methods=['GET'])
def test_coordinates():
    lat, lon = get_location_coordinates("New York, United States", "material_location")
    return jsonify({"latitude": lat, "longitude": lon})

if __name__ == '__main__':
    app.run(debug=True)