from database import Database, Database2

class BaseDAO():

    table = ''

    def __init__(self):
        self.db = Database2()
        self.db.
        pass

    def get(self):
        query = 'SELECT * FROM ' + self.table
        params = ()
        rows = []
        Database.execute()        
        return rows        

    def get_by_id(self):
        pass

    def create(self):
        pass

    def update(self):
        pass

    def delete(self):
        pass