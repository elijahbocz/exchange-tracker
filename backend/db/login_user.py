import pymysql.cursors
import os
from dotenv import load_dotenv
from werkzeug.security import check_password_hash


load_dotenv()

def create_connection():
    return pymysql.connect(
    host=os.environ.get("DB_HOST"), 
    user=os.environ.get("DB_USER"), 
    password=os.environ.get("DB_PASSWORD"), 
    database='exchange_tracker', 
    cursorclass=pymysql.cursors.DictCursor)


def login(username, password):
    connection = create_connection()
    with connection:
        with connection.cursor() as cursor:
            sql = "SELECT `password` FROM `users` WHERE `username`=%s"
            cursor.execute(sql, (username))
            result = cursor.fetchone()
            password_hash = result['password']
            passwords_match = check_password_hash(password_hash, password);
            return passwords_match
            