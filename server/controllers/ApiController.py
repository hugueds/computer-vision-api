import os
import cv2
import base64
import pytesseract as pyt
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
    IMAGE_PATH = 'C:\Pictures'  # TODO: Colocar no config ou .env
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

    def classify(self, image, model, part_id="not_provided", save=False, instance="", user="", device=""):

        temp_file = f'temp/classify_test_{str(self.temp_file_counter)}.png'
        self.update_temp()

        image_path = ''

        tf = TFModel(model)
        image = image.split('base64,')[-1].strip()

        with open(temp_file, "wb") as fh:
            fh.write(base64.b64decode(image))

        if save:            
            image_path, file_name = self.get_picture_path(image, part_id)

        img_g = cv2.imread(temp_file)
        result = tf.predict(img_g)
        cv2.putText(img_g, f'{ file_name } - {result["prediction"]} ', ( int(640*0.01), int(480*0.98) ), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0,220,50), 1)
        cv2.imwrite(image_path, img_g)

        Result(
            user = user,
            device= device,
            instance=instance,
            file_path=image_path,
            label= result['prediction'],
            probability=str(round(result['confidence'], 2))).save()

        return {
            "error": False,
            "message": "OK",
            "content": {
                "result": result['prediction'],
                "confidence": str(round(result['confidence'], 2)),
                "imagePath": image_path
            }
        }

    def get_picture_path(self, image, part_id):
        # Data/Pictures/Ano/Mes/Dia/Identificacao -> Data_Hora_PartId yyyyMMdd_hhmmss_xxxx.png
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
        path = f"c:/Data/Pictures/{y}/{M}/{d}/{part_id}"
        Path(path).mkdir(parents=True, exist_ok=True)

        return [f'{path}/{file_name}', file_name]

    def update_temp(self):
        self.temp_file_counter += 1
        if self.temp_file_counter > self.MAX_TEMP_FILES:
            self.temp_file_counter = 0

    def save_results(self):
        r = Result()
        r.save()
        



api_controller = ApiController()
