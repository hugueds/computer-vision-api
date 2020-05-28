from flask import Blueprint, request, json
from controllers.ApiController import api_controller

api_router = Blueprint('api_router', __name__)

@api_router.route('/api/1')
def index():
    return api_controller.index()

@api_router.route('/api/2')
def test():
    return api_controller.test()

@api_router.route('/api/3')
def save():
    return api_controller.save_picture()

@api_router.route('/api/4')
def classify():
    return api_controller.classify('test')

@api_router.route('/api/ocr', methods=['POST'])
def ocr():
    content = request.json
    return api_controller.classify(content['picture'])
    