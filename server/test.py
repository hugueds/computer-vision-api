from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('hello.html')

if __name__ == '__main__':
    # app.run('10.33.22.113', port=4200, debug=True, ssl_context=('cert.pem', 'key.pem') )
    app.run('0.0.0.0', debug=True )