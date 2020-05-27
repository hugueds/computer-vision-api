from flask import Flask
from routes import router, api_router

system = dict() # uptime, start time

app = Flask(__name__)
app.register_blueprint(router)
app.register_blueprint(api_router)

