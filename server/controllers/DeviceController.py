from flask import jsonify
from models import Device, Instance

class DeviceController():

    def __init__(self):
        pass

    def get(self):
        devices = Device.get()
        response = []
        for d in devices:
            response.append(d.to_json())
        if len(response) == 0:
            return jsonify({"error": True, "message": "There are no devices yet"})
        return jsonify(response)

    def get_by_id(self, id_):
        device = Device.get_by_id(id_)
        if device:
            return jsonify(device.to_json())
        return jsonify({ "error": "True", "message": "Device ID not found"})


    def get_by_ip(self, ip):
        print('Searching for device with IP: ' + ip)
        device = Device.get_by_ip(ip)
        if device:
            instance = Instance.get(device.instance_id)
            return jsonify({
                "device" : device.to_json(),
                "instance": instance.to_json() if instance else None
            })        
        return jsonify({ "error": "True", "message": "Device IP not registered"})

    def create(self, request):

        d = Device(
            name=request['name'],
            user=request['user'],
            ip=request['ip'],
            instance_id=request['instanceId'],
            model=request['model'])

        d.save()

        return jsonify(d.to_json())

    def update(self, request):
        d = Device(
            id_=request['id'],
            name=request['name'],
            user=request['user'],
            ip=request['ip'],
            instance_id=request['instanceId'],
            model=request['model']
        )
        Device.update(d)
        return jsonify(d.to_json())

    def delete(self, id_):        
        if id_:
            device = Device.get(id_)
            if device:
                Device.delete(device.id_)
                return jsonify({ "error": False, "message": 'Device ID ' + str(id_) + ' Deleted'})
            else:
                return jsonify({"error": True, "message": f'Device ID {id_} Not Found'})
        return 'Not Found'


device_controller = DeviceController()
