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
    concrete_type TEXT NOT NULL,
    cemI REAL,
    portland_limestone REAL,
    natural_pozzolanic_ash REAL,
    fly_ash_15 REAL,
    fly_ash_30 REAL,
    fly_ash_40 REAL,
    blast_furnace_slag_25 REAL,
    blast_furnace_slag_50 REAL,
    blast_furnace_slag_70 REAL
);

CREATE TABLE concrete_precast (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    concrete_type TEXT NOT NULL,
    gwp_value REAL
);
