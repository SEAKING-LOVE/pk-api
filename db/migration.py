import pandas as pd
import os
from sqlalchemy import create_engine
from sqlalchemy.schema import CreateSchema
from sqlalchemy import inspect

current_directory = os.path.dirname(os.path.realpath(__file__))
data_directory = current_directory + '/../data/'
all_files = os.listdir(data_directory)
file_extension = '.csv'

pg_connection_string = 'postgres://localhost:5432/pkapi'
engine = create_engine(pg_connection_string)
schema_name = 'pokemon'

def create_schema():
	ins = inspect(engine)
	if 'pokedex' in ins.get_schema_names():
		engine.execute('DROP SCHEMA ' + schema_name + ' CASCADE;')
	engine.execute(CreateSchema(schema_name))
	read_csvs(all_files)

def read_csvs(files):
	for file in files:
		if file.endswith(file_extension):
			table_name = str.replace(file, file_extension, '')
			create_table(table_name, data_directory + file)

def create_table(table_name, csv_path):
	data = pd.read_csv(csv_path)
	data.columns = [c.lower() for c in data.columns] # convert columns to lowercase
	schema_table_name = schema_name + '.' + table_name
	data.to_sql(table_name, engine, schema = schema_name)
	print('CREATE TABLE ' + table_name)

create_schema()
