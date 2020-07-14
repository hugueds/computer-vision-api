
from app import  app
import logging

if __name__ == '__main__':    
    logging.info('Starting Application')
    app.run('10.33.22.113', debug=True, ssl_context=('cert.pem', 'key.pem') )
    # app.run('0.0.0.0', debug=True )