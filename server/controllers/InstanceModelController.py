import os
import zipfile
import shutil
from pathlib import Path
from werkzeug.utils import secure_filename
from flask import jsonify
from models.Instance import Instance
import time

ALLOWED_EXTENSIONS = {'zip'}
PATH = './static/assets/models'
client_folder = f'{PATH}/client'
server_folder = f'{PATH}/server'  ''
class InstanceModelController:

    def save(self, id_):        
        try:                        
            client_file = request.files['client_file']
            server_file = request.files['server_file']            

            instance = Instance.get_by_id(id_)
            model_name = instance.name         

            if client_file:
                self.delete_folder(client_folder, model_name)                
                self.unzip_files(client_file, client_folder, model_name)
                instance.client_model = True
            if server_file:
                self.delete_folder(server_folder, model_name)                
                self.unzip_files(server_file, server_folder, model_name)
                instance.server_model = True            
            
            Instance.update(instance)
            
            return jsonify({ "error": False, "message": "Model Saved"})

        except Exception as e:
            return jsonify({ "error": True, "message": e})


    def delete(self, id_):
        
        model = request.form['model']
        instance = Instance.get_by_id(id_)  

        if instance:
            if model == 'client' and instance.client_model:
                self.delete_folder(client_folder, instance.name)
                instance.client_model = False
            elif model == 'server' and instance.server_model:
                self.delete_folder(server_folder, instance.name)
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