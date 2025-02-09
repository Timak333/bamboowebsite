DROP TABLE IF EXISTS material_location;
DROP TABLE IF EXISTS project_destination;
DROP TABLE IF EXISTS energy_sources;
DROP TABLE IF EXISTS transportation_modes;
DROP TABLE IF EXISTS materials;

CREATE TABLE material_location (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    city TEXT NOT NULL,
    latitude REAL NOT NULL,
    longitude REAL NOT NULL
);

CREATE TABLE project_destination (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    city TEXT NOT NULL,
    latitude REAL NOT NULL,
    longitude REAL NOT NULL
);

CREATE TABLE energy_sources (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    source TEXT NOT NULL,
    gwp_value REAL NOT NULL
);

CREATE TABLE transportation_modes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    mode TEXT NOT NULL,
    gwp_value REAL NOT NULL
);

CREATE TABLE materials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    material_name TEXT NOT NULL,
    material_form TEXT NOT NULL,
    gwp_value REAL NOT NULL
);

CREATE TABLE concrete_insitu (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    "Concrete Type" TEXT NOT NULL,
    "CEM I" REAL,
    "Portland Limestone" REAL,
    "Natural Pozzolanic Ash" REAL,
    "Fly Ash 15%" REAL,
    "Fly Ash 30%" REAL,
    "Fly Ash 40%" REAL,
    "Blast Furnace Slag 25%" REAL,
    "Blast Furnace Slag 50%" REAL,
    "Blast Furnace Slag 70%" REAL
);

CREATE TABLE concrete_precast (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    concrete_type TEXT NOT NULL,
    gwp_value REAL
);
