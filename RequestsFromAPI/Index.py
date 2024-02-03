import pandas as pd
import threading
import time
from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
from Gets.Maximas import WriteMax
from Gets.Horarios import WriteTimes
from Gets.LastGames import WriteLastGames
import json
from Populator import Populator

app = Flask(__name__)
cors = CORS(app)
app.config['CROS_HEADERS'] = 'Content-Type'

def Updater():
    while True:
        print("Atuliazando dependencias")
        # Populator()
        print("Dependencias atualizadas")
        time.sleep(60)

# t = threading.Thread(target=Updater)
# t.start()

print("Programa principal continuando")

# Construir as funcionalidades
@cross_origin()
@app.route('/')
def homepage():
	return 'A API está no ar'

@app.route('/max/<string:id>')
def MaxPerLeague(id):
    with open(f'Maximas/Json/{id}.json', 'r') as openfile:
        json_object = json.load(openfile)
    return(json_object[0])

@app.route('/times/<string:id>')
def GetLeagues(id):
    with open(f'Times/Json/{id}.json', 'r') as openfile:
        json_object = json.load(openfile)
    return(json_object[0])

@app.route('/lastGames/<string:date>')
def GetLastGames(date):
    with open(f'LastGames/Json/{date}.json', 'r') as openfile:
        json_object = json.load(openfile)
    return(json_object[0])

# Roda API
app.run(host='0.0.0.0',port=5005)