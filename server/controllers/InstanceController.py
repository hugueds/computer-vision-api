from flask import jsonify
from models.Instance import Instance
import json


class InstanceController():

    def __init__(self):
        pass

    def get(self):

        instances = Instance.get()
        response = []
        for i in instances:
            response.append(i.serialize())
        return jsonify(response)

    def get_by_id(self, id):
        instance = Instance.get(id, only_one=True)
        if instance:
            return jsonify(instance.serialize())
        return jsonify({"error": True, "message": 'Instance not found'})

    def create(self, request):
        instance = Instance(
            name=request['name'],
            description=request['description'],
            _type=request['type'],
            identifier=request['identifier'],
            save=request['save']
        )

        instance._save()
        return jsonify(instance.serialize())

    def update(self, request):
        instance = Instance(
            name=request['name'],
            description=request['description'],
            _type=request['type'],
            identifier=request['identifier'],
            save=request['save'],
            id=request['id']
        )
        Instance.update(instance)
        return jsonify(instance.serialize())

    def delete(self, id):
        if id:
            instance = Instance.get(id, True)
            if instance:
                instance.delete(instance.id)
                return ('instance ID ' + str(id) + ' Deleted')
            else:
                return jsonify({"error": True, "message": f'instance ID {id} Not Found'})
        return 'Not Found'

instance_controller = InstanceController()
