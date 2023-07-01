import os
import json

from AppSyncClient import GraphqlClient

from queries.surveys import listTotalNumberOfSurveys


gql_client = GraphqlClient()

class QueryMethods:

    # TODO: done
    def get_total_number_of_surveys(self):
        res = gql_client.execute(
            query=listTotalNumberOfSurveys["query"], 
            operation_name=listTotalNumberOfSurveys["operationName"],
            variables={}
        )

        items = res["data"]["listSurveys"]["items"]
        # return the number of entries
        return len(items)