import os

from flask import Flask, jsonify, request
from flask_cors import CORS

from QueryMethods import get_intervention_types
from QueryMethods import get_surveys
from QueryMethods import get_interventions
from QueryMethods import aggregate_survey_data

# configuration
# DEBUG = True

# instantiate the app
application = Flask(__name__)
application.config.from_object(__name__)
application.config['JSON_AS_ASCII'] = False

# enable CORS
# CORS(application, resources={r'/*': {'origins': '*'}})


# sanity check route
@application.route('/', methods=['GET'])
def ping_pong():
    return jsonify('Home')

@application.route('/getInterventionTypes', methods=['GET'])
def getInterventionTypes():
    interventionTypes = get_intervention_types()
    response = jsonify({
        'inteventionTypes': interventionTypes
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@application.route('/getInterventions', methods=['GET'])
def getInterventions():
    interventions = get_interventions()
    response = jsonify({
        'interventions': interventions
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@application.route('/getSurveys', methods=['GET'])
def getSurveys():
    surveys = get_surveys()
    response = jsonify({
        'surveys': surveys
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@application.route('/getExecutedSurveysByID', methods=['GET', 'POST'])
def getExecutedSurveysByID():
    survey_id = request.args.get("SurveyID")
    print(survey_id)
    survey_id ="6b3175ea-e2b8-44a9-9836-99e71c2001ac"
    executedSurveys = aggregate_survey_data(survey_id)
    response = jsonify({
        'executedSurveys': executedSurveys
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


if __name__ == '__main__':
    application.debug = True
    application.run(port=3000)
