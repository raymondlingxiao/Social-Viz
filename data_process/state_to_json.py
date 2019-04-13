import csv
import json
from pprint import pprint

state_file = './states.csv'
output_file = './states.json'
# build pair

rst = {}

with open(state_file) as f:
    reader = csv.reader(f)
    headers = next(reader)

    for row in reader:
        print([float(row[2]), float(row[1])])


