import datetime
import json
import sqlite3
from models.Instance import Instance

database = 'cv_service.db' #   TODO: Pegar do config ou classe database

class Device():

    def __init__(self, id_=None, name='', user='', ip='0.0.0.0', model=0, instance_id=0):

        self.id_ = id_
        self.ip = ip
        self.name = name
        self.user = user
        self.model = model
        self.instance_id_ = instance_id_
        self.created_at = datetime.datetime.now()


    @staticmethod
    def get(id_=0):

        sql = ''' SELECT * FROM DEVICE WHERE ID > ?;'''

        if id_ != 0:
            sql = ''' SELECT * FROM DEVICE WHERE ID = ?; '''

        conn = sqlite3.connect(database)
        cursor = conn.cursor()
        cursor.execute(sql, (id_,))        

        devices = []
        for id_, user, name, ip, device_type, created_at, instance_id_ in cursor.fetchall():
            device = Device()
            device.id_ = id_
            device.user = user
            device.name = name
            device.ip = ip
            device.device_type = device_type
            device.created_at = created_at
            device.instance_id_ = instance_id_
            devices.append(device)

        cursor.close()

        if id_ != 0:
            return devices[0]

        return devices

    @staticmethod
    def get_by_ip(ip):
        print('Getting Device with IP ' + ip)
        sql = ''' SELECT * FROM DEVICE WHERE IP = ?; '''

        conn = sqlite3.connect(database)
        cursor = conn.cursor()
        cursor.execute(sql, (ip,))

        device = None        

        device = Device()

        for id_, user, name, ip, device_type, created_at, instance_id in cursor.fetchall():
            
            device.id_ = id_            
            device.name = name
            device.user = user
            device.ip = ip
            device.device_type = device_type
            device.created_at = created_at
            device.instance_id = instance_id

        cursor.close()

        return device

    def save(self):
        print('Creating a new Device ' + self.ip)
        try:
            sql = ''' INSERT INTO Device(user , name, ip ,instance_id_, deviceType, created_at) VALUES(?,?,?,?,?,?) '''
            conn = sqlite3.connect(database)
            cursor = conn.cursor()
            d = (self.user, self.name, self.ip,
                self.model, self.created_at, self.instance_id)
            cursor.execute(sql, d)
            conn.commit()
            self.id_ = cursor.lastrowid
            cursor.close()
            
        except Exception as e:
            print(str(e))
            

    @staticmethod
    def update(device):
        try:
            sql = ''' UPDATE Device
                SET
                    user = ?, 
                    name = ?,  
                    ip = ?,
                    instance_id_ = ?, 
                    deviceType = ?         
                WHERE ID = (?)
            '''
            conn = sqlite3.connect(database)
            cursor = conn.cursor()
            d = (device.user, device.name, device.ip, device.instance_id,
                device.device_type, device.id_)
            cursor.execute(sql, (d))
            conn.commit()
            cursor.close()
            
        except Exception as e:
            print(str(e))
                    

    @staticmethod
    def delete(id_):
        print('Deleting device ID_ ' + str(id_))
        try:
            sql = ''' DELETE FROM DEVICE WHERE ID = ? '''
            conn = sqlite3.connect(database)
            cursor = conn.cursor()            
            cursor.execute(sql, (id_,))
            conn.commit()
            cursor.close()
            
        except Exception as e:
            print(str(e))

    def to_json(self):        
        return {
            'id_': self.id_,
            'name': self.name,
            'ip': self.ip,
            'user': self.user,
            'instanceId': self.instance_id,
            'model': self.model,
            'createdAt': self.created_at
        }
 