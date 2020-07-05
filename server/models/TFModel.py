import cv2 as cv
import numpy as np
import yaml
import concurrent.futures
import logging
from time import sleep
from multiprocessing.pool import ThreadPool
from threading import Thread
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.models import load_model
from tensorflow.keras.applications.mobilenet_v2 import decode_predictions

default_net = MobileNetV2(input_shape=(224, 224, 3), include_top=True, weights="imagenet")

pre_loadnet = load_model(f'tensorflow_models/emptybox/emptybox.h5', compile=False)

def classify_thread(image, model, labels):

    logging.info('Classification Process Started')    

    if model.name == 'default':        
        # net = MobileNetV2(input_shape=(128, 128, 3),include_top=True,weights="imagenet")
        res = default_net.predict(image)
        pred = decode_predictions(res, top=1)[0][0]
        label, confidence = pred[1].upper(), round(pred[2], 2)
        res = (label, confidence)        
    else:
        # net = load_model(f'tensorflow_models/{model.graph}/{model.graph}.h5', compile=False)
        net = pre_loadnet
        pred = net.predict(image)        
        index = int(pred.argmax(axis=1)[0])        
        label, confidence = labels[index].upper(),  pred[0][index]        
        res = (label, confidence)

    return res   

class TFModel:

    def __init__(self, name):

        with open('config.yml', 'r') as f:
            config = yaml.safe_load(f)

        try:            
            c = config['models'][name]
            self.name = c['name']
            self.labels = c['labels']
            self.graph = c['graph']
            self.size = c['size']
            self.channels = c['channels']
            # self.model = load_model(f'tensorflow_models/{self.graph}')
        except Exception as ex:
            print(ex)
            print('TFModel::Invalid Model Configuration')

    def predict(self, image):

        if self.channels == 1:
            image = cv.cvtColor(image, cv.COLOR_BGR2GRAY)
            _, image = cv.threshold(image, 0, 255, cv.THRESH_BINARY + cv.THRESH_OTSU)

        image = cv.resize(image, (self.size, self.size), cv.INTER_AREA)
        image = image / 255
        image = image.reshape(1, self.size, self.size, self.channels)
        
        with concurrent.futures.ThreadPoolExecutor() as executor:
            future = executor.submit(classify_thread, image, self, self.labels)
            ret = future.result()
            return {"label": ret[0], "confidence": ret[1] }