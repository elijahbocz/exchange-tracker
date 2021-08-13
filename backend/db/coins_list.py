import requests

from db.connection import create_connection


# function for retrieving the list of all coins supported by CoinGecko
# and then storing the needed data inside our database
def add_coins_list():
    url = "https://api.coingecko.com/api/v3/coins/list"
    res = requests.get(url)
    coins = res.json()
    connection = create_connection()
    # parse the data received from CoinGecko
    for coin in coins:
        id = coin['id']
        symbol = coin['symbol']
        name = coin['name']
        with connection.cursor() as cursor:
            sql = "INSERT INTO `coins_list` (`coinID`, `coinSymbol`, `coinName`) VALUES (%s, %s, %s)"
            cursor.execute(sql, (id, symbol, name))
    connection.commit()


# retrieves the list of all possible coins stored in our database
def fetch_coins_list():
    connection = create_connection()
    with connection.cursor() as cursor:
        sql = "SELECT * FROM `coins_list`"
        cursor.execute(sql)
        return cursor.fetchall()
