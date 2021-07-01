from api import app
from flask import request

@app.route('/api/time')
def get_current_time():
    return {'time': time.time()}


@app.route('/api/post', methods=['POST'])
def post():
    if request.method == 'POST':
        req = request.json
        print(req)
        return request.json