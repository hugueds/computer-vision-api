from flask import send_from_directory
from app import app

# @app.route('/', methods=['GET'])
# def index():
#     # return 'Hello'
#     return send_from_directory('templates', 'index.html')


if __name__ == '__main__':    
    app.run('10.33.22.113', debug=True, ssl_context=('cert.pem', 'key.pem') )
    # app.run('0.0.0.0', debug=True )