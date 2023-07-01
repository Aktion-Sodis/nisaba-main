import os
import simplejson
import json

from urllib import request
from datetime import datetime

from flask import request as flask_request


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
