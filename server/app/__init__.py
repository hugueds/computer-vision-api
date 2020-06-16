from flask import Flask
from flask_cors import CORS, cross_origin
from routes import router, api_router

system = dict() # uptime, start time

app = Flask(__name__)
app.url_map.strict_slashes = False

app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app)
app.register_blueprint(router)
app.register_blueprint(api_router)

