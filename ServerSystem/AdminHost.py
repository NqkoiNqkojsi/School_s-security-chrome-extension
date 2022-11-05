from flask import Flask, render_template, Response, make_response, request, url_for, flash, redirect, jsonify
import os

from flask_cors import CORS, cross_origin

#Initialize the Flask app
app = Flask(__name__, template_folder='template')
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/data/', methods=['POST'])
def runApp():
    print(request.json)
    response = jsonify(request.json)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


if __name__ == "__main__":
    app.run(debug=True)