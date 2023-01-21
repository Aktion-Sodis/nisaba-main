import os
import simplejson
import json

from urllib import request
from datetime import datetime

from collections import defaultdict

from dotenv import load_dotenv

from flask import request as flask_request

load_dotenv()

# Benötigte Queries für Surveys
# 1. Query für alle vorhandenen Tags
# 2. Alle Interventions zu jeweiligem Tag
# 3. Alle Surveys zu jeweiliger Intervention
# 4. Für ausgewählte Survey alle enthaltenen Fragen
# 5. Für jeweilige Frage alle excecuted Survey Daten abrufen und auswerten



class GraphqlClient:

    @staticmethod
    def serialization_helper(o):
        if isinstance(o, datetime):
            return o.strftime('%Y-%m-%dT%H:%M:%S.000Z')

    def execute(self, query, operation_name, variables):
        headers = {"Authorization": flask_request.headers.get("Authorization")}
        endpoint = flask_request.args.get("endpoint")

        data = simplejson.dumps({
            "query": query,
            "variables": variables,
            "operationName": operation_name
        },
            default=self.serialization_helper,
            ignore_nan=True
        )
        r = request.Request(
            headers=headers,
            url=endpoint,
            method='POST',
            data=data.encode('utf8')
        )
        response = request.urlopen(r).read()
        return json.loads(response.decode('utf8'))
