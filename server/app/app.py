import mimetypes
from database.Database import db
from flask import Flask, send_from_directory
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

@app.route('/', methods=['GET'])
def index():    
    return send_from_directory('../static', 'index.html')   

@app.route('/<file>', methods=['GET'])
def index_files(file):    
    return send_from_directory('../static', file)    
