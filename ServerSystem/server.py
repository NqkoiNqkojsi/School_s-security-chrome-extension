import asyncio
from flask import Flask, render_template, Response, make_response, request, url_for, flash, redirect, jsonify
import os
from peewee import *

#Initialize the Flask app
app = Flask(__name__, template_folder='template')
folder = os.path.join('static')
app.config['UPLOAD_FOLDER'] =folder


@app.route('/', methods=['POST'])
def runApp():
    response = jsonify(request.json)
    print(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
