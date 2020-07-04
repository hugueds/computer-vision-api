from flask import Flask, render_template, send_from_directory
import mimetypes

mimetypes.add_type("application/javascript", ".js", True)

app = Flask(__name__, static_folder='templates', static_url_path="")

@app.route('/', methods=['GET'])
def index():    
    return send_from_directory('./templates', 'index.html')
    # return render_template('index.html')

if __name__ == '__main__':
    app.run('10.33.22.113', port=5000, debug=True, ssl_context=('cert.pem', 'key.pem') )
    # app.run('0.0.0.0', debug=True )