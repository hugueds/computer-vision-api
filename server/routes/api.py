from flask import Blueprint, request, json
from controllers.ApiController import api_controller
from controllers.DeviceController import device_controller
from controllers.InstanceController import instance_controller
from controllers.ResultController import result_controller

api_router = Blueprint('api_router', __name__)

@api_router.route('/api/device/', methods=['GET', 'POST', 'PUT', 'DELETE'], defaults={'id': None})
@api_router.route('/api/device/<id>/', methods=['GET', 'POST', 'PUT', 'DELETE'])
def device(id):
    ip = request.remote_addr
    if request.method == 'GET':
        if id:
            return device_controller.get(int(id))
        else:
            return device_controller.get_by_ip(ip) 
    elif request.method == 'POST':        
        return device_controller.create(request.json)
    elif request.method == 'PUT':
        return device_controller.update(request.json)
    elif request.method == 'DELETE':
        return device_controller.delete(int(id))
    

@api_router.route('/api/instance/', methods=['GET', 'POST', 'PUT', 'DELETE'], defaults={'id': 0})
@api_router.route('/api/instance/<id>/', methods=['GET', 'POST', 'PUT', 'DELETE'])
def instance(id):    
    if request.method == 'GET':  
        if id:      
            return instance_controller.get_by_id(int(id))
        else:
            return instance_controller.get()
    elif request.method == 'POST':        
        return instance_controller.create(request.json)
    elif request.method == 'PUT':
        return instance_controller.update(request.json)
    elif request.method == 'DELETE':
        return instance_controller.delete(id)


@api_router.route('/api/result/', methods=['GET'])
def result():    
    if request.method == 'GET':        
        return result_controller.get(request)

@api_router.route('/api/classify', methods=['POST'])
def classify():
    content = request.json
    picture = content['picture']
    part_id = content['partId']
    model = content['model']
    save = content['save']
    instance = content['instance']
    user = content['user']
    device = content['device']
    return api_controller.classify(picture, model, part_id, save, instance, user, device)
    
@api_router.route('/api/ocr', methods=['POST'])
def ocr():
    content = request.json
    return api_controller.get_ocr(content['picture'])
    
@api_router.route('/api/barcode', methods=['POST'])
def barcode():
    content = request.json
    # return api_controller.get_barcode(content['picture'])
    return api_controller.get_ocr(content['picture'])