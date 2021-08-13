from werkzeug.security import check_password_hash

from db.connection import create_connection


# function for logging the user in
def login(username, password):
    connection = create_connection()
    with connection:
        with connection.cursor() as cursor:
            # retrieve user from the database by username
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
            