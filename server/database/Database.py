import sqlite3
from .create import create


class Database():

    def __init__(self):
        pass

    def set_name(self, db_name):
        self.__db_name = db_name

    def connect(self):
        return sqlite3.connect(self.__db_name)

    def create(self):
        connection = self.connect()
        create(connection)


db = Database()
