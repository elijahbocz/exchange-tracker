import requests

# function for fetching the price of coins, using the coin id and currency
def get_simple_price(ids, vs_currencies):
    params = {
        "ids": ids,
        "vs_currencies": vs_currencies
    }
    url = "https://api.coingecko.com/api/v3/simple/price"
    res = requests.get(url, params=params)
    return res.json()
