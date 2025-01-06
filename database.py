import mysql.connector
import os

def connect_to_database():
    connection = mysql.connector.connect(
        host=os.getenv('DB_HOST'),
        user=os.getenv('DB_USER'),
        password=os.getenv('DB_PASSWORD'),
        database=os.getenv('DB_NAME')
    )
    return connection

def save_data(data):
    connection = connect_to_database()
    cursor = connection.cursor()
    for item in data:
        cursor.execute(
            "INSERT INTO scraped_data (url, content) VALUES (%s, %s)",
            (item['url'], item['content'])
        )
    connection.commit()
    cursor.close()
    connection.close()

def get_data():
    connection = connect_to_database()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM scraped_data")
    result = cursor.fetchall()
    cursor.close()
    connection.close()
    return result
