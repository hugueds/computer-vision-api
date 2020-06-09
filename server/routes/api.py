from flask import Blueprint, request, json
from controllers.ApiController import api_controller

api_router = Blueprint('api_router', __name__)

@api_router.route('/api/device/<id>', methods=['GET', 'POST', 'PUT', 'DELETE'])
def get_device(id):
    ip = request.remote_addr
    return api_controller.get_instance(ip)

@api_router.route('/api/classify', methods=['POST'])
def classify():
    content = request.json
    return api_controller.classify(content['picture'], content['model'], content['partId'])   
    
@api_router.route('/api/ocr', methods=['POST'])
def ocr():
    content = request.json
    return api_controller.get_ocr(content['picture'])
    
@api_router.route('/api/barcode', methods=['POST'])
def ocr():
    content = request.json
    # return api_controller.get_barcode(content['picture'])
    return api_controller.get_ocr(content['picture'])