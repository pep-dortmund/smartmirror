from flask import Flask, render_template, jsonify
from openvrr import get_station_departures


app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/vrr')
def vrr():

    data = get_station_departures('Dortmund Universität S', limit=5)

    departures = [
        {
            'timestamp': dep.get('realDateTime', dep['dateTime']).isoformat(),
            'to': dep['servingLine']['direction'],
            'from': dep['servingLine']['directionFrom'],
            'type': dep['servingLine']['name'],
            'name': dep['servingLine']['number'],
            'delay': dep['servingLine'].get('delay', 0),
        }
        for dep in data['departureList']
    ]

    return jsonify(status='success', departures=departures)
