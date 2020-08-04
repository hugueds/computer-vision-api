
from app import  app
import logging

server = '10.33.22.113'

if __name__ == '__main__':    
    logging.info('Starting Application')
    app.run(server, debug=True, ssl_context=('cert.pem', 'key.pem') )
    # app.run('0.0.0.0', debug=True, ssl_context=('example.crt', 'example.key') )
    # app.run('0.0.0.0', debug=True )