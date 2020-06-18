from flask import Blueprint, request, json, render_template, send_from_directory


router = Blueprint('router', __name__, static_folder='templates', static_url_path="")

@router.route('/',  methods=['GET'])
def index():
    return send_from_directory('./templates', 'index.html')
    

