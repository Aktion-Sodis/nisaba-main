import os

from flask import Flask, jsonify, request
from flask_cors import CORS

# from QueryMethods import (get_intervention_types, get_interventions, get_surveys, get_total_number_of_surveys, get_total_number_of_executed_surveys, get_total_number_of_executed_surveys_by_survey_id)

from QueryMethods import QueryMethods

# configuration
# DEBUG = True

# instantiate the app
application = Flask(__name__)
application.config.from_object(__name__)
application.config['JSON_AS_ASCII'] = False

# enable CORS
CORS(application, resources={r'/*': {'origins': '*'}})

query_methods = QueryMethods()

# sanity check route
@application.route('/', methods=['GET'])
def ping_pong():
    return jsonify('Home')


@application.route('/getTotalNumberOfSurveys', methods=['GET'])
def getTotalNumberOfSurveys():
    res = query_methods.get_total_number_of_surveys()
    response = jsonify({
        'res': res
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response



if __name__ == '__main__':
    application.debug = True
    application.run(port=3000)
