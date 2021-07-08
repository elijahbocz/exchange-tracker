import requests

url = "https://api.coingecko.com/api/v3/ping"
res = requests.get(url)
print(res)
