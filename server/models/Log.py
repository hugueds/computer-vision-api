from datetime import datetime

class Log():

    user = ''
    box_model = ''
    client_time = ''
    picture = ''

    def __init__(self):
        self.server_time = datetime.now()

    def save(self):
        pass