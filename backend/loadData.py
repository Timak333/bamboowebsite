import sqlite3
import pandas as pd

#connect to database
DB_NAME = 'database.db'
conn = sqlite3.connect(DB_NAME)
cursor = conn.cursor()

#load data from excel into a specific table
def load_excel_into_table(file_path, sheet_name, table_name, columns):
    try:
        data = pd.read_excel(file_path, sheet_name=sheet_name)
        data.columns = data.columns.str.strip()
           
        data.to_sql(table_name, conn, if_exists='append', index=False)
        print(f"Data loaded into {table_name} table from {file_path}, sheet: {sheet_name}")
    except Exception as e:
        print(f"Error loading data into {table_name} table: {e}")

FILE_PATH = "data/materialsEmbodiedCarbon.xlsx"

tables_to_load = [
    {
        "sheet_name": "material_location",
        "table_name": "material_location",
        "columns": ["city", "latitude", "longitude"]
    },
    {
        "sheet_name": "project_destination",
        "table_name": "project_destination",
        "columns": ["city", "latitude", "longitude"]
    },
    {
        "sheet_name": "concrete_insitu",
        "table_name": "concrete_insitu",
        "columns": ["Concrete Type","CEM I", "Portland Limestone", "Natural Pozzolanic Ash ",
                    "Fly Ash 15%", "Fly Ash 30%", "Fly Ash 40%", "Blast Furnace Slag 25%", 
                    "Blast Furnace Slag 50%", "Blast Furnace Slag 70%"]
    },
    {
        "sheet_name": "concrete_precast",
        "table_name": "concrete_precast",
        "columns": ["Material Type", "Embodied Carbon kgCO2e/kg"]
    },
    {
        "sheet_name": "steel",
        "table_name": "steel",
        "columns": ["Material Type", "Embodied Carbon kgCO2e/kg"]
    }, 
    {
        "sheet_name": "timber",
        "table_name": "timber",
        "columns": ["Material Type", "Embodied Carbon kgCO2e/kg"]
    }, 
    {
        "sheet_name": "glass",
        "table_name": "glass",
        "columns": ["Material Type", "Embodied Carbon kgCO2e/kg"]
    },
    {
        "sheet_name": "aluminum",
        "table_name": "aluminum",
        "columns": ["Material Type", "Embodied Carbon kgCO2e/kg"]
    },
    {
        "sheet_name": "ceramic",
        "table_name": "ceramic",
        "columns": ["Material Type", "Embodied Carbon kgCO2e/kg"]
    },
    {
        "sheet_name": "clay_brick",
        "table_name": "clay_brick",
        "columns": ["Material Type", "Embodied Carbon kgCO2e/kg"]
    },
    {
        "sheet_name": "insulation",
        "table_name": "insulation",
        "columns": ["Material Type", "Embodied Carbon kgCO2e/kg"]
    },
    {
        "sheet_name": "plaster",
        "table_name": "plaster",
        "columns": ["Material Type", "Embodied Carbon kgCO2e/kg"]
    },
    {
        "sheet_name": "rubber",
        "table_name": "rubber",
        "columns": ["Material Type", "Embodied Carbon kgCO2e/kg"]
    },
    {
        "sheet_name": "vinyl",
        "table_name": "vinyl",
        "columns": ["Material Type", "Embodied Carbon kgCO2e/kg"]
    },
    {
        "sheet_name": "bamboo",
        "table_name": "bamboo",
        "columns": ["Material Type", "Embodied Carbon kgCO2e/kg"]
    }
]

for table in tables_to_load:
    load_excel_into_table(
        file_path=FILE_PATH,
        sheet_name=table["sheet_name"],
        table_name=table["table_name"],
        columns= table["columns"],
        )
    
conn.commit()
conn.close()