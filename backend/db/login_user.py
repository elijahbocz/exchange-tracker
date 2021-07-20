import os

import pymysql.cursors
from dotenv import load_dotenv
from werkzeug.security import check_password_hash

load_dotenv()

def create_connection():
    return pymysql.connect(
    host=os.environ.get("DB_HOST"), 
    user=os.environ.get("DB_USER"), 
    password=os.environ.get("DB_PASSWORD"), 
    database=os.environ.get("DB_NAME"),
    cursorclass=pymysql.cursors.DictCursor)


def login(username, password):
    connection = create_connection()
    with connection:
        with connection.cursor() as cursor:
            sql = "SELECT `userID`, `username`, `password` FROM `users` WHERE `username`=%s"
            cursor.execute(sql, (username))
            result = cursor.fetchone()

            # userID and username to be returned to client-side
            user_id = result['userID']
            username = result['username']

            # hashed password
            password_hash = result['password']
            # compare the input password with the stored password
            passwords_match = check_password_hash(password_hash, password);
            return {
                "passwords_match": passwords_match,
                "userID": user_id,
                "username": username
            }
            