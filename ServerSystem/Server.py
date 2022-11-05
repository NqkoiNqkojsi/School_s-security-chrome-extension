from flask import Flask, render_template, Response, make_response, request, url_for, flash, redirect, jsonify
import os
from flask_cors import CORS, cross_origin
import DBManager as DB
import json

#Initialize the Flask app

app = Flask(__name__, template_folder='template')
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/data', methods=['POST'])
def runApp():
    print(request.json)
    response = jsonify(request.json)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/', methods=['GET', 'POST'])
def runAdminPage():
    return render_template('admin.html')

@app.route('/newPeriod', methods=['POST', 'GET'])
def sendNewPeriod():
    if request.method == 'GET':
        day = request.args.get('day', default=0, type=int)
        startPeriod = request.args.get('startPeriod', default=0, type=int)
        endPeriod = request.args.get('endPeriod', default=0, type=int)
        grade = request.args.get('grade', default=0, type=str)
        DB.addCalendarEntry(day, startPeriod, endPeriod, grade)
    return "welp"
    

@app.route('/history', methods=['GET'])
def getHistory():
    if request.method == 'GET':
        page = request.args.get('page', default=0, type=int)
        return jsonify(DB.getHistoryEntries(page))
    return jsonify(DB.getHistoryEntries(1))


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)