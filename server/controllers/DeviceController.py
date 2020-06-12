from flask import jsonify
from models.Device import Device


class DeviceController():

    def __init__(self):
        pass

    def get(self, id = ''):
        device = Device()
        return jsonify(device.serialize())

    def get_by_ip(self, ip):
        device = Device(ip='10.8.66.4')
        return 'ok'

        pass

    def create(self, device):     
        print(device)   
        d = Device(
            user= device['user'],
            ip = device['ip'],
            instance_id=device['instanceId'], 
            device_type=device['deviceType'])

        d.save()
        return jsonify(d.serialize())

    def update(self):
        return

    def delete(self):
        return


device_controller = DeviceController()