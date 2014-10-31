import time
import csv
from geopy.geocoders import Nominatim
from geopy.exc import GeocoderTimedOut
from urllib.error import URLError

geolocator = Nominatim()
with open('mermaidtable.csv', 'r') as f:
	reader = csv.reader(f)
	c = open('output.txt', 'wb')
	rows = []
	for row in reader:
		try:
			location = geolocator.reverse((row[5],row[4]))
			rows.append(', '.join(row))
			print(location.address)
		except GeocoderTimedOut:
			print('Geocoder timed out.')
		except URLError:
			print('URLError: Name or service not known.')
		except Exception as ex:
			print(ex)
	c.write(bytes('\n'.join(rows), 'UTF-8'))
