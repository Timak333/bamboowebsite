from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return jsonify({"message": "Backend working"})

if __name__ == '__main__':
    app.run(debug=True)