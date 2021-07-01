from api import app
from flask import request
import json
from db.register_user import registration, valid_username

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
        else:
            return {"error": 1}
        return request.json
