import os
import zipfile
import shutil
from pathlib import Path
from werkzeug.utils import secure_filename
from flask import jsonify
from models import Instance, TFModel
import time

ALLOWED_EXTENSIONS = {'zip'}
PATH = './static/assets/models'
client_folder = f'{PATH}/client'
server_folder = f'{PATH}/server'
class InstanceModelController:

    def save(self, id_, request):
        ### Fazer update da tabela
        try:            
            file = request.files['file']
            model_type = file.filename
            instance = Instance.get_by_id(id_)
            model_name = instance.name

            folder = f'{PATH}/{model_type}'
            self.delete_folder(folder, model_name)
            self.unzip_files(file, folder, model_name)

            if model_type == 'client':                
                instance.client_model = True
            elif model_type == 'server':                
                instance.server_model = True
                TFModel.load_model_v2(model_name, folder)
                # Carregar modelo na instancia TFModel
            
            Instance.update(instance)            
            return jsonify({ "error": False, "message": "Model Saved"})

        except Exception as e:
            return jsonify({ "error": True, "message": e})


    def delete(self, id_):        
        model_type = request.form['model']
        instance = Instance.get_by_id(id_)  
        folder = folder = f'{PATH}/{model_type}'

        if instance:
            if model_type == 'client' and instance.client_model:
                self.delete_folder(folder, instance.name)
                instance.client_model = False
            elif model_type == 'server' and instance.server_model:
                self.delete_folder(folder, instance.name)
                instance.server_model = False

            Instance.update(instance)

        return jsonify({ "error": False, "message": "Model Deleted"})
        

    def delete_folder(self, path, model_name):
        dirpath = Path(path, model_name)
        if dirpath.exists() and dirpath.is_dir():
            shutil.rmtree(dirpath, ignore_errors=True)

    def unzip_files(self, file, path, model_name):
        with zipfile.ZipFile(file, 'r') as z:
                z.extractall(f'{path}/{model_name}')






instance_model_controller = InstanceModelController()