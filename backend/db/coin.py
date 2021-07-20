import os
from datetime import datetime

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


def add_new_coin(coin_id, user_id, coin_name, coin_symbol, exchange, quantity, avg_price):
    connection = create_connection()
    with connection.cursor() as cursor:
        now = str(datetime.now())
        sql = "INSERT INTO `coins` (`coinID`, `userID`, `coinName`, `coinSymbol`, `exchange`, `quantity`, `averagePrice`, `dateAdded`) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
        cursor.execute(sql, (coin_id, user_id, coin_name, coin_symbol, exchange, quantity, avg_price, now))

    # connection is not autocommit by default. So you must commit to save
    # your changes.
    connection.commit()


def get_user_coins(user_id):
    connection = create_connection();
    with connection.cursor() as cursor:
        sql = "SELECT * FROM `coins` WHERE `userID`=%s"
        cursor.execute(sql, (user_id))
        return cursor.fetchall()
