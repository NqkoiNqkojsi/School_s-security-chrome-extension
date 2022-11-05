import asyncio
from flask import Flask, render_template, Response, make_response, request, url_for, flash, redirect, jsonify
import os
from flask_cors import CORS, cross_origin
import DBManager as DB

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


@app.route('/')
def runAdminPage():
    pass #retrieve info
    return render_template('admin.html')

@app.route('/newPeriod', methods=['POST', 'GET'])
def sendNewPeriod():
    day = request.form.get('day')
    print(request.form)
    print(day)
    startPeriod = request.form.get('startPeriod')
    endPeriod = request.form.get('endPeriod')
    grade = request.form.get('grade')
    DB.addCalendarEntry(day, startPeriod, endPeriod, grade)

@app.route('/history/')
def getHistory():
    pass


if __name__ == "__main__":
    app.run(debug=True)