import datetime

class Instance():

    name = ''
    description = ''
    _type = 0
    identifier = 0
    save = False    
    created_at = datetime.datetime.now()

    def serialize(self):
        pass