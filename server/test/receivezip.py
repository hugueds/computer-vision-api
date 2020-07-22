from flask import Flask, request
from werkzeug.utils import secure_filename
import os
import zipfile
import shutil
from pathlib import Path



ALLOWED_EXTENSIONS = {'zip'}


app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = './'


@app.route('/file', methods=['GET', 'POST'])
def file():
     if request.method == 'POST':
        print('saving file')

        # verificar se o modelo é javascript ou keras

        model_name = request.form['text']
        file = request.files['file']
        filename = secure_filename(file.filename)

        # deleta a pasta        
        dirpath = Path('./tensorflow_models/', model_name)
        if dirpath.exists() and dirpath.is_dir():
            shutil.rmtree(dirpath)        

        # extrai arquivos
        with zipfile.ZipFile(file, 'r') as z:
            z.extractall(f'./tensorflow_models/{model_name}')

        # abre a pasta e renomeia o arquivo
        for file in os.listdir(f'./tensorflow_models/{model_name}'):
            if file.split('.')[-1] == 'h5':
                os.rename(f'./tensorflow_models/{model_name}/{file}', f'./tensorflow_models/{model_name}/{model_name}.h5')
        
        

        return 'File Saved'

@app.route('/', methods=['GET', 'POST'])
def index():
    return 'Save files'
   


if __name__ == '__main__':
    app.run('0.0.0.0', port=5001, debug=True)