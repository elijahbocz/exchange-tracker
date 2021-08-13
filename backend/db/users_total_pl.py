import os
from datetime import datetime

from db.connection import create_connection

def add_users_total_pl_6hr():
    connection = create_connection()
