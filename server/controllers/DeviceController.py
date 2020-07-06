from flask import jsonify
from models.Device import Device
from models.Instance import Instance


class DeviceController():

    def __init__(self):
        pass

    def get(self, id_=0):
        devices = Device.get(id_)
        response = []
        for d in devices:
            response.append(d.to_json())
        return jsonify(response)

    def get_by_ip(self, ip):
        print('Searching for device with IP: ' + ip)
        device = Device.get_by_ip(ip)
        if device:
            instance = Instance.get(device.instance_id)            
            return jsonify({
                "device" : device.to_json(),
                "instance": instance.to_json()
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
