from flask import jsonify
from models.Device import Device


class DeviceController():

    def __init__(self):
        pass

    def get(self, id=0):
        devices = Device.get(id)
        response = []
        for d in devices:
            response.append(d.serialize())
        return jsonify(response)

    def get_by_ip(self, ip):
        device = Device.get_by_ip(ip)
        if device:
            return jsonify(device.serialize())
        return jsonify({ "error": True, "message": 'Device not found' })

    def create(self, device):             
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