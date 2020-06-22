import datetime
import json
import sqlite3

database = 'cv_service.db'

class Instance():   

    def __init__(self, id=0, name='', description='', _type=0, identifier=0, save=0):

        self.name = name
        self.description = description
        self._type = _type
        self.identifier = identifier
        self.save = save
        self.created_at = datetime.datetime.now()
                

    @staticmethod
    def get(id=0, only_one=False):

        instances = []
        sql = ''' SELECT * FROM INSTANCE WHERE ID > ? '''

        if id > 0:
            sql = ''' SELECT * FROM INSTANCE WHERE ID = ? '''

        conn = sqlite3.connect(database)
        cursor = conn.cursor()
        cursor.execute(sql, (id,))

        for id, name, description, _type, identifier, save, created_at in cursor.fetchall():

            instance = Instance()
            instance.id = id
            instance.name = name
            instance.description = description
            instance._type = _type         
            instance.identifier = identifier            
            instance.save = save
            instance.created_at = created_at    

            instances.append(instance)

        cursor.close()

        if only_one:
            if len(instances) > 0:
                return instances[0]
            else:
                return None

        return instances

    def _save(self):
        print('Creating a new Instance')
        try:
            conn = sqlite3.connect(database)
            cursor = conn.cursor()            
            d = (self.name, self.description, self._type, self.identifier, self.save, self.created_at)
            sql = ''' INSERT INTO Instance( name , description , type, identifier, save, created_at) VALUES (?,?,?,?,?,?) '''
            cursor.execute(sql, d)
            conn.commit()
            self.id = cursor.lastrowid
            cursor.close()
            return True
        except Exception as e:
            print(str(e))
            return False       

    @staticmethod
    def update(instance):
        try:
            sql = ''' UPDATE Instance
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
            inst = (instance.name, instance.description, instance._type, instance.identifier,
                instance.save, instance.id)
            cursor.execute(sql, (inst))
            conn.commit()
            cursor.close()
            return True
        except Exception as e:
            print(str(e))
            return False  

    @staticmethod
    def delete(id):
        print('Deleting Instance ID ' + str(id))
        try:
            sql = ''' DELETE FROM INSTANCE WHERE ID = ? '''
            conn = sqlite3.connect(database)
            cursor = conn.cursor()            
            cursor.execute(sql, (id,))
            conn.commit()
            cursor.close()
            return True
        except Exception as e:
            print(str(e))
            return False

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "type": self._type,
            "identifier": self.identifier,
            "save": self.save,
            "created_at": self.created_at
        }
