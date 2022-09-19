from flask import Flask, jsonify
from flask_cors import CORS

from QueryMethods import get_intervention_types, get_intervention_categories, get_surveys, get_interventions

images = [
    {
        "img_id": 1,
        "img_src":
        "https://techmonitor.ai/wp-content/uploads/sites/4/2016/06/what-is-URL.jpg"
    },
    {
        "img_id": 2,
        "img_src":
        "https://www.dignited.com/wp-content/uploads/2018/09/url_istock_nicozorn_thumb800.jpg"
    },
    {
        "img_id": 3,
        "img_src":
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/WindparkBeltheimII_%28hochkant%29.jpg/1200px-WindparkBeltheimII_%28hochkant%29.jpg"
    },
    {
        "img_id": 4,
        "img_src":
        "https://techmonitor.ai/wp-content/uploads/sites/4/2016/06/what-is-URL.jpg"
    },
    {
        "img_id": 5,
        "img_src":
        "https://www.dignited.com/wp-content/uploads/2018/09/url_istock_nicozorn_thumb800.jpg"
    },
    {
        "img_id": 6,
        "img_src":
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/WindparkBeltheimII_%28hochkant%29.jpg/1200px-WindparkBeltheimII_%28hochkant%29.jpg"
    },
    {
        "img_id": 7,
        "img_src":
        "https://techmonitor.ai/wp-content/uploads/sites/4/2016/06/what-is-URL.jpg"
    },
    {
        "img_id": 8,
        "img_src":
        "https://www.dignited.com/wp-content/uploads/2018/09/url_istock_nicozorn_thumb800.jpg"
    },
    {
        "img_id": 9,
        "img_src":
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/WindparkBeltheimII_%28hochkant%29.jpg/1200px-WindparkBeltheimII_%28hochkant%29.jpg"
    },
    {
        "img_id": 10,
        "img_src":
        "https://techmonitor.ai/wp-content/uploads/sites/4/2016/06/what-is-URL.jpg"
    },
    {
        "img_id": 11,
        "img_src":
        "https://www.dignited.com/wp-content/uploads/2018/09/url_istock_nicozorn_thumb800.jpg"
    },
    {
        "img_id": 12,
        "img_src":
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/WindparkBeltheimII_%28hochkant%29.jpg/1200px-WindparkBeltheimII_%28hochkant%29.jpg"
    }
]

graphData = {
  "titleText": "Das ist der neue Titel",
  "xAxisTitle": "Test",
  "yAxisTitle": "Hallo Y",
  "xData": ["Apples", "Oranges", "Watermelon", "Birnen"],
  "yData": [1, 2, 1, 2],
}

# configuration
DEBUG = True

# instantiate the app
app = Flask(__name__)
app.config.from_object(__name__)
app.config['JSON_AS_ASCII'] = False

# enable CORS
CORS(app, resources={r'/*': {'origins': '*'}})


# sanity check route
@app.route('/', methods=['GET'])
def ping_pong():
    return jsonify('Home')


@app.route('/images', methods=['GET'])
def get_images():
    return jsonify({
        'data': images,
    })

@app.route('/graphdata', methods=['GET'])
def get_graphData():
    return jsonify({
        'data': graphData,
    })

@app.route('/getInterventionTypes', methods=['GET'])
def getInterventionTypes():
    interventionTypes = get_intervention_types()
    return jsonify({
        'inteventionTypes': interventionTypes
    })

# @app.route('/getInterventionCategories', methods=['GET'])
# def getInterventionCategories():
#     interventionCategories = get_intervention_categories()
#     return jsonify({
#         'interventions': interventionCategories
#     })

@app.route('/getInterventions', methods=['GET'])
def getInterventions():
    interventions = get_interventions()
    return jsonify({
        'interventions': interventions
    })

@app.route('/getSurveys', methods=['GET'])
def getSurveys():
    surveys = get_surveys()
    return jsonify({
        'surveys': surveys
    })


if __name__ == '__main__':
    app.run()
