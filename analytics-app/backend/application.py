import os

from flask import Flask, jsonify, request, send_file
from flask_cors import CORS

from QueryMethods import QueryMethods

from exports import excel_export_survey

import io
import xlsxwriter
import pandas as pd
import datetime

# configuration
# DEBUG = True

# instantiate the app
application = Flask(__name__)
application.config.from_object(__name__)
application.config["JSON_AS_ASCII"] = False

# enable CORS
CORS(application, resources={r"/*": {"origins": "*"}})

query_methods = QueryMethods()


# sanity check route
@application.route("/", methods=["GET"])
def ping_pong():
    return jsonify("Home")


@application.route("/getTotalNumberOfSurveys", methods=["GET"])
def getTotalNumberOfSurveys():
    res = query_methods.get_total_number_of_surveys()
    response = jsonify({"res": res})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


@application.route("/getAllSurveys", methods=["GET"])
def getAllSurveys():
    res = query_methods.get_all_surveys()
    response = jsonify({"res": res})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


@application.route("/getSurveyBySurveyID", methods=["GET", "POST"])
def getSurveyByID():
    survey_id = request.args.get("SurveyID")
    res = query_methods.get_survey_by_surveyID(survey_id)
    response = jsonify({"res": res})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


@application.route("/getSurveyDataBySurveyID", methods=["GET", "POST"])
def getSurveyDataBySurveyID():
    survey_id = request.args.get("SurveyID")
    res = query_methods.get_survey_data_by_surveyID(survey_id)
    response = jsonify({"res": res})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


@application.route("/getLevels", methods=["GET", "POST"])
def getLevels():
    res = query_methods.get_levels()
    response = jsonify({"res": res})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


@application.route("/getEntities", methods=["GET", "POST"])
def getEntities():
    # data = request.get_json()
    # print(data)
    res = query_methods.get_entities()
    response = jsonify({"res": res})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@application.route('/getSurveyResultsAsXLSX', methods=['GET', 'POST'])
def getSurveyResultsAsXLSX():
    survey_id = request.args.get("SurveyID")
    survey_question_frame, executed_survey_frame = excel_export_survey.get_excel_workbook_for_survey_id(query_methods, survey_id)

    output = io.BytesIO()

    #create workbook and write in two sheets
    writer = pd.ExcelWriter(output, engine='xlsxwriter')

    survey_question_frame.to_excel(writer, sheet_name='survey')
    executed_survey_frame.to_excel(writer, sheet_name='answers')

    writer.close()
    
    attachment_name = 'results_' + survey_id + '_' + str(datetime.datetime.now()) + '.xlsx'

    output.seek(0)

    response =  send_file(output, download_name=attachment_name, as_attachment=False)
    response.headers.add('Access-Control-Allow-Origin', '*')
    print('response:')
    print(str(response))
    print(str(response.headers))
    print('file size from buffer length: ' + str(len(output.getvalue())))
    print('now returns response')
    return response


# @application.route('/getExecutedSurveysBySurveyID', methods=['GET', 'POST'])
# def getExecutedSurveysBySurveyID():
#     survey_id = request.args.get("SurveyID")
#     res = query_methods.get_executed_surveys_by_surveyID(survey_id)

#     response = jsonify({
#         'res': res
#     })
#     response.headers.add('Access-Control-Allow-Origin', '*')
#     return response


if __name__ == "__main__":
    application.debug = True
    application.run(port=3000)
    # application.run(ssl_context="adhoc")
