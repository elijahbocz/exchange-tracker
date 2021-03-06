from db.login_user import login
from db.register_user import registration, valid_username
from db.coin import add_new_coin, delete_existing_coin, get_user_coins, delete_existing_coin, get_coin_image
from db.coins_list import fetch_coins_list
from db.exchanges import fetch_exchanges_names
from db.get_users_total_pl import get_past_week_user_total_pls
from external.simple import get_simple_price
from flask import json, request, jsonify

from api import app


# Route for user registration
@app.route('/api/register-user', methods=['POST'])
def register_user():
    if request.method == 'POST':
        req = request.json
        username = req['username']
        password= req['password']
        # check if the username is taken already
        if valid_username(username):
            registration(username, password)
            # 0 success means user was successfully created
            return {"success": 0}
        # 1 error indicates the username is taken
        return {"error": 1}
        

# Route for user login
@app.route('/api/login-user', methods=['POST'])
def login_user():
    if request.method == 'POST':
        req = request.json
        username = req['username']
        password= req['password']
        # attempt to log the user in
        login_res = login(username, password)
        # if the username and password are correct
        if login_res['passwords_match'] == True:
            # remove the tag that the passwords match
            login_res.pop('passwords_match', None)
            # return user ID
            return login_res
        # otherwise credentials are invalid, return error
        return {"error": 1}
        

# Route for retrieving dashboard
@app.route('/api/get-dashboard', methods=['POST'])
def get_dashboard():
    if request.method == 'POST':
        req = request.json
        user_id = req['userID']

        # get coins with associated user ID
        coins = get_user_coins(user_id)
        
        # parse the user's coins and pick out the simple ids
        # these ids will be used for getting the current price data
        coin_ids = []
        for coin in coins:
            # coinSimpleId will be bitcoin, ethereum
            if coin not in coin_ids:
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

            # fetch the image for the current coin
            coin['image'] = get_coin_image(coin['coinSimpleID'])
        # create the dashboard object to be returned to frontend
        dashboard = {}
        dashboard['coins'] = coins
        dashboard['totalPL'] = round(total_p_l, 6)
        return(jsonify(dashboard))
    return request.json


# Route for retrieving the lists of valid coin names and exchange names
@app.route('/api/get-lists')
def get_lists():
    coins = fetch_coins_list()
    exchanges = fetch_exchanges_names()
    lists = {}
    lists['coins'] = coins
    lists['exchanges'] = exchanges
    return jsonify(lists)


# Route for creating a new coin in the database associated with a user
@app.route('/api/new-coin', methods=['POST'])
def new_coin():
    if request.method == 'POST':
        req = request.json
        # parse the object passed to the route
        coin_id = req['coinID']
        user_id = req['userID']
        coin_name = req['coinName']
        coin_symbol = req['coinSymbol']
        exchange = req['exchange']
        quantity = req['quantity']
        avg_price = req['averagePrice']
        add_new_coin(coin_id, user_id, coin_name, coin_symbol, exchange, quantity, avg_price)
    return request.json


# Route for deleting a coin in the database associated with user
@app.route('/api/delete-coin', methods=['POST'])
def delete_coin():
    if request.method == 'POST':
        req = request.json
        coins_to_delete = []
        # parse the list of coin ids passed to the route
        for coin_id in req['toDelete']:
            # ignore any null entries in the list
            if coin_id is not None:
                coins_to_delete.append(coin_id)
        for coin_id in coins_to_delete:
            # parse list and delete the existing coins
            delete_existing_coin(coin_id)
    return request.json


# Route for getting a user's total PLs to display in the graph
@app.route('/api/get-total-pls', methods=['POST'])
def get_total_pls():
    if request.method == 'POST':
        req = request.json
        user_id = req['userID']
        return jsonify(get_past_week_user_total_pls(user_id))
    return request.json
