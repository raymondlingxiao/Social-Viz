import csv
import json
from pprint import pprint

state_file = './us-states.json'
firearm_file = './fire_arm.csv'
# build pair

data = {}
pair = {}
with open(state_file) as f:
    data = json.load(f)['features']
f.close()

for state in data:
    name = state['properties']['name']
    id = state['id']
    pair[name] = id

# pprint(pair)

# clean data

end_year = 2016
start_year = 2012

out_data = {}

permits_list = {}
for i in range(start_year, end_year+1, 1):
    permits = {}
    with open(firearm_file) as f:
        reader = csv.reader(f)
        headers = next(reader)

        for row in reader:
            month = row[0]
            state = row[1]
            handgun = 0
            long_gun = 0

            if (len(row[4]) != 0):
                handgun = int(row[4]) * 1.1

            if (len(row[5]) != 0):
                long_gun = int(row[5]) * 1.1
            multi_gun = int(row[7]) * 2

            permit = int(handgun + long_gun + multi_gun)

            # exclude Guam and other states which not exists in database
            if (str(i) in month and state in pair):
                if (state not in permits):
                    permits[state] = {}
                    permits[state]["permit"] = permit
                    permits[state]["id"] = pair[state]
                else:
                    permits[state]["permit"] = permits[state]["permit"] + int(permit)
    permits_list[str(i)] = permits

pprint(permits_list)

# save as json file

out_put_file = './firearm_v2.json'
with open(out_put_file,'w') as file:
    json.dump(permits_list,file)


