import os
import requests
from dotenv import load_dotenv
# import Connection
import json
import time
import logging
import gc

def GetGames(dateToday,hourNow,cookie):
    load_dotenv("./.env")

    # config = Connection.SelectDb("SELECT * FROM Config where ConfigName = 'Cookie'")
    # cookie = config[0]['ConfigValue']

    # print (cookie)

    url = 'https://www.milionariotips.com.br/api/view/ultimosjogos/'+dateToday
    params = {}
    headers = {
        'Cookie': cookie,
        # 'Accept':  '*/*',
        # 'Accept-Encoding': 'gzip, deflate, br',
        'User-Agent': 'PostmanRuntime/7.31.3'
    }
   
    try:
        logging.info("Conexão com a API.")
        response = requests.get(url, params=params, headers=headers)
        responseJson = json.loads(response.content)
        print(f"{dateToday} {hourNow} - OK")
        return responseJson
    except:
        print(f"{dateToday} {hourNow} - Fail")
        # time.sleep(600)
        # return responseJson
        
    gc.collect()
    # print(type(responseJson[0]))
    try:
        logging.info("Executando nova tentativa.")
        return responseJson
    except:
        return False

# GetGames('2023-02-08')