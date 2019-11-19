import os
from flask import Flask, render_template, jsonify
from pyFMG import fortimgr

# FMG details
fmg_host = os.environ['FORTIMAPS_FMG_HOST']
fmg_user = os.environ['FORTIMAPS_FMG_USERNAME']
fmg_password = os.environ['FORTIMAPS_FMG_PASSWORD']
###

app = Flask(__name__)

def getdevice():
    with fortimgr.FortiManager(fmg_host, fmg_user, fmg_password,
        disable_request_warnings=True) as fmg_instance:
        data = [{
        "url": "/dvmdb/device",
        "loadsub": "0",
        "fields": [ "name", "latitude", "longitude", "conn_status", "conf_status" ],
        "filter": [ "latitude", "!=", "0.0" ] #filters devices without lat set
        }]
        response = fmg_instance.free_form("get", data=data)
        result = response[1]["result"][0]["data"]
        return result

def fmgtogeojson(data):
    geojson = {
      "type": "FeatureCollection",
      "features": []
    }
    for feature in data:
        _feature = {}
        _feature["type"] = "Feature"
        _feature["geometry"] = {}
        _feature["geometry"]["type"] = "Point"
        _feature["geometry"]["coordinates"] = [float(feature["longitude"]),
        float(feature["latitude"])]
        _feature["properties"] = {}
        _feature["properties"]["id"] = feature["name"]
        if feature["conn_status"] == 1:
            _feature["properties"]["status"] = "online"
        elif feature["conn_status"] == 2:
            _feature["properties"]["status"] = "offline"
        else:
            _feature["properties"]["status"] = "unknown"
        geojson["features"].append(_feature)
    return geojson

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/devices')
def devices():
    r = getdevice()
    geojson = fmgtogeojson(r)
    return jsonify(geojson)

if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0')
