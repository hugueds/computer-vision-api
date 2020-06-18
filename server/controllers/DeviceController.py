from flask import jsonify
from models.Device import Device
from models.Instance import Instance


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
        print('Searching for device with IP: ' + ip)
        device = Device.get_by_ip(ip)
        if device:
            instance = Instance.get(device.instance_id, True)            
            return jsonify({
                "device" : device.serialize(),
                "instance": instance.serialize()
            })        
        return jsonify(Device(ip=ip).serialize())

    def create(self, request):

        d = Device(
            user=request['user'],
            ip=request['ip'],
            device_id=request['deviceId'],
            instance_id=request['instanceId'],
            device_type=request['deviceType'])

        d.save()

        return jsonify(d.serialize())

    def update(self):
        return

    def delete(self, id):
        if id:
            device = Device.get(id, True)
            if device:
                Device.delete(device.id)
                return jsonify({ "error": False, "message": 'Device ID ' + str(id) + ' Deleted'})
            else:
                return jsonify({"error": True, "message": f'Device ID {id} Not Found'})
        return 'Not Found'


device_controller = DeviceController()
