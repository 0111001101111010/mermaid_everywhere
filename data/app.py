import time
import csv
from geopy.geocoders import Nominatim
from geopy.exc import GeocoderTimedOut
from urllib.error import URLError

geolocator = Nominatim()
rows = []
with open('mermaidtable.csv', 'r') as f:
	reader = csv.reader(f)
	for row in reader:
		try:
			location = geolocator.reverse((row[5],row[4]))
			row[2] = row[2] if row[2] == 'address' else '' if location.address is None else location.address
		except GeocoderTimedOut:
			print('Geocoder timed out.')
		except URLError:
			print('URLError: Name or service not known.')
		except Exception as ex:
			print(ex)
		else:
			rows.append(','.join(row))
	f.close()
with open('mermaidtable.csv', 'wb') as c:
	c.write(bytes('\n'.join(rows), 'UTF-8'))
