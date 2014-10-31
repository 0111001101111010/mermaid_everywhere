merfinder
=========

A mermaid finder for the Hampton Roads area based on [Maptime HRVA's Haunted Leaflet How-To](http://maptime.io/hrva/ghosts/hauntedHRVA.html).

Data Management
===============

```python
pip install -r requirements.txt # installs the Python dependencies
python data/app.py		# geolocates the coordinates from the CSV data file
```

uses
---
- [LeafletJS](leafletjs.org)
- [Stamen MapStack](mapstack.stamen.com)
- [Geojson.io](geojson.io)
