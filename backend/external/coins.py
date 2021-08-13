import requests

# function for fetching all available coins from CoinGecko
def get_coins_list():
    url = "https://api.coingecko.com/api/v3/coins/list"
    res = requests.get(url)
    print(res.json())
