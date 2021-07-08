import requests
import os

import pymysql.cursors
from dotenv import load_dotenv

load_dotenv()

def create_connection():
    return pymysql.connect(
    host=os.environ.get("DB_HOST"), 
    user=os.environ.get("DB_USER"), 
    password=os.environ.get("DB_PASSWORD"), 
    database=os.environ.get("DB_NAME"),
    cursorclass=pymysql.cursors.DictCursor)


def add_coins_list():
    url = "https://api.coingecko.com/api/v3/coins/list"
    res = requests.get(url)
    coins = res.json()
    connection = create_connection()
    for coin in coins:
        id = coin['id']
        symbol = coin['symbol']
        name = coin['name']
        with connection.cursor() as cursor:
            sql = "INSERT INTO `coins_list` (`coinID`, `coinSymbol`, `coinName`) VALUES (%s, %s, %s)"
            cursor.execute(sql, (id, symbol, name))
    connection.commit()


def fetch_coins_list():
    connection = create_connection()
    with connection.cursor() as cursor:
        sql = "SELECT * FROM `coins_list`"
        cursor.execute(sql)
        return cursor.fetchall()
