import sqlite3
import pandas as pd

#connect to database
DB_NAME = 'database.db'
conn = sqlite3.connect(DB_NAME)

#load data from excel into a specific table
def load_excel_into_table(file_path, sheet_name, table_name, columns):
    try:
        data = pd.read_excel(file_path, sheet_name=sheet_name)
        data.columns = data.columns.str.strip()

        cursor = conn.cursor()
        cursor.execute(f"SELECT name FROM sqlite_master WHERE type='table' AND name='{table_name}';")
        if cursor.fetchone() is None:
            raise Exception(f"Table {table_name} does not exist in the database")
           
        data.to_sql(table_name, conn, if_exists='append', index=False)
        print(f"Data loaded into {table_name} table from {file_path}, sheet: {sheet_name}")
    except Exception as e:
        print(f"Error loading data into {table_name} table: {e}")

FILE_PATH = "data/largeData.xlsx"

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
        "columns": ["CEM I", "Portland Limestone", "Natural Pozzolanic Ash ",
                    "Fly Ash 15%", "Fly Ash 30%", "Fly Ash 40%", "Blast Furnace Slag 25%", 
                    "Blast Furnace Slag 50%", "Blast Furnace Slag 70%"]
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