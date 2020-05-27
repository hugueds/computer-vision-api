from flask import Blueprint, request, json
from controllers.HomeController import home_controller

router = Blueprint('router', __name__)

@router.route('/')
def index():
    return home_controller.index()

