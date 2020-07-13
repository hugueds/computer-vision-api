import datetime
import json
import logging
from database.Database import db

class Device():

    def __init__(self, id_=None, name='', ip='0.0.0.0', user='',  model=0, instance_id=0):
        self.id_ = id_
        self.name = name
        self.ip = ip
        self.user = user
        self.model = model
        self.instance_id = instance_id
        self.created_at = datetime.datetime.now()

    @staticmethod
    def get():
        sql = ''' SELECT * FROM DEVICE WHERE ID >= ?;'''
        devices = Device.__get(sql)
        return devices
    
    @staticmethod
    def get_by_id(id_):
        sql = ''' SELECT * FROM DEVICE WHERE ID = ?; '''
        devices = Device.__get(sql, id_)
        return devices[0] if len(devices) else None      
         
    @staticmethod
    def get_by_ip(ip):
        print('Getting Device with IP ' + ip)
        sql = ''' SELECT * FROM DEVICE WHERE IP = ?; '''
        devices = Device.__get(sql, ip)
        return devices[0] if len(devices) else None

    @staticmethod
    def __get(query, id_=0):

        cursor = db.connect().cursor()
        cursor.execute(query, (id_,))

        devices = []
        for id_, user, name, ip, model, created_at, instance_id in cursor.fetchall():
            device = Device()
            device.id_ = id_
            device.user = user
            device.name = name
            device.ip = ip
            device.model = model
            device.created_at = created_at
            device.instance_id = instance_id            
            devices.append(device)

        cursor.close()

        return devices
   

    def save(self):        
        try:
            print('Creating a new Device ' + self.ip)
            sql = ''' 
                INSERT INTO Device(user, name, ip ,instance_id, model, created_at) 
                VALUES(?,?,?,?,?,?) 
            '''
            
            connection = db.connect()
            cursor = connection.cursor()
            d = (self.user, self.name, self.ip, self.instance_id, self.model, self.created_at)
            cursor.execute(sql, d)
            connection.commit()
            self.id_ = cursor.lastrowid
            cursor.close()
            
        except Exception as e:
            logging.error('Device::save::'+str(e))
            

    @staticmethod
    def update(device):
        try:
            sql = ''' UPDATE Device
                SET
                    user = ?, 
                    name = ?,  
                    ip = ?,
                    instance_id_ = ?, 
                    model = ?         
                WHERE ID = (?)
            '''
            connection = db.connect()
            cursor = connection.cursor()
            d = (device.user, device.name, device.ip, device.instance_id,
                device.model, device.id_)
            cursor.execute(sql, (d))
            connection.commit()
            cursor.close()
            
        except Exception as e:
            logging.error('Device::update::'+str(e))
                    

    @staticmethod
    def delete(id_):
        try:
            print('Deleting device ID_ ' + str(id_))
            sql = ''' DELETE FROM DEVICE WHERE ID = ? '''
            conn = db.connect()
            cursor = conn.cursor()            
            cursor.execute(sql, (id_,))
            conn.commit()
            cursor.close()
            
        except Exception as e:
            logging.error('Device::delete::'+str(e))

    def to_json(self):        
        return {
            "id": self.id_,
            "name": self.name,
            "ip": self.ip,
            "user": self.user,
            "model": self.model,
            "instanceId": self.instance_id,
            "createdAt": self.created_at
        }
 