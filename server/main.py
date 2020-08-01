
from app import  app
import logging

if __name__ == '__main__':    
    logging.info('Starting Application')
    # app.run('0.0.0.0', debug=True, ssl_context=('cert.pem', 'key.pem') )
    app.run('0.0.0.0', debug=True, ssl_context=('example.crt', 'example.key') )
    # app.run('0.0.0.0', debug=True )