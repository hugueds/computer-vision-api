import os
from pathlib import Path
from datetime import datetime
from tensorflow.keras.models import load_model

from data import mockdata

class ApiController():

    def __init__(self):
        pass

    def get(self):
        pass

    def post(self):
        pass

    def index(self):
        self.counter += 1
        return 'ApiController ' + str(self.counter)
    
    def classify(self, model, save=False):
        # verificar se modelo existe                
        m = load_model('stamp_model.h5') # model = model name
        # fazer o predict
        # m.predict()
        # if save... salvar imagem no banco
        return 'ok' # { error: false, message: "", result: { label: "", confidence: 0.0 } }

    def save_picture(self, image, partNumber):        
        # Data -> Pictures -> Ano -> Mes -> Dia -> Peca -> Data_Hora_Peca yyyyMMdd_hhmmss_xxxxxxxx.jpg 640x480?                
        y, M, d = datetime.today().year, "%02d" % datetime.today().month,   "%02d" % datetime.today().day
        h, m, s = datetime.today().hour, "%02d" % datetime.today().minute,  "%02d" % datetime.today().second
        
        file_name = f'{y}{M}{d}_{h}{m}{s}_{partNumber}.jpg' # png?
        path = f'c:/Data/Pictures/{y}/{M}/{d}/{partNumber}'
        Path(path).mkdir(parents=True, exist_ok=True)

        with open(f'{path}/{file_name}', 'wb') as fh:
            fh.write(base64.b64decode(image))

        return file_name
        




api_controller = ApiController()
