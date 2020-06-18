import sqlite3
from datetime import datetime
import database


database = 'cv_service.db'


class Result():

    def __init__(self, id=0, user="", device="", instance="", label="", probability=0, file_path=""):

        self.id = id
        self.user = user
        self.device = device
        self.instance = instance
        self.label = label
        self.probability = probability
        self.file_path = file_path
        self.timestamp = datetime.now()

    def save(self):

        try:
            sql = ''' INSERT INTO Result(user, device, instance, label, probability, filePath, timestamp) VALUES(?,?,?,?,?,?,?) '''
            conn = sqlite3.connect(database)
            cursor = conn.cursor()

            d = (self.user,
                 self.device,
                 self.instance,
                 self.label,
                 self.probability,
                 self.file_path,
                 self.timestamp)

            cursor.execute(sql, d)
            conn.commit()
            self.id = cursor.lastrowid
            cursor.close()
            return True

        except Exception as e:
            print(str(e))
            return False
