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
CORS(application, resources={r'/*': {'origins': '*'}})


# sanity check route
@application.route('/', methods=['GET'])
def ping_pong():
    return jsonify('Home')

@application.route('/getInterventionTypes', methods=['GET'])
def getInterventionTypes():
    interventionTypes = get_intervention_types()
    return jsonify({
        'inteventionTypes': interventionTypes
    })

@application.route('/getInterventions', methods=['GET'])
def getInterventions():
    interventions = get_interventions()
    return jsonify({
        'interventions': interventions
    })

@application.route('/getSurveys', methods=['GET'])
def getSurveys():
    surveys = get_surveys()
    return jsonify({
        'surveys': surveys
    })

@application.route('/getExecutedSurveysByID', methods=['GET'])
def getExecutedSurveysByID():
    survey_id = request.args.get("SurveyID")
    executedSurveys = aggregate_survey_data(survey_id)
    return jsonify({
        'executedSurveys': executedSurveys
    })


if __name__ == '__main__':
    application.debug = True
    application.run()
