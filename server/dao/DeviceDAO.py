from .BaseDAO import BaseDAO
from models import Device

class DeviceDAO(BaseDAO):

    def __init__(self, table='Device'):
        super().__init__(table)

    def get(self):
        devices = []        
        rows = super().get()
        
        for r in rows:
            d = self.parse_obj(r)
            devices.append(d)

        return devices

    def get_by_id(self, id_):        
        devices = super().get_by_id(id_)
        device = devices[0]        
        d = self.parse_obj(device)     
        return d

    def parse_obj(self, obj):
        d = Device()
        d.id_ = obj[0]
        d.name = obj[1]
        d.user = obj[2]
        d.ip = obj[3]
        d.model = obj[4]
        d.created_at = obj[5]
        d.instance_id = obj[6]
        return d
