import os

from flask import Flask, jsonify, request
from flask_cors import CORS

from QueryMethods import QueryMethods

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
