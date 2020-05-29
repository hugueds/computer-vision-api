import os
import pytesseract as pyt
from pathlib import Path
from datetime import datetime
import base64
import cv2
from PIL import Image
from models.TFModel import TFModel

pyt.pytesseract.tesseract_cmd = 'C:\\Program Files\\Tesseract-OCR\\tesseract.exe'

class ApiController:
    
    def __init__(self):
        pass    

    def index(self):
        self.counter += 1
        return "ApiController"

    def get_ocr(self, imagestring, knowledgeList=[]):

        image = imagestring.split('base64,')[-1].strip()       

        with open(f"ocr_test.png", "wb") as fh:
            fh.write(base64.b64decode(image))

        image = cv2.imread('ocr_test.png', 0)        
        _, image = cv2.threshold(image, 0, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)
        image = Image.fromarray(image)

        strings = pyt.image_to_string(image, config='--psm 6 --oem 1')
        return {
            "error": False,
            "message": "OK",
            "result" : {                
                "label": strings,
                "confidence": 'N/A'
            }

        }
        # Buscar lista de strings para modelo conhecido

    def classify(self, image, model, save=False):
        tf = TFModel(model)
        image = image.split('base64,')[-1].strip()

        with open(f"classify_test.png", "wb") as fh:
            fh.write(base64.b64decode(image))

        img_g = cv2.imread('classify_test.png')

        result = tf.predict(img_g)                
        # verificar se modelo existe
        # m = load_model('stamp_model.h5') # model = model name
        # fazer o predict
        # m.predict()
        # if save... salvar imagem no banco

        return {
            "error": False,
            "message": "OK",
            "result" : {                
                "label": result['prediction'],
                "confidence": str(round(result['confidence'], 2))
            }

        }

    def save_picture(self, image, partNumber):
        # Data -> Pictures -> Ano -> Mes -> Dia -> Peca -> Data_Hora_Peca yyyyMMdd_hhmmss_xxxxxxxx.jpg 640x480?
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

        file_name = f"{y}{M}{d}_{h}{m}{s}_{partNumber}.jpg"  # png?
        path = f"c:/Data/Pictures/{y}/{M}/{d}/{partNumber}"
        Path(path).mkdir(parents=True, exist_ok=True)

        with open(f"{path}/{file_name}", "wb") as fh:
            fh.write(base64.b64decode(image))

        return file_name


api_controller = ApiController()
