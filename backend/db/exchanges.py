import requests

from db.connection import create_connection


def add_exchanges_list():
    url = "https://api.coingecko.com/api/v3/exchanges/list"
    res = requests.get(url)
    exchanges = res.json()
    connection = create_connection()
    for exchange in exchanges:
        id = exchange['id']
        name = exchange['name']
        with connection.cursor() as cursor:
            sql = "INSERT INTO `exchanges_list` (`exchangeID`, `exchangeName`) VALUES (%s, %s)"
            cursor.execute(sql, (id, name))
    connection.commit()


def fetch_exchanges_names():
    connection = create_connection()
    with connection.cursor() as cursor:
        sql = "SELECT `exchangeName` FROM `exchanges_list`"
        cursor.execute(sql)
        return cursor.fetchall()
