from flask import Flask, render_template, jsonify
from openvrr import get_station_departures
import os
from dotenv import load_dotenv
import requests

load_dotenv()

OPENWEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather'

app = Flask(__name__)
app.config['OPENWEATHER_APPID'] = os.environ['OPENWEATHER_APPID']

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/vrr')
def vrr():

    data = get_station_departures('Dortmund Universität S', limit=5)

    departures = [
        {
            'timestamp': dep['dateTime'].isoformat(),
            'to': dep['servingLine']['direction'],
            'from': dep['servingLine']['directionFrom'],
            'type': dep['servingLine']['name'],
            'name': dep['servingLine']['number'],
            'delay': dep['servingLine'].get('delay', 0),
        }
        for dep in data['departureList']
    ]

    return jsonify(status='success', departures=departures)

@app.route('/weather/<city>')
def weather(city):
    weather = requests.get(
        OPENWEATHER_URL,
            params=dict(
            q=city,
            units='metric',
            appid=app.config['OPENWEATHER_APPID'],
        )
    )
    return jsonify(status='succes', weather=weather.json())
