from flask import jsonify
from models.Instance import Instance

class InstanceController():

    def __init__(self):
        pass

    def get(id=''):
        instance = Instance.get(id)
        return jsonify(instance.serialize())

    def create(self, request):
        instance = Instance(
            name = request['name'],
            description = request['description']
            _type = request['type']
            identifier = request['identifier']
            save = request['save']
        )
        instance.save()
        return instance
        

    def update():
        pass

    def delete():
        pass




instance_controller = InstanController()