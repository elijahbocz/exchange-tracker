from db.login_user import login
from db.register_user import registration, valid_username
from db.coin import add_new_coin, get_user_coins
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
        coin_name = req['coinName']
        user_id = req['userID']
        exchange = req['exchange']
        quantity = req['quantity']
        avg_price = req['averagePrice']
        add_new_coin(coin_name, user_id, exchange, quantity, avg_price)
    return request.json


@app.route('/api/get-dashboard', methods=['POST'])
def get_dashboard():
    if request.method == 'POST':
        req = request.json
        user_id = req['userID']
        coins = get_user_coins(user_id)
        for coin in coins:
            print(coin['coinName'])
        return(jsonify(coins))
    return request.json

