import cv2 as cv
import numpy as np
from PIL import Image
import yaml
from tensorflow.keras.models import load_model

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
            self.model = load_model(f'tensorflow_models/{self.graph}')
        except Exception as ex:
            print(ex)
            print('TFModel::Invalid Model Configuration')        

    def predict(self, image):

        if self.channels == 1:
            image = cv.cvtColor(image, cv.COLOR_RGB2GRAY)
            _, image = cv.threshold(
                image, 0, 255, cv.THRESH_BINARY + cv.THRESH_OTSU)
        else:
            image = cv.cvtColor(image, cv.COLOR_BGR2RGB)

        image = cv.resize(image, (self.size, self.size), cv.INTER_AREA)
        image = image / 255
        image = image.reshape(1, self.size, self.size, self.channels)

        pred = self.model.predict(image)        
        index = int(pred.argmax(axis=1)[0])        

        return { "prediction" : self.labels[index], "confidence" : pred[0][index] } 
