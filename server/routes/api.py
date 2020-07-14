from flask import Blueprint, request, json
from controllers import api_controller
from controllers import device_controller
from controllers import instance_controller
from controllers import result_controller

api_router = Blueprint('api_router', __name__)

@api_router.route('/api/device/ip', methods=['GET'])
def device_by_ip():
    ip = request.remote_addr
    return device_controller.get_by_ip(ip)

@api_router.route('/api/device/', methods=['GET', 'POST', 'PUT', 'DELETE'], defaults={'id_': None})
@api_router.route('/api/device/<id_>/', methods=['GET', 'POST', 'PUT', 'DELETE'])
def device(id_):
    if request.method == 'GET':
        if id_:
            return device_controller.get_by_id(id_)
        else:
            return device_controller.get()
    elif request.method == 'POST':
        return device_controller.create(request.json)
    elif request.method == 'PUT':
        return device_controller.update(request.json)
    elif request.method == 'DELETE':
        return device_controller.delete(id_)


@api_router.route('/api/instance/', methods=['GET', 'POST', 'PUT', 'DELETE'], defaults={'id_': 0})
@api_router.route('/api/instance/<id_>/', methods=['GET', 'POST', 'PUT', 'DELETE'])
def instance(id_):
    if request.method == 'GET':
        if id_:
            return instance_controller.get_by_id(int(id))
        else:
            return instance_controller.get()
    elif request.method == 'POST':
        return instance_controller.create(request.json)
    elif request.method == 'PUT':
        return instance_controller.update(request.json)
    elif request.method == 'DELETE':
        return instance_controller.delete(id_)


@api_router.route('/api/result/', methods=['GET'])
def result():
    if request.method == 'GET':
        return result_controller.get(request)


@api_router.route('/api/classify/', methods=['POST'])
def classify():
    return api_controller.classify(request.json)


@api_router.route('/api/ocr/', methods=['POST'])
def ocr():
    content = request.json
    return api_controller.get_ocr(content['picture'])


@api_router.route('/api/barcode/', methods=['POST'])
def barcode():
    content = request.json
    return api_controller.get_ocr(content['picture'])

@api_router.route('/api/system/', methods=['GET'])
def system():    
    return True