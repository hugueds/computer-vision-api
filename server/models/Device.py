import datetime
import json
import logging
from database.Database import db


class Device():

    def __init__(self, id_=None, user='', name='', ip='0.0.0.0',  model=0, instance_id=0):
        self.id_ = id_
        self.user = user
        self.name = name
        self.ip = ip
        self.model = int(model)
        self.instance_id = int(instance_id)
        self.created_at = datetime.datetime.now()

    # def __init__(self, **kwargs):
    #     self.id_ = kwargs.get('id')
    #     self.user = kwargs.get('user')
    #     self.name = kwargs.get('name')
    #     self.ip = kwargs.get('ip')
    #     self.model = int(kwargs.get('model'))
    #     self.instance_id = int(kwargs.get('instance_id')
    #     self.created_at = datetime.datetime.now()


    @staticmethod
    def get():
        sql=''' SELECT * FROM DEVICE WHERE ID >= ?;'''
        devices=Device.__get(sql)
        return devices

    @staticmethod
    def get_by_id(id_):
        sql=''' SELECT * FROM DEVICE WHERE ID = ?; '''
        devices=Device.__get(sql, id_)
        return devices[0] if len(devices) else None

    @staticmethod
    def get_by_ip(ip):
        print('Getting Device with IP ' + ip)
        sql=''' SELECT * FROM DEVICE WHERE IP = ?; '''
        devices=Device.__get(sql, ip)
        return devices[0] if len(devices) else None

    @staticmethod
    def get_by_instance_id(instance_id):
        print('Getting Devices with Instance ID: ' + str(instance_id))
        sql=''' SELECT * FROM DEVICE WHERE instance_id = ?; '''
        devices=Device.__get(sql, instance_id)
        return devices

    @staticmethod
    def __get(query, id_=0):

        cursor=db.connect().cursor()
        cursor.execute(query, (id_,))

        devices=[]
        for id_, name, user, ip, model, created_at, instance_id in cursor.fetchall():
            device=Device()
            device.id_=id_
            device.user=user
            device.name=name
            device.ip=ip
            device.model=model
            device.created_at=created_at
            device.instance_id=instance_id
            devices.append(device)

        cursor.close()

        return devices

    def save(self):
        try:
            print('Creating a new Device ' + self.ip)
            sql='''
                INSERT INTO Device(name, user, ip ,instance_id, model, created_at)
                VALUES(?,?,?,?,?,?)
            '''

            connection=db.connect()
            cursor=connection.cursor()
            d=(self.user, self.name, self.ip,
                 self.instance_id, self.model, self.created_at)
            cursor.execute(sql, d)
            connection.commit()
            self.id_=cursor.lastrowid
            cursor.close()

        except Exception as e:
            logging.error('Device::save::'+str(e))

    @staticmethod
    def update(device):
        try:
            sql=''' UPDATE Device
                SET
                    name = ?,
                    user = ?,
                    ip = ?,
                    model = ?,
                    instance_id = ?
                WHERE ID = ?
            '''
            connection=db.connect()
            cursor=connection.cursor()
            d=(device.name, device.user,  device.ip,
                 device.model, device.instance_id, device.id_)
            cursor.execute(sql, (d))
            connection.commit()
            cursor.close()

        except Exception as e:
            logging.error('Device::update::'+str(e))

    @staticmethod
    def delete(id_):
        try:
            print('Deleting device ID_ ' + str(id_))
            sql=''' DELETE FROM DEVICE WHERE ID = ? '''
            conn=db.connect()
            cursor=conn.cursor()
            cursor.execute(sql, (id_,))
            conn.commit()
            cursor.close()

        except Exception as e:
            logging.error('Device::delete::'+str(e))

    def to_json(self):
        return {
            "id": self.id_,
            "name": self.name,
            "user": self.user,
            "ip": self.ip,
            "model": self.model,
            "instanceId": self.instance_id,
            "createdAt": self.created_at
        }
