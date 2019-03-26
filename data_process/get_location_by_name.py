# another library
import googlemaps
from datetime import datetime


def read_locations(path, locations):
    with open(path, 'r') as f:
        cur_line = f.readline()

        while cur_line:
            locations.add(cur_line.strip())
            cur_line = f.readline()


def get_latlang(locations):
    cur = 0
    total = len(locations)
    gmaps = googlemaps.Client(key='AIzaSyCLV6iOyD6d60RXPgpzMf4baAy8ZqjCdYE')

    with open("latlong.csv", 'w') as f:
        f.writelines("loc, lat, long\n")

        for location in locations:
            try:
                geocode_result = gmaps.geocode(location)

                f.writelines("{}, {}, {}\n".format(location.replace(',', ' | '), 
                                                    geocode_result[0]['geometry']['location']['lat'], 
                                                    geocode_result[0]['geometry']['location']['lng']))
            except:
                f.writelines("{}, {}, {}\n".format(location.replace(',', ' | '), 'error', 'error'))

            cur += 1
            print("{} / {}".format(cur, total))


if __name__ == "__main__":
    locations = set([])
    read_locations('locations.txt', locations)
    get_latlang(locations)