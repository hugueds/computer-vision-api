import mimetypes
from database.Database import db
from flask import Flask, send_from_directory, render_template
from flask_cors import CORS, cross_origin
from routes import router, api_router

mimetypes.add_type("application/javascript", ".js", True)

db_name = 'cv_service.db' # Read from config
db.set_name(db_name)
db.create()

app = Flask(__name__, static_folder='../static', static_url_path="")

app.url_map.strict_slashes = False
app.config['CORS_HEADERS'] = 'Content-Type'
app.register_blueprint(api_router)

CORS(app)

@app.route('/model/<model>/<extension>', methods=['GET'])
def index_files(model, extension):
    folder = '../static/models/'    
    return send_from_directory(folder, f'{model}/{extension}')

@app.route('/application', methods=['GET'])
def index_redirect():    
    return send_from_directory('../static', 'index.html')   

@app.route('/', methods=['GET'])
def index():    
    return send_from_directory('../static', 'index.html')   
    

<<<<<<< HEAD
@app.route('/<model>', methods=['GET'])
def index_files(model):    
    return send_from_directory('../test', f'./{model}/')
=======
>>>>>>> 4a874623c4102355c6d5afe7d7f1c832ca09670c
