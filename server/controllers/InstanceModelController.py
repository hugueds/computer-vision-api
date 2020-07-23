import os
import zipfile
import shutil
from pathlib import Path
from werkzeug.utils import secure_filename
from flask import jsonify
from models.Instance import Instance

ALLOWED_EXTENSIONS = {'zip'}
PATH = './static/assets/models'

class InstanceModelController:

    def save(self, request):
        ### Fazer update da tabela
        try:
            
            id_ = int(request.form['id'])
            client_file = request.files['client_file']
            server_file = request.files['server_file']            

            instance = Instance.get_by_id(id_)
            model_name = instance.name            

            client_folder = f'{PATH}/client'
            server_folder = f'{PATH}/server'

            if client_file:
                self.delete_folder(client_folder, model_name)
                self.unzip_files(client_file, client_folder, model_name)
                instance.client_model = True
            if server_file:
                self.delete_folder(server_folder, model_name)
                self.unzip_files(server_file, server_folder, model_name)
                instance.server_model = True

                       

            # abre a pasta e renomeia o arquivo
            # for file in os.listdir(f'{PATH}/{model_name}'):
            #     if file.split('.')[-1] == 'h5':
            #         os.rename(f'{PATH}/{model_name}/{file}', f'{PATH}/{model_name}/{model_name}.h5')
            
            instance.save()
            
            return jsonify({ "error": False, "message": "Model Saved"})

        except Exception as e:
            return jsonify({ "error": True, "message": e})


    def delete(self):
        # Fazer update da tabela
        id_ = request.form['id']        
        
        pass

    def delete_folder(self, path, model_name):
        dirpath = Path(path, model_name)
        if dirpath.exists() and dirpath.is_dir():
            shutil.rmtree(dirpath, ignore_errors=True)

    def unzip_files(self, file, path, model_name):
        with zipfile.ZipFile(file, 'r') as z:
                z.extractall(f'{path}/{model_name}')






instance_model_controller = InstanceModelController()