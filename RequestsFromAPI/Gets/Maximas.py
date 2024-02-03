import json
from Maximas.Get import GetMaxByLeagues
import time

def WriteMax():
    # DECLARAÇÃO DE VARIAVEIS
    leagues = []
    leagues_datas = json

    # LER ARQUIVOS COM ID`S DAS LIGAS
    with open('ids.json', 'r') as openfile:
        json_object = json.load(openfile)

    # ADICIONIANA ID`S A VARIAVEL LEAGUES
    for id in json_object['ids']:
        leagues.append(id)

    # print(leagues)
    for league in leagues:
        data = []
        leagues_datas = json.loads(GetMaxByLeagues(league))
        data.append(leagues_datas)
        file_name = f"Maximas/Json/{league}.json"
        file = open(file_name, "w")
        json.dump(data, file)
        file.close()
        
# WriteMax()

