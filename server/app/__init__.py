import mimetypes
from flask import Flask, send_from_directory
from flask_cors import CORS, cross_origin
from routes import router, api_router

mimetypes.add_type("application/javascript", ".js", True)

system = dict() # uptime, start time

# app = Flask(__name__, static_folder='../templates', static_url_path="")
app = Flask(__name__, static_folder='../static', static_url_path="")

app.url_map.strict_slashes = False

app.config['CORS_HEADERS'] = 'Content-Type'
app.register_blueprint(api_router)

CORS(app)

@app.route('/', methods=['GET'])
def index():    
    return send_from_directory('../static', 'index.html')   

@app.route('/<file>', methods=['GET'])
def index_files(file):
    print(file)
    return send_from_directory('../static', file)    

# # download the content from this folder
# @app.route('/static/<file>/', methods=['GET'])
# def index2(file):    
#     print(file)
#     path = ''
#     return send_from_directory('../tensorflow_models', 'emptybox/' + 'model.json')
    
