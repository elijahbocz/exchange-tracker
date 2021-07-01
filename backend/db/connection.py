import pymysql.cursors
import os
from dotenv import load_dotenv

load_dotenv()
connection = pymysql.connect(
    host=os.environ.get("DB_HOST"), 
    user=os.environ.get("DB_USER"), 
    password=os.environ.get("DB_PASSWORD"), 
    database='exchange_tracker', 
    cursorclass=pymysql.cursors.DictCursor)

with connection:
    with connection.cursor() as cursor:
        sql = "SELECT * FROM user;"
        cursor.execute(sql)
        result = cursor.fetchone()
        print(result)

