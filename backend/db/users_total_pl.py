import os
import requests
from datetime import datetime

from connection import create_connection


def get_simple_price(ids, vs_currencies):
    params = {
        "ids": ids,
        "vs_currencies": vs_currencies
    }
    url = "https://api.coingecko.com/api/v3/simple/price"
    res = requests.get(url, params=params)
    return res.json()


def get_user_coins(user_id):
    connection = create_connection();
    with connection.cursor() as cursor:
        sql = "SELECT * FROM `coins` WHERE `userID`=%s"
        cursor.execute(sql, (user_id))
        return cursor.fetchall()


def users_total_pl_6hr():
    connection = create_connection()
    user_ids = []
    with connection.cursor() as cursor:
        sql = "SELECT `userID` FROM `users`"
        cursor.execute(sql)
        result = cursor.fetchall()
        user_ids = result
        total_p_l_objs = []
        for user_id in user_ids:
            # get coins with associated user ID
            coins = get_user_coins(user_id['userID'])
            
            # parse the user's coins and pick out the simple ids
            # these ids will be used for getting the current price data
            coin_ids = []
            for coin in coins:
                # coinSimpleId will be bitcoin, ethereum
                coin_ids.append(coin['coinSimpleID'])
            # get the current prices from CoinGecko in usd
            prices = get_simple_price(",".join(coin_ids), 'usd')
            # match the ids of the prices and coins
            for key in prices.keys():
                for coin in coins:
                    # if keys are equal, create the current price for the coin
                    if (coin['coinSimpleID'] == key):
                        coin['currentPrice'] = prices[key]['usd']
            # keeps track of the running sum for the profits and losses
            total_p_l = 0
            # loop through coins and calculate the profits and losses
            for coin in coins:
                # calculate the profit and loss for the coin
                quantity = float(coin['quantity'])
                avg_price = float(coin['averagePrice'])
                cur_price = float(coin['currentPrice'])
                p_and_l = round((cur_price * quantity) - (avg_price * quantity), 6)
                coin['pAndL'] = p_and_l

                # update the running sum for profits and losses
                total_p_l += p_and_l
            # append a new object containing the user ID and the user's total profits/losses
            total_p_l_objs.append({"userID": user_id['userID'], "totalPL": total_p_l})
        for total_p_l_obj in total_p_l_objs:
            now = str(datetime.now())
            sql = "INSERT INTO `users_total_pl` (`userID`, `totalPL`, `dateAdded`) VALUES (%s, %s, %s)"
            cursor.execute(sql, (total_p_l_obj['userID'], total_p_l_obj['totalPL'], now))
        
    connection.commit()


if __name__ == "__main__":
    users_total_pl_6hr()
