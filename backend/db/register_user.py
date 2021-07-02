import pymysql.cursors
import os
import uuid
from dotenv import load_dotenv
from werkzeug.security import generate_password_hash


load_dotenv()

def create_connection():
    return pymysql.connect(
    host=os.environ.get("DB_HOST"), 
    user=os.environ.get("DB_USER"), 
    password=os.environ.get("DB_PASSWORD"), 
    database='exchange_tracker', 
    cursorclass=pymysql.cursors.DictCursor)

def registration(username, password):
    connection = create_connection()
    user_id = uuid.uuid1().hex
    password_hash = generate_password_hash(password)
    with connection.cursor() as cursor:
        # Create a new record
        sql = "INSERT INTO `users` (`userID`, `username`, `password`) VALUES (%s, %s, %s)"
        cursor.execute(sql, (user_id, username, password_hash))

    # connection is not autocommit by default. So you must commit to save
    # your changes.
    connection.commit()

def valid_username(username):
    connection = create_connection()
    with connection:
        with connection.cursor() as cursor:
            sql = "SELECT `username` FROM `users` WHERE `username`=%s"
            cursor.execute(sql, (username))
            result = cursor.fetchone()
            print(result)
            if result is not None:
                return False
    return True