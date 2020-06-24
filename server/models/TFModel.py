import cv2 as cv
import numpy as np
from PIL import Image
import yaml
from time import sleep
import concurrent.futures
from multiprocessing.pool import ThreadPool
from threading import Thread
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.models import load_model
from tensorflow.keras.applications.mobilenet_v2 import decode_predictions

def classify_thread(image, model, labels):

    print('Classification Process Started')    

    if model.name == 'default':        
        net = MobileNetV2(input_shape=(128, 128, 3),include_top=True,weights="imagenet")
        res = net.predict(image)
        pred = decode_predictions(res, top=1)[0][0]
        label, confidence = pred[1].upper(), round(pred[2], 2)
        res = (label, confidence)        
    else:
        net = load_model(f'tensorflow_models/{model.graph}')
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
            _, image = cv.threshold(
                image, 0, 255, cv.THRESH_BINARY | cv.THRESH_OTSU)
        else:
            image = cv.cvtColor(image, cv.COLOR_BGR2RGB)

        image = cv.resize(image, (self.size, self.size), cv.INTER_LINEAR)
        image = image / 255
        image = image.reshape(1, self.size, self.size, self.channels)

        
        # thread = Thread(target=classify_thread, args=(self, image,))
        # thread.start()
        # thread.join()        
        # print('OK!')

        
        # pool = ThreadPool(processes=1)
        # async_result = pool.apply_async(classify_thread, (self, image)) # tuple of args for foo

        # # do some other stuff in the main process
        # return_val = async_result.get()  # get the return value from your function.

        # return return_val
        
        with concurrent.futures.ThreadPoolExecutor() as executor:
            future = executor.submit(classify_thread, image, self, self.labels)
            ret = future.result()
            return {"prediction": ret[0], "confidence": ret[1] }           

        # return {"prediction": "TEST ", "confidence": 0 }

        # image = cv.resize(image, (self.size, self.size), cv.INTER_LINEAR)
        # image = image / 255
        # image = image.reshape(1, self.size, self.size, self.channels)

        # if self.name == 'default':
        #     model = MobileNetV2(input_shape=(128, 128, 3),include_top=True,weights="imagenet")
        #     res = model.predict(image)
        #     pred = decode_predictions(res, top=1)[0][0]
        #     return {"prediction": pred[1].upper(), "confidence": round(pred[2], 2)}

        # else:
        #     model = load_model(f'tensorflow_models/{self.graph}')
        #     pred = model.predict(image)        
        #     index = int(pred.argmax(axis=1)[0])        
        #     return { "prediction" : self.labels[index].upper(), "confidence" : pred[0][index] } 

