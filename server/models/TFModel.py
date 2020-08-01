import cv2 as cv
import numpy as np
import yaml
import os
import concurrent.futures
import logging
from time import sleep
from multiprocessing.pool import ThreadPool
from threading import Thread
if True:
    from tensorflow.keras.applications import MobileNetV2
    from tensorflow.keras.models import load_model
    from tensorflow.keras.applications.mobilenet_v2 import decode_predictions
    # default_net = MobileNetV2(input_shape=(224, 224, 3), include_top=True, weights="imagenet")
    # pre_loadnet = load_model(f'tensorflow_models/emptybox/emptybox.h5', compile=False)

<<<<<<< HEAD
default_net = MobileNetV2(input_shape=(224, 224, 3), include_top=True, weights="imagenet")
# pre_loadnet = load_model(f'tensorflow_models/emptybox/emptybox.h5', compile=False)
=======
models = {}
loaded = False
>>>>>>> 4a874623c4102355c6d5afe7d7f1c832ca09670c

def classify_thread(image, model):

    logging.info('Classification Process Started for model ' + model)     
    prediction = {
        'label':  '',
        'confidence': 0.0
    }

    net = models[model]['graph']

    if model == 'default':
        res = net.predict(image)
        pred = decode_predictions(res, top=1)[0][0]
        prediction['label'] = pred[1].upper()
        prediction['confidence'] = float(round(pred[2], 2))
    else:
        pred = net.predict(image)        
        index = int(pred.argmax(axis=1)[0])        
        prediction['label'] = models[model]['labels'][index].upper()
        prediction['confidence'] = float(round(pred[0][index], 2))

    return prediction

class TFModel: 

    def __init__(self, name):       
        try:            
            with open('config.yml', 'r') as f:
                config = yaml.safe_load(f)
                
            c = config['models'][name]
            self.model_name = name
            self.name = c['name']
            self.labels = c['labels']
            self.graph = c['graph']
            self.size = c['size']
            self.channels = c['channels']            
            self.path = config['models']['path']
            self.default_graph_file = config['models']['graph_file']
            # self.model = load_model(f'tensorflow_models/{self.graph}')
            self.load_models()
        except Exception as ex:            
            logging.error('TFModel __init__::Invalid Model Configuration::'+str(ex))

    def predict(self, image):

        if self.channels == 1:
            image = cv.cvtColor(image, cv.COLOR_BGR2GRAY)
            _, image = cv.threshold(image, 0, 255, cv.THRESH_BINARY + cv.THRESH_OTSU)

        image = cv.cvtColor(image, cv.COLOR_BGR2RGB)
        image = cv.resize(image, (self.size, self.size), cv.INTER_AREA)
        image = image / 255
        image = image.reshape(1, self.size, self.size, self.channels)
        
        with concurrent.futures.ThreadPoolExecutor() as executor:
            # future = executor.submit(classify_thread, image, self, self.labels)
            future = executor.submit(classify_thread, image, self.model_name)
            return future.result()

    def load_models(self):        
        global models

        if not 'default' in models:
            print('Loading Default Model')
            models['default'] = { 'labels': [], 'graph': MobileNetV2(input_shape=(224, 224, 3), include_top=True, weights="imagenet") }
        
        for model_name in os.listdir(self.path):
            if not model_name in models:
                for file in os.listdir(f'{self.path}/{model_name}'):                
                    if file == self.default_graph_file:
                        # logging.info('Loading Model: ' + model_name)
                        print('Loading Model: ' + model_name)
                        labels = []
                        label_file = open('labels.txt', 'r')
                        for line in label_file:
                            labels.append(line.split(' ')[-1])
                        label_file.close()
                        models[model_name] = {                         
                            'graph': load_model(f'{self.path}/{model_name}/{self.default_graph_file}', compile=False),
                            'labels': labels
                        }              

    def load_model(self, model_name, path, filename='keras_model.h5'):
        global models
        labels = []
        label_file = open(f'{path}/{model_name}/labels.txt', 'r')
        for line in label_file:
            labels.append(line.split(' ')[-1])
        label_file.close()
        models[model_name] = { 'labels': labels, 'graph': load_model(f'{path}/{model_name}/{filename}', compile=False)}

    @staticmethod
    def load_model_v2(model_name, path, filename='keras_model.h5'):
        global models
        labels = []
        label_file = open(f'{path}/{model_name}/labels.txt', 'r')
        for line in label_file:
            labels.append(line.split(' ')[-1])
        label_file.close()
        models[model_name] = { 'labels': labels, 'graph': load_model(f'{path}/{model_name}/{filename}', compile=False)}

def reload_model(model_name):
    pass                             


            