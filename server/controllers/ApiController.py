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

    MAX_TEMP_FILES = 10
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

    def classify(self, image, model, partId, save=False):

        temp_file = f'temp/classify_test_{str(self.temp_file_counter)}.png'
        self.update_temp()

        image_path = ''

        tf = TFModel(model)
        image = image.split('base64,')[-1].strip()

        with open(temp_file, "wb") as fh:
            fh.write(base64.b64decode(image))

        if save:
            image_path = self.save_picture(image)

        img_g = cv2.imread(temp_file)
        result = tf.predict(img_g)

        return {
            "error": False,
            "message": "OK",
            "content": {
                "result": result['prediction'],
                "confidence": str(round(result['confidence'], 2)),
                "imagePath": image_path
            }
        }

    def save_picture(self, image, partId="_not_provided"):
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

        file_name = f"{y}{M}{d}_{h}{m}{s}_{partId}.png"  # png?
        path = f"c:/Data/Pictures/{y}/{M}/{d}/{partId}"
        Path(path).mkdir(parents=True, exist_ok=True)

        try:
            with open(f"{path}/{file_name}", "wb") as fh:
                fh.write(base64.b64decode(image))
            print(f'Picture saved at: {path}/{file_name}')
        except Exception as e:
            print(str(e))

        return f'{path}/{file_name}'

    def update_temp(self):
        self.temp_file_counter += 1
        if self.temp_file_counter > self.MAX_TEMP_FILES:
            self.temp_file_counter = 0

api_controller = ApiController()


# return json.dumps(default=lambda x: getattr(x, '__dict__', str(x)))
