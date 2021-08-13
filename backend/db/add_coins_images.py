import requests

from db.connection import create_connection


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
