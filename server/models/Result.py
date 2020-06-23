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

    @staticmethod
    def get(offset, quantity):
        sql = ''' SELECT * FROM Result order by ID DESC LIMIT (?) OFFSET (?)'''
        conn = sqlite3.connect(database)
        cursor = conn.cursor()       

        d = (quantity, offset)
        cursor.execute(sql, (d))

        results = []

        for id, user, device, instance, label, probability, file_path, timestamp in cursor.fetchall():
            result = Result()
            result.id = id
            result.user = user
            result.device = device
            result.instance = instance
            result.label = label
            result.probability = probability
            result.file_path = file_path
            result.timestamp = timestamp
            results.append(result)

        return results

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

    def serialize(self):
        return {
            "id": self.id,
            "user": self.user,
            "device": self.device,
            "instance": self.instance,
            "label": self.label,
            "probability": self.probability,
            "file_path": self.file_path,
            "timestamp": self.timestamp
        }
