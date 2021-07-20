from db.login_user import login
from db.register_user import registration, valid_username
from db.coin import add_new_coin, get_user_coins
from db.coins_list import fetch_coins_list
from external.simple import get_simple_price
from flask import json, request, jsonify

from api import app


@app.route('/api/register-user', methods=['POST'])
def register_user():
    if request.method == 'POST':
        req = request.json
        username = req['username']
        password= req['password']
        if valid_username(username):
            registration(username, password)
            return {"success": 0}
        return {"error": 1}
        

@app.route('/api/login-user', methods=['POST'])
def login_user():
    if request.method == 'POST':
        req = request.json
        username = req['username']
        password= req['password']
        login_res = login(username, password)
        if login_res['passwords_match'] == True:
            login_res.pop('passwords_match', None)
            return login_res
        return {"error": 1}
        

@app.route('/api/new-coin', methods=['POST'])
def new_coin():
    if request.method == 'POST':
        req = request.json
        coin_id = req['coinID']
        user_id = req['userID']
        coin_name = req['coinName']
        coin_symbol = req['coinSymbol']
        exchange = req['exchange']
        quantity = req['quantity']
        avg_price = req['averagePrice']
        add_new_coin(coin_id, user_id, coin_name, coin_symbol, exchange, quantity, avg_price)
    return request.json


@app.route('/api/get-coins-list')
def get_coins_list():
    return jsonify(fetch_coins_list())


@app.route('/api/get-dashboard', methods=['POST'])
def get_dashboard():
    if request.method == 'POST':
        req = request.json
        user_id = req['userID']
        coins = get_user_coins(user_id)
        coin_ids = []
        for coin in coins:
            print(coin['coinName'])
            coin_ids.append(coin['coinID'])
        prices = get_simple_price(",".join(coin_ids), 'usd')
        print(prices)
        return(jsonify(coins))
    return request.json

