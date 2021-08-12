import os
import requests
from datetime import datetime

import pymysql.cursors
from dotenv import load_dotenv

from coins_list import fetch_coins_list

load_dotenv()

def create_connection():
    return pymysql.connect(
    host=os.environ.get("DB_HOST"), 
    user=os.environ.get("DB_USER"), 
    password=os.environ.get("DB_PASSWORD"), 
    database=os.environ.get("DB_NAME"),
    cursorclass=pymysql.cursors.DictCursor)


def add_coin_images():
    connection = create_connection()
    url = "https://api.coingecko.com/api/v3/coins/markets/"
    params = {"vs_currency": "usd"}
    res = requests.get(url, params=params).json()
    for coin in res:
        print(coin['image'])
        with connection.cursor() as cursor:
            sql = "INSERT INTO `coins_images` (`coinID`, `imageLink`) VALUES (%s, %s)"
            cursor.execute(sql, (coin['id'], coin['image']))
    connection.commit()


if __name__ == "__main__":
    add_coin_images()