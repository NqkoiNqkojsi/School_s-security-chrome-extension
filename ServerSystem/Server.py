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
        startPeriod = request.args.get('startPeriod', default=0, type=str)
        endPeriod = request.args.get('endPeriod', default=0, type=str)
        grade = request.args.get('grade', default=0, type=str)
        DB.addCalendarEntry(day, startPeriod, endPeriod, grade)
    return "welp"

@app.route('/newHistory', methods=['POST', 'GET'])
def sendNewHistory():
    if request.method == 'GET':
        url = request.args.get('url', default=0, type=str)
        website = request.args.get('website', default=0, type=str)
        title = request.args.get('title', default=0, type=str)
        visitedOn = request.args.get('visitedOn', default=0, type=str)
        computerId=request.args.get('id', default=0, type=int)
        DB.addHistoryEntry(visitedOn, computerId, url, website, title)
    return "welp"
    

@app.route('/history/<int:page>', methods=['GET'])
def getHistory(page):
    return jsonify(DB.getHistoryEntries(page))

@app.route('/tryLogOut/<int:day>', methods=['GET'])
def checkIfOver(day):
    return DB.periodCheck(day)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)