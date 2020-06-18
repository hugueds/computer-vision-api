import mimetypes
from flask import Flask, send_from_directory
from flask_cors import CORS, cross_origin
from routes import router, api_router

mimetypes.add_type("application/javascript", ".js", True)

system = dict() # uptime, start time

app = Flask(__name__, static_folder='../templates', static_url_path="")

app.url_map.strict_slashes = False

app.config['CORS_HEADERS'] = 'Content-Type'
# app.register_blueprint(router)
app.register_blueprint(api_router)

CORS(app)


@app.route('/', methods=['GET'])
def index():
    # return 'Hello'
    return send_from_directory('../templates', 'index.html')
    # return send_from_directory('../test', 'index.html')
