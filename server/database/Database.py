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

    def select(self):
        try:
            pass
        except Exception as e:
            print(str(e))

    def execute(self):
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
        return sqlite3.connect(self.__db_name)

    def create(self):
        connection = self.connect()
        create(connection)

    def select(self):
        try:
            pass
        except Exception as e:
            print(str(e))

    def execute(self):
        try:
            pass
        except Exception as e:
            print(str(e))


db = Database()
