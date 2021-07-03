import json

from db.login_user import login
from db.register_user import registration, valid_username
from flask import request

from api import app


@app.route('/api/time')
def get_current_time():
    return {'time': time.time()}


@app.route('/api/post', methods=['POST'])
def post():
    if request.method == 'POST':
        req = request.json
        print(req)
        return request.json


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
        