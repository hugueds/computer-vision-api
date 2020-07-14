import sqlite3
from datetime import datetime
from database.Database import db



class Result():

    def __init__(self, id=0, user='', device='', instance='', label='', confidence=0, path=''):

        self.id = id
        self.user = user
        self.device = device
        self.instance = instance
        self.label = label
        self.confidence = confidence
        self.path = path
        self.timestamp = datetime.now()

    @staticmethod
    def get(offset, quantity):
        sql = ''' SELECT * FROM Result order by ID DESC LIMIT (?) OFFSET (?)'''
        
        cursor = db.connect().cursor()
        

        d = (quantity, offset)
        cursor.execute(sql, (d))

        results = []

        for id, user, device, instance, label, confidence, path, timestamp in cursor.fetchall():
            result = Result()
            result.id = id
            result.user = user
            result.device = device
            result.instance = instance
            result.label = label
            result.confidence = confidence
            result.path = path
            result.timestamp = timestamp
            results.append(result)

        return results

    def save(self):

        try:
            sql = ''' INSERT INTO Result(user, device, instance, label, confidence, path, timestamp) VALUES(?,?,?,?,?,?,?) '''            
            cursor = db.connect().cursor()

            d = (self.user,
                 self.device,
                 self.instance,
                 self.label,
                 self.confidence,
                 self.path,
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
            "confidence": self.confidence,
            "path": self.path,
            "timestamp": self.timestamp
        }
