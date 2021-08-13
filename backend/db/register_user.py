import uuid
from werkzeug.security import generate_password_hash

from db.connection import create_connection


# function for creating a user inside our database
def registration(username, password):
    connection = create_connection()
    # create a uuid for the user id
    user_id = uuid.uuid1().hex
    # create a password hash from the user input
    password_hash = generate_password_hash(password)
    with connection.cursor() as cursor:
        # Create a new record
        sql = "INSERT INTO `users` (`userID`, `username`, `password`) VALUES (%s, %s, %s)"
        cursor.execute(sql, (user_id, username, password_hash))

    # connection is not autocommit by default. So you must commit to save
    # your changes.
    connection.commit()


# function to check if a username is valid;
# an invalid username is one that exists the db already
def valid_username(username):
    connection = create_connection()
    with connection:
        with connection.cursor() as cursor:
            # search the database for a user with passed in username
            sql = "SELECT `username` FROM `users` WHERE `username`=%s"
            cursor.execute(sql, (username))
            result = cursor.fetchone()
            print(result)
            # if the search returns null, then it's an invalid username
            if result is not None:
                return False
    # otherwise, valid username
    return True
