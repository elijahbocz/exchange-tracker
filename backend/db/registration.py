import pymysql.cursors
import os
import uuid
from dotenv import load_dotenv
from werkzeug.security import generate_password_hash


load_dotenv()


def registration(username, password):
    connection = pymysql.connect(
    host=os.environ.get("DB_HOST"), 
    user=os.environ.get("DB_USER"), 
    password=os.environ.get("DB_PASSWORD"), 
    database='exchange_tracker', 
    cursorclass=pymysql.cursors.DictCursor)

    user_id = uuid.uuid1().hex
    password_hash = generate_password_hash(password)

    with connection:
        with connection.cursor() as cursor:
            sql = f"INSERT INTO users (userID, username, password) VALUES ({user_id}, {username}, {password_hash})" 
            cursor.execute(sql)

