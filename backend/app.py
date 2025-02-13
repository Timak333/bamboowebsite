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
    rows = query_database("SELECT city FROM material_location")
    locations = [row[0] for row in rows]
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

if __name__ == '__main__':
    app.run(debug=True)