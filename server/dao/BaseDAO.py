from database import Database, Database2

class BaseDAO():

    columns = ''

    def __init__(self, table):        
        self.table = table
        self.db = Database2()

    def get(self):
        query = f'SELECT * FROM {self.table} WHERE ID >= ?;'
        params = ('1')
        rows = self.db.select(query, params)  
        return rows        

    def get_by_id(self, id_):
        query = f'SELECT * FROM {self.table} WHERE ID = ? LIMIT 1;'
        params = (str(id_))
        return self.db.select(query, params) 

    def create(self, obj):
        keys = obj.keys()
        keys = ', '.join(keys)
        keys_params = [ '?' for x in obj.keys() ]
        keys_params = ', '.join(keys_params)
        query = f'INSERT INTO {self.table} ({keys}) VALUES ({keys_params});'                
        params = tuple(obj.values())        
        return self.db.execute(query, params)

    def update(self):
        # Fazer key pair
        query = f'UPDATE {self.table} SET x = y WHERE ID = ?;'
        params = (obj)
        return self.db.execute(query, params)

    def delete(self, id_):
        query = f'DELETE FROM {self.table} WHERE ID = ?;'
        params = (id_)
        return self.db.execute(query, params)

