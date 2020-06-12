import datetime
from models.Instance import Instance
import sqlite3

database = 'cv_service.db'

print('Initializing SQLite database... ' + database)


class Device():

    def __init__(self, id='', user='SSB', ip='0.0.0.0', instance_id=0, device_type=0):
        self.id = id
        self.ip = ip
        self.instance_id = instance_id
        self.device_type = device_type
        self.user = user
        self.created_at = datetime.datetime.now()

        if ip != '0.0.0.0': # Create method get device_by_ip
            conn = sqlite3.connect(database)
            cursor = conn.cursor()
            sql = ''' SELECT * FROM DEVICE '''
            cursor.execute(sql)
            rows = cursor.fetchall()
            for row in rows:
                print(row)
            


    def save(self): # nao deixar salvar se IP for igual
        conn = sqlite3.connect(database)
        cursor = conn.cursor()
        d = (self.user, self.ip, self.instance_id,
             self.device_type, self.created_at)
        sql = ''' INSERT INTO Device(user , ip ,instance_id, deviceType, created_at)
              VALUES(?,?,?,?,?) '''
        cursor.execute(sql, d)
        conn.commit()
        cursor.close()
        return True

    def serialize(self):
        return {
            'user': self.user,
            'ip': self.ip,
            'instance': self.instance,
            'deviceType': self.deviceType,
            'createdAt': self.created_at
        }

    def get(id=""):
        pass

    def create(device):
        pass

    def update(id, device):
        pass

    def delete(id):
        pass

