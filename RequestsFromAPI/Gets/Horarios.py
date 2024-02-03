import json
from Times.Get import GetTimesByLeagues
import time

def WriteTimes():
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
        leagues_datas = json.loads(GetTimesByLeagues(league))
        data.append(leagues_datas)
        file_name = f"Times/Json/{league}.json"
        file = open(file_name, "w")
        json.dump(data, file)
        file.close()
        
# WriteMax()

