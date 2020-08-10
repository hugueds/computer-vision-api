
from app import  app
import yaml
import logging

if __name__ == '__main__':    
    logging.info('Starting Application')

    with open('config.yml', 'r') as file:
        config = yaml.safe_load(file)

    server = config['server']['address']
    port = config['server']['port']
    ssl_context = ('cert.pem', 'key.pem')

    # Fazer o replace nos arquivos main

    app.run(server, port=port, debug=True, ssl_context=ssl_context)
    