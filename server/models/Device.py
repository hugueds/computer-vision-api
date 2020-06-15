import datetime
from models.Instance import Instance
import sqlite3

database = 'cv_service.db'

class Device():

    def __init__(self, id=0, device_id='', user='SSB', ip='0.0.0.0', instance_id=0, device_type=0):

        self.ip = ip
        self.device_id = device_id
        self.user = user
        self.instance_id = instance_id
        self.device_type = device_type
        self.created_at = datetime.datetime.now()


    @staticmethod
    def get(id=0):

        devices = []
        sql = ''' SELECT * FROM DEVICE WHERE ID > ?'''

        if id > 0:
            sql = ''' SELECT * FROM DEVICE WHERE ID = ? '''

        conn = sqlite3.connect(database)
        cursor = conn.cursor()
        cursor.execute(sql, (id,))

        device = Device()

        for id, user, device_id, ip, device_type, created_at, instance_id in cursor.fetchall():
            
            device.id = id
            device.user = user
            device.device_id = device_id
            device.ip = ip
            device.device_type = device_type
            device.created_at = created_at
            device.instance_id = instance_id
            devices.append(device)

        cursor.close()

        return devices

    @staticmethod
    def get_by_ip(ip):

        sql = ''' SELECT * FROM DEVICE WHERE IP = ?; '''

        conn = sqlite3.connect(database)
        cursor = conn.cursor()
        cursor.execute(sql, (ip,))

        device = None        

        for id, user, device_id, ip, device_type, created_at, instance_id in cursor.fetchall():
            device = Device()
            device.id = id            
            device.device_id = device_id
            device.user = user
            device.ip = ip
            device.device_type = device_type
            device.created_at = created_at
            device.instance_id = instance_id

        cursor.close()

        return device

    def save(self):  # TODO nao deixar salvar se IP for igual
        try:
            sql = ''' INSERT INTO Device(user , device_id, ip ,instance_id, deviceType, created_at) VALUES(?,?,?,?,?, ?) '''
            conn = sqlite3.connect(database)
            cursor = conn.cursor()
            d = (self.user, self.device_id, self.ip, self.instance_id,
                self.device_type, self.created_at)
            cursor.execute(sql, d)
            conn.commit()
            cursor.close()
            return True
        except Exception as e:
            print(str(e))
            return False

    def update(id, device):
        pass

    def delete(id):
        pass

    def serialize(self):
        return {
            'user': self.user,
            'device_id': self.device_id,
            'ip': self.ip,
            'instance': self.instance_id,
            'deviceType': self.device_type,
            'createdAt': self.created_at
        }
 