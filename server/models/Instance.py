import datetime
import json
import logging
from database.Database import db

class Instance():

    def __init__(self, id_=None, name='', description='', type_=0, identifier_mode=0, save=False):
        self.id_ = id_
        self.name = name
        self.description = description
        self.type_ = type_
        self.identifier_mode = identifier_mode
        self.save_ = save
        self.created_at = datetime.datetime.now()

    @staticmethod
    def get(id_=0):
        sql = ''' SELECT * FROM INSTANCE WHERE ID > ? '''            
        instances = Instance.__get(sql)
        return instances

    @staticmethod
    def get_by_id(id_):
        sql = ''' SELECT * FROM INSTANCE WHERE ID = ? '''   
        instances = Instance.__get(sql, id_)
        return instances[0] if len(instances) else None        

    @staticmethod
    def __get(query, id_=0):

        conn = db.connect()
        cursor = conn.cursor()
        cursor.execute(query, (id_,))

        instances = []
        for id_, name, description, type_, identifier_mode, save, created_at in cursor.fetchall():
            instance = Instance()
            instance.id_ = id_
            instance.name = name
            instance.description = description
            instance.type_ = type_
            instance.identifier_mode = identifier_mode
            instance.save_ = True if save == 1 else False
            instance.created_at = created_at
            instances.append(instance)

        cursor.close()
        return instances

    def save(self):
        try:
            print('Creating a new Instance')
            conn = db.connect()
            cursor = conn.cursor()
            d = (self.name, self.description, self.type_,
                 self.identifier_mode, self.save_, self.created_at)
            sql = ''' 
                INSERT INTO Instance( name , description , type, identifier_mode, save, created_at) 
                VALUES (?,?,?,?,?,?) '''
            cursor.execute(sql, d)
            conn.commit()
            self.id_ = cursor.lastrowid
            cursor.close()            
        except Exception as e:
            logging.error('Instance::save::'+str(e))
            

    @staticmethod
    def update(instance):
        try:
            print('Updating Instance ID ' + str(instance.id_))
            sql = ''' 
                UPDATE Instance
                    SET
                        name = ?
                        , description = ?
                        , type= ?
                        , identifier_mode= ?
                        , save = (?)
                WHERE ID = ?
            '''
            conn = db.connect()
            cursor = conn.cursor()
            new_instance = (instance.name, instance.description, instance.type_,
                            instance.identifier_mode, instance.save_, instance.id_)
            cursor.execute(sql, (new_instance))
            conn.commit()
            cursor.close()
            
        except Exception as e:
            logging.error('Instance::update::'+str(e))
            

    @staticmethod
    def delete(id_):
        try:
            print('Deleting Instance id_ ' + str(id_))
            sql = ''' DELETE FROM INSTANCE WHERE ID = ? '''
            conn = db.connect()
            cursor = conn.cursor()
            cursor.execute(sql, (id_,))
            conn.commit()
            cursor.close()
            
        except Exception as e:
            logging.error('Instance::delete::'+str(e))

    def to_json(self):
        return {
            "id": self.id_,
            "name": self.name,
            "description": self.description,
            "type": self.type_,
            "identifierMode": self.identifier_mode,
            "save": self.save_,
            "createdAt": self.created_at
        }
