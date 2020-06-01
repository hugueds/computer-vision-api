from flask import Blueprint, request, json, render_template, send_from_directory
from controllers.HomeController import home_controller

router = Blueprint('router', __name__)

@router.route('/')
def index():
    return send_from_directory('./../templates/', 'index.html')
    

