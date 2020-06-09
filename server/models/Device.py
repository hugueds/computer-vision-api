import datetime

class Device():

    user = 'SSB'
    ip = '0.0.0.0'
    instance_id = 0
    _type = 0 # 0 Tablet, 1 Mobile, 2 PC, 3 Other
    created_at = datetime.datetime.timestamp()

