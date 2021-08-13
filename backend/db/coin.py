from datetime import datetime

from db.connection import create_connection


# function for adding a new coin to the database associated with a user ID
def add_new_coin(coin_id, user_id, coin_name, coin_symbol, exchange, quantity, avg_price):
    connection = create_connection()
    with connection.cursor() as cursor:
        # store the time the coin was stored inside the database
        now = str(datetime.now())
        sql = "INSERT INTO `coins` (`coinSimpleID`, `userID`, `coinName`, `coinSymbol`, `exchange`, `quantity`, `averagePrice`, `dateAdded`) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
        print(sql)
        cursor.execute(sql, (coin_id, user_id, coin_name, coin_symbol, exchange, quantity, avg_price, now))

    # connection is not autocommit by default
    connection.commit()


# function for getting all coins associated with a user ID
def get_user_coins(user_id):
    connection = create_connection();
    with connection.cursor() as cursor:
        sql = "SELECT * FROM `coins` WHERE `userID`=%s"
        cursor.execute(sql, (user_id))
        return cursor.fetchall()


# function for deleteing a coin associated with a user ID
def delete_existing_coin(coin_id):
    connection = create_connection()
    with connection.cursor() as cursor:
        sql = "DELETE FROM `coins` WHERE `coinID`=%s"
        print(sql)
        cursor.execute(sql, (coin_id))

    # connection is not autocommit by default
    connection.commit()


# function for retrieving the link associated with a coin ID
def get_coin_image(coin_id):
    connection = create_connection()
    with connection.cursor() as cursor:
        sql = "SELECT `imageLink` FROM `coins_images` WHERE `coinID`=%s"
        cursor.execute(sql, (coin_id))
        return cursor.fetchall()
