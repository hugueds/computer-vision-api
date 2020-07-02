import os
import cv2
import base64
import pytesseract as pyt
import numpy as np
from pathlib import Path
from datetime import datetime
from PIL import Image
from models.Instance import Instance
from models.Device import Device
from models.Result import Result
from models.TFModel import TFModel

pyt.pytesseract.tesseract_cmd = 'C:\\Program Files\\Tesseract-OCR\\tesseract.exe' # TODO: Colocar no config ou .env

class ApiController:

    MAX_TEMP_FILES = 10
    IMAGE_PATH = r'\\\\10.33.22.113/Data'  # TODO: Colocar no config ou .env
    temp_file_counter = 0

    def __init__(self):
        pass

    def index(self):
        self.counter += 1
        return "ApiController"
    

    def get_ocr(self, imagestring, knowledgeList=[]):

        temp_file = f"temp/ocr_test_{str(self.temp_file_counter)}.png"
        self.update_temp()

        image_path = ''

        image = imagestring.split('base64,')[-1].strip()

        with open(temp_file, "wb") as fh:
            fh.write(base64.b64decode(image))

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

    def classify(self, image, model, part_id="", save=False, instance="", user="", device=""):

        if part_id == '':
            part_id = 'not_defined'

        temp_file = f'temp/classify_test_{str(self.temp_file_counter)}.png'
        self.update_temp()
                
        img = data_uri_to_cv2_img(image)      

        image_path = ''
        if save:
            image_path, file_name = get_picture_path(image, part_id)

        tf = TFModel(model)    
        result = tf.predict(img)
        h, w = img.shape[:2]        
        
        img[int(h*0.90):,:,:] = 0
        cv2.putText(img, f'{result["label"]} ', ( int(w*0.01), int(h*0.95) ), cv2.FONT_HERSHEY_SIMPLEX, w/1000, (0,217,217), 1)
        cv2.putText(img, f'{ file_name }',      ( int(w*0.01), int(h*0.99)),  cv2.FONT_HERSHEY_SIMPLEX, w/1000, (0,217,217), 1)
        cv2.imwrite(image_path, img)

        Result(
            user = user,
            device= device,
            instance=instance,
            file_path=image_path,
            label= result['label'],
            confidence=str(round(result['confidence'], 2))
        ).save()

        return {
            "error": False,
            "message": "OK",
            "content": {
                "result": result['label'],
                "confidence": str(round(result['confidence'], 2)),
                "imagePath": image_path
            }
        }    

    def update_temp(self):
        self.temp_file_counter += 1
        if self.temp_file_counter > self.MAX_TEMP_FILES:
            self.temp_file_counter = 0

def data_uri_to_cv2_img(uri):
    image_string = uri.split('base64,')[-1].strip()    
    nparr = np.fromstring(base64.b64decode(image_string), np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    return img

def get_picture_path(image, part_id):

    y, M, d = (
        datetime.today().year,
        "%02d" % datetime.today().month,
        "%02d" % datetime.today().day,
    )

    h, m, s = (
        datetime.today().hour,
        "%02d" % datetime.today().minute,
        "%02d" % datetime.today().second,
    )

    file_name = f"{y}{M}{d}_{h}{m}{s}_{part_id}.png"  # png?
    # Data/Pictures/Ano/Mes/Dia/Identificacao -> Data_Hora_PartId yyyyMMdd_hhmmss_xxxx.png
    path = f"\\\\10.33.22.113/Data/Pictures/{y}/{M}/{d}/{part_id}"
    Path(path).mkdir(parents=True, exist_ok=True)

    return [f'{path}/{file_name}', file_name]
        



api_controller = ApiController()
