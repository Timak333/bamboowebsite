from flask import Flask, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return jsonify({"message": "Backend working"})

#utility function to query database
def query_database(query, params=()):
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    cursor.execute(query, params)
    rows = cursor.fetchall()
    conn.close()
    return rows

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

if __name__ == '__main__':
    app.run(debug=True)