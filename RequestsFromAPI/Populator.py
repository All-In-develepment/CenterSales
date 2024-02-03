import requests
import json
from datetime import datetime
import pytz
from Gets.GetGames import GetGames
import time


def Populator():
	headers = {'Content-Type': 'application/json'}


	# # Verificar o resultado da solicitação


	# # Verificar o resultado da solicitação
	# if response.status_code == 200:
	# 	print("Solicitação POST bem-sucedida!")
	# 	print(response.text)
	# else:
	# 	print(f"Falha na solicitação POST. Código de status: {response.status_code}")
	# 	print(response.text)
	
	# leagues = ("Euro Cup","Super Liga Sul-Americana","Copa do Mundo","Premiership")
	# leagueSelector = 0
	
	# Declaração de variaveis locais
	pos = 0
	oldMatchId = ["","","",""]
	competition = ["","","",""]
	newMatchId = ["","","",""]
	matchHomeTeam = ["","","",""]
	matchAwayTeam = ["","","",""]
	matchFinalSumScore = ["","","",""]
	matchHalfResult = ["","","",""]
	matchFinalResult = ["","","",""]
	matchDate = ["","","",""]
	config = ""
	cookie = ""
	parametros = {}
	url = "http://localhost:5000/api/futebolvirtual/Games"
	tzBet365 = datetime.now(pytz.timezone('Europe/London'))
	dataGame = tzBet365.strftime('%Y-%m-%d')
	hourNow = tzBet365.strftime('%H:%M')
	lastGame = ''

	while True:
		pos = 0
		# Pega o coockie
		config = json.loads(requests.get("http://localhost:5000/api/config",headers={'Authorization':'bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImJvYiIsIm5hbWVpZCI6ImM3ZjJjN2NmLWZjOTctNDY2Yi04NDBhLTQ4MWRlMTI3ZTdjMCIsImVtYWlsIjoiYm9iQHRlc3QuY29tIiwibmJmIjoxNzA0MzgwNzkzLCJleHAiOjE3MDQ5ODU1OTMsImlhdCI6MTcwNDM4MDc5M30.fyoTLTUUABdd4J1EZxuGw4WWawsnop6KHg8wUR7oG5p1wNFoFaHKlcCnn-RqfEPOjo8tIHlDUYEM4ZxcjmvYbw'}).content)
		cookie = config[0]['configurationValue']

		# trativa de horario
		tzBet365 = datetime.now(pytz.timezone('Europe/London'))
		dataGame = tzBet365.strftime('%Y-%m-%d')
		hourNow = tzBet365.strftime('%H:%M')

		# Pega os jogos
		lastGame = GetGames(dataGame,hourNow,cookie)
		# print(lastGame)

		# Tentativa de correção de fechamento do console
		if(lastGame == False):
			print("Resultado não encontrado.")
		
		# Laço de repetição para encontrar jogos
		try:
			for league in lastGame:

				# Populando arreys
				competition[pos] = league['Id']
				newMatchId[pos] = league['matches'][0]['Id']
				matchHomeTeam[pos] = league['matches'][0]['TeamHome']
				matchAwayTeam[pos] = league['matches'][0]['TeamAway']
				matchFinalSumScore[pos] = league['matches'][0]['SumScore']
				matchHalfResult[pos] = league['matches'][0]['HalfTimeResult']
				matchFinalResult[pos] = league['matches'][0]['FinalTimeResult']
				matchDate[pos] = league['matches'][0]['Date']
				
				# Verifica se são jogos diferentes
				if(oldMatchId[pos] != newMatchId[pos]):
					oldMatchId[pos] = newMatchId[pos]
					parametros = {
						'IdBet365': int(newMatchId[pos]),
						'HomeTeam': f'{matchHomeTeam[pos]}',
						'AwayTeam': f'{matchAwayTeam[pos]}',
						'SumScore': int(0) if matchFinalResult[pos] == '0-0' else matchFinalSumScore[pos],
						'FinalTimeResult': f'{matchFinalResult[pos]}',
						'HalfTimeResult': f'{matchHalfResult[pos]}',
						'Date': f'{matchDate[pos]}',
						'HomeImg': f'{league['matches'][0]['HomeImg']}',
						'AwayImg': f'{league['matches'][0]['AwayImg']}',
						'LeagueId': competition[pos]
					}
					print(f"{parametros}")

					# Realizar a solicitação POST com os dados milionarios

					response = requests.post(url, data=json.dumps(parametros), headers=headers)
					if(response.status_code == 200):
						print(f"Novo jogo encontrado: {matchHomeTeam[pos]} x {matchAwayTeam[pos]} - {response.status_code}")
					else:
						print(f"Falha na solicitação POST. Código de status: {response.status_code}\n{response.text}")

				pos = pos+1
		except Exception: 
			print(f'Erro aqui: {Exception}')

		time.sleep(60)

Populator()