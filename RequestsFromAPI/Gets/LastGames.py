import json
from LastGames.Get import GetLastGames
from datetime import date

def WriteLastGames():

    today = str(date.today())
    data = []
    leagues_datas = json.loads(GetLastGames(today))
    data.append(leagues_datas)
    file_name = f"LastGames/Json/{today}.json"
    file = open(file_name, "w")
    json.dump(data, file)
    file.close()
        
# WriteMax()

