from flask import jsonify
from models import Instance
import json

class InstanceController():

    def __init__(self):
        pass

    def get(self):
        instances = Instance.get()
        response = []
        for i in instances:
            response.append(i.to_json())
        return jsonify(response)

    def get_by_id(self, id_):
        instance = Instance.get_by_id(id_)
        if instance:
            return jsonify(instance.to_json())
        return jsonify({"error": True, "message": 'Instance not found'})

    def create(self, request):
        instance = Instance(
            name=request['name'],
            description=request['description'],
            type_=request['type'],
            identifier_mode=request['identifierMode'],
            save=request['save']
        )

        instance.save()
        return jsonify(instance.to_json())

    def update(self, request):
        instance = Instance(
            id_=request['id'],
            name=request['name'],
            description=request['description'],
            type_=request['type'],
            identifier_mode=request['identifierMode'],
            save=request['save'],
        )
        Instance.update(instance)
        return jsonify(instance.to_json())

    def delete(self, id_):
        if id_:
            instance = Instance.get_by_id(id_)
            if instance:
                instance.delete(id_)
                return ('Instance ID ' + str(id_) + ' Deleted')
            else:
                return jsonify({"error": True, "message": f'Instance ID {id_} Not Found'})
        return 'Not Found'

instance_controller = InstanceController()
