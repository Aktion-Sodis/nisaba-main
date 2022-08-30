import os
import simplejson
import json

from urllib import request
from datetime import datetime

from collections import defaultdict

from dotenv import load_dotenv

load_dotenv()

# Benötigte Queries für Surveys
# 1. Query für alle vorhandenen Tags
# 2. Alle Interventions zu jeweiligem Tag
# 3. Alle Surveys zu jeweiliger Intervention
# 4. Für ausgewählte Survey alle enthaltenen Fragen
# 5. Für jeweilige Frage alle excecuted Survey Daten abrufen und auswerten



class GraphqlClient:

    def __init__(self, endpoint, headers):
        self.endpoint = endpoint
        self.headers = headers

    @staticmethod
    def serialization_helper(o):
        if isinstance(o, datetime):
            return o.strftime('%Y-%m-%dT%H:%M:%S.000Z')

    def execute(self, query, operation_name, variables):
        data = simplejson.dumps({
            "query": query,
            "variables": variables,
            "operationName": operation_name
        },
            default=self.serialization_helper,
            ignore_nan=True
        )
        r = request.Request(
            headers=self.headers,
            url=self.endpoint,
            method='POST',
            data=data.encode('utf8')
        )
        response = request.urlopen(r).read()
        return json.loads(response.decode('utf8'))
