import datetime
import json
import sqlite3
# from database import database


database = 'cv_service.db'  # Import database name from database folder


class Instance():

    def __init__(self, id_=None, name='', description='', type_=0, identifier_mode=0, save=False):

        self.id_ = id_
        self.name = name
        self.description = description
        self.type_ = type_
        self.identifier_mode = identifier_mode
        self.save = save
        self.created_at = datetime.datetime.now()

    @staticmethod
    def get(id_=0):

        instances = []

        sql = ''' SELECT * FROM INSTANCE WHERE ID > ? '''

        if id_ != 0:
            sql = ''' SELECT * FROM INSTANCE WHERE ID = ? '''

        conn = sqlite3.connect(database)
        cursor = conn.cursor()
        cursor.execute(sql, (id,))

        for id_, name, description, type_, identifier_mode, save, created_at in cursor.fetchall():

            instance = Instance()
            instance.id_ = id_
            instance.name = name
            instance.description = description
            instance.type_ = type_
            instance.identifier_mode = identifier_mode
            instance.save = True if save == 1 else False
            instance.created_at = created_at

            instances.append(instance)

        cursor.close()

        if id_ != 0:
            return instances[0]

        return instances

    def save(self):
        print('Creating a new Instance')
        try:
            conn = sqlite3.connect(database)
            cursor = conn.cursor()
            d = (self.name, self.description, self.type_,
                 self.identifier_mode, self.save, self.created_at)
            sql = ''' INSERT INTO Instance( name , description , type, identifier_mode, save, created_at) VALUES (?,?,?,?,?,?) '''
            cursor.execute(sql, d)
            conn.commit()
            self.id_ = cursor.lastrowid
            cursor.close()            
        except Exception as e:
            print(str(e))
            

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
                        , identifier= ?
                        , save = (?)
                WHERE ID = ?
            '''
            conn = sqlite3.connect(database)
            cursor = conn.cursor()
            new_instance = (instance.name, instance.description, instance.type_,
                            instance.identifier_mode, instance.save, instance.id_)
            cursor.execute(sql, (new_instance))
            conn.commit()
            cursor.close()
            
        except Exception as e:
            print(str(e))
            

    @staticmethod
    def delete(id_):
        try:
            print('Deleting Instance id_ ' + str(id_))
            sql = ''' DELETE FROM INSTANCE WHERE ID = ? '''
            conn = sqlite3.connect(database)
            cursor = conn.cursor()
            cursor.execute(sql, (id_,))
            conn.commit()
            cursor.close()
            
        except Exception as e:
            print(str(e))

    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "type": self.type_,
            "identifier": self.identifier_mode,
            "save": self.save,
            "created_at": self.created_at
        }
