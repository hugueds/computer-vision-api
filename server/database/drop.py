import sqlite3
import logging

def drop(connection, tables=[]):

    cursor = connection.cursor()

    for table in tables:
        cursor.execute('DROP TABLE IF EXISTS ' +  table)
    
    connection.close()

if __name__ == "__main__":
    database = 'cv_service.db'
    connection = sqlite3(database)
    drop(connection)