import sqlite3
from .create import create


class Database():

    def __init__(self):
        self.__db_name = 'default.db'

    def set_name(self, db_name):
        self.__db_name = db_name

    def connect(self):
        return sqlite3.connect(self.__db_name)

    def create(self):
        connection = self.connect()
        create(connection)

    def select(self, query, params):
        try:
            pass
        except Exception as e:
            print(str(e))

    def execute(self, query, params):
        try:
            pass
        except Exception as e:
            print(str(e))
        

class Database2():

    def __init__(self):
        self.__db_name = 'default.db'

    def set_name(self, db_name):
        self.__db_name = db_name

    def connect(self):
        self.connection = sqlite3.connect(self.__db_name)         
        return self.connection.cursor()

    def close(self):
        self.connection.commit()
        self.connection.close()        

    def create(self):
        cursor = self.connect()
        create(cursor)

    def select(self, query, params):
        try:
            cursor = self.connect()            
            cursor.execute(query, params)
            rows = cursor.fetchall()            
            cursor.close()
            self.close()
            return rows
        except Exception as e:
            print(str(e))

    def execute(self, query, params):
        try:
            cursor = self.connect()            
            cursor.execute(query, params)
            cursor.close()
            self.close()
            return True
        except Exception as e:
            print(str(e))
            return False


db = Database()
