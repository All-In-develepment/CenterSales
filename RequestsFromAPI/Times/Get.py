import requests

def GetTimesByLeagues(leagueId):
    # config = dotenv_values(".env")
    # print(config['SPORT_IO_TOKEN'])
    
    url = f"https://www.milionariotips.com.br/Api/view/horarios/competition/{leagueId}/GOLSPAR/Resultado%20FT/96/0/Invalid%20date"

    params = {}
    cookie = '.AspNet.ApplicationCookie=QfTn5zSblN6Dh8-ETjaaUhURdgv3dgHQIT9gQLi3oHI1jov01-Xk2xRqq-Gv06nY8pMiQXZcQu8Io9rWfv8pCN77SZnz1VWUHko_xx7F0Ac_7PtSNrPu38DH8uuF1OjVG7-QzPe1Ex77RJiJYOfUrs3bPFWKLjntaAwNb1b9zFlrovvgjaX3pPRQ80JgN6p14Wb_jJViYhIsFkzCygDF4I_tIHAI4G3OQ9uDERIPOnXI4n7Po1WtXpasgHgE-vPMWKb2JWtSLML0rG0XC6jbM0PSBjGUwIvaDpo2DSheiNMvRK2eybew0pX2tuW8dVFuIWvMRd-6o3v6ERajS5g5IOQ2Bvs5Ad2wUPteoXM0HrNBIvGHfVTndcqyArbw8U08SZ37eSHODpKRUFHrHaHDBo41kBTDsCXvk9mbM1gJW03U3QdqdEjy3oXP9VHwvSJpLij9Q6wbpznpC2bGzwvG49534DfYhEB31a-HzQ66uQ-XaxDg7TdZQEPrghL1J-U4; path=/; secure; HttpOnly'
    headers = {
        'Cookie': cookie,
        # 'Accept':  '*/*',
        # 'Accept-Encoding': 'gzip, deflate, br',
        'User-Agent': 'PostmanRuntime/7.31.3'
    }
    jsonData = requests.get(url, params=params, headers=headers).content
    # print(jsonData)
    return jsonData