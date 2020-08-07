import os
import cv2
import base64
import logging
import pytesseract as pyt
import numpy as np
import yaml
from flask import jsonify
from pathlib import Path
from datetime import datetime
from PIL import Image
from models import Instance, Device, Result, TFModel
from sys import platform

class ApiController:   
    
    def __init__(self):
        try:
            with open('config.yml', 'r') as f:
                config = yaml.safe_load(f)
            
            if platform == 'linux' or platform == 'linux2':
                self.image_save_path = config['server']['image_save_path_linux']
                pyt.pytesseract.tesseract_cmd = config['server']['pytesseract_path_linux']
            else:
                self.image_save_path = config['server']['image_save_path']
                pyt.pytesseract.tesseract_cmd = config['server']['pytesseract_path']

        except Exception as e:
            logging.error('APIController::' + str(e))

    def index(self):
        return "ApiController"    

    def get_ocr(self, base64_image, knowledgeList=[]):        

        image_path = ''
        image = base64_image.split('base64,')[-1].strip()        

        image = cv2.imread('ocr_test.png', 0)
        _, image = cv2.threshold(
            image, 0, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)
        image = Image.fromarray(image)

        strings = pyt.image_to_string(image, config='--psm 6 --oem 1')
        
        return {
            "error": False,
            "message": "OK",
            "result": {
                "label": strings,
                "confidence": 100
            },
            "imagePath": image_path
        }
        # Buscar lista de strings para modelo conhecido

    def classify(self, content):
        
        base64_image = content['picture']
        identifier = 'not_defined' if content['partId'] == 1 else content['partId'] 
        model = content['model']
        save = content['save']        
        user = content['user']
        device = content['device']
               
        image = data_uri_to_cv2_img(base64_image)

        image_path = ''
        file_name = ''

        tf = TFModel(model)    
        prediction = tf.predict(image)
        h, w = image.shape[:2]        
        
        if save:
            image_path  = get_picture_path(self.image_save_path, model, identifier)
            file_name = image_path.split('/')[-1]
            image[int(h*0.90):,:,:] = 0 # Creates a black stripe at the bottom of the image
            font = cv2.FONT_HERSHEY_SIMPLEX
            cv2.putText(image, f'{prediction["label"]}', ( int(w*0.01), int(h*0.95) ), font, w/1000, (0,217,217), 1)
            cv2.putText(image, f'{ file_name }',      ( int(w*0.01), int(h*0.99)), font, w/1000, (0,217,217), 1)
            cv2.imwrite(image_path, image)        

        result = Result(
            user = user,
            device = device,
            instance = model,
            path = image_path,
            label = prediction['label'],
            confidence = round(prediction['confidence'], 2)
        )
        result.save()

        return jsonify({
            "error": False,
            "message": "OK",
            "content": {
                "label": prediction['label'],
                "confidence": (round(prediction['confidence'],2)),
                "imagePath": image_path,
                "identifier": identifier
            }
        })    

def data_uri_to_cv2_img(uri):
    image_string = uri.split('base64,')[-1].strip()    
    nparr = np.fromstring(base64.b64decode(image_string), np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    return img

def get_picture_path(path, model, identifier):

    # year Month day hour minute second
    y, M, d, h, m, s = (
        datetime.today().year,
        "%02d" % datetime.today().month,
        "%02d" % datetime.today().day,
        "%02d" % datetime.today().hour,
        "%02d" % datetime.today().minute,
        "%02d" % datetime.today().second,
    )

    file_name = f"{y}{M}{d}_{h}{m}{s}_{identifier}.jpg"    
    path = f"{path}/{model}/{y}/{M}/{d}/{identifier}"
    
    Path(path).mkdir(parents=True, exist_ok=True)

    return f'{path}/{file_name}'        


api_controller = ApiController()
