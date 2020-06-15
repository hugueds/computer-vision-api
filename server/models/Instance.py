import datetime

database = 'cv_service.db'

class Instance():

    name = ''
    description = ''
    _type = 0
    identifier = 0
    save = False
    created_at = datetime.datetime.now()

    @staticmethod
    def get(id=0):

        instances = []
        sql = ''' SELECT * FROM INSTANCE WHERE ID > ? '''

        if id > 0:
            sql = ''' SELECT * FROM INSTANCE WHERE ID = ? '''

        conn = sqlite3.connect(database)
        cursor = conn.cursor()
        cursor.execute(sql, (id,))

        for id, user, ip, device_type, created_at, instance_id in cursor.fetchall():
            instance = Instance()
            instance.id = id
            instance.user = user
            instance.ip = ip
            instance.device_type = device_type
            instance.created_at = created_at
            instance.instance_id = instance_id
            instance.append(instance)

        cursor.close()

        return instance

    def save(self):
        try:
            conn = sqlite3.connect(database)
            cursor = conn.cursor()
            d = (self.user, self.ip, self.instance_id,
                self.device_type, self.created_at)
            sql = ''' INSERT INTO Instance(name , description , type, identifier, save) VALUES(?,?,?,?,?) '''
            cursor.execute(sql, d)
            conn.commit()
            cursor.close()
            return True
        except Exception as e:
            print(str(e))
            return False        

    def serialize(self):
        return {
            "name": self.name,
            "description": self.description,
            "type": self._type,
            "identifier": self.identifier,
            "save": self.save,
            "created_at": self.created_at
        }
