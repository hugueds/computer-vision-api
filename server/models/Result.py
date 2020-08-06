import sqlite3
from datetime import datetime
from datetime import date
from database.Database import db

class Result():

    def __init__(self, id_=0, user='', device='', instance='', path='', label='', confidence=0.0):

        self.id_ = id_
        self.user = user
        self.device = device
        self.instance = instance
        self.label = label
        self.confidence = confidence
        self.path = path
        self.timestamp = datetime.now()                

    @staticmethod
    def get(offset, quantity, instance='%', date=date.today()):

        sql = ''' SELECT * FROM Result  WHERE Instance LIKE ? AND DATE(Timestamp) = ? order by ID DESC LIMIT (?) OFFSET (?) '''
        cursor = db.connect().cursor()       

        d = (instance, date, quantity, offset)
        cursor.execute(sql, (d))

        results = []

        for id_, user, device, instance, label, confidence, path, timestamp in cursor.fetchall():
            result = Result()
            result.id_ = id_
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
            connection = db.connect()
            cursor = connection.cursor()            

            d = (self.user,
                 self.device,
                 self.instance,
                 self.label,
                 self.confidence,
                 self.path,
                 self.timestamp)

            cursor.execute(sql, d)
            connection.commit()
            self.id_ = cursor.lastrowid
            cursor.close()           

        except Exception as e:
            print('Result::save::' + str(e))
            

    def to_json(self):        
        return {
            "id": self.id_,
            "user": self.user,
            "device": self.device,
            "instance": self.instance,
            "label": self.label,
            "confidence": str(self.confidence),
            "path": self.path,
            "timestamp": self.timestamp
        }
