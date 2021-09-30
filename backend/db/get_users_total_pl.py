from db.connection import create_connection

# function that will return total PLs for a user in the past week (7 days)
def get_past_week_user_total_pls(user_id):
    connection = create_connection()

    with connection.cursor() as cursor:
        # store the time the coin was stored inside the database
        sql = "SELECT * FROM `users_total_pl` WHERE `userID`=%s"
        cursor.execute(sql, (user_id))
        return cursor.fetchall()
