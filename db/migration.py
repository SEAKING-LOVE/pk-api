import pandas as pd
import os
from sqlalchemy import create_engine


current_directory = os.path.dirname(os.path.realpath(__file__))
data_directory = current_directory + '/../data/'
all_files = os.listdir(data_directory)
file_extension = '.csv'

def insert_csvs(files):
	for file in files:
		if file.endswith(file_extension):
			create_table(data_directory + file)

def create_table(csv_path):
	data = pd.read_csv(csv_path)
	data.columns = [c.lower() for c in data.columns] # convert columns to lowercase
	print(data.columns)

insert_csvs(all_files)
