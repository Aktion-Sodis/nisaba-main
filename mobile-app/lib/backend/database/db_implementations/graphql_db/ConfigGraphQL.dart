import 'dart:convert';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:graphql/client.dart';
import 'package:mobile_app/utils/amplify.dart';
import '../../../../amplifyconfiguration.dart';

class ConfigGraphQL {
  static final ConfigGraphQL _singleton = ConfigGraphQL._internal();
  factory ConfigGraphQL() => _singleton;
  ConfigGraphQL._internal();

  GraphQLClient? _client;

  GraphQLClient get client => _client!;

  String getEndpoint() {
    final config = jsonDecode(amplifyconfig) as Map<String, dynamic>;
    final apiName = dotenv.env["AMPLIFY_API_RESOURCE_NAME"]!;
    return config["api"]["plugins"]["awsAPIPlugin"][apiName]["endpoint"];
  }

  void initClient() {
    final httpLink = HttpLink(
      getEndpoint(),
      defaultHeaders: {
        'Content-Type': 'application/json',
      },
    );

    final authLink = AuthLink(
      getToken: () async => 'Bearer ${(await CognitoAuthHelper.getIdToken())}',
      headerKey: 'Authorization',
    );

    final link = Link.from([authLink, httpLink]);

    _client = GraphQLClient(
      cache: GraphQLCache(),
      link: link,
      defaultPolicies: DefaultPolicies(
        query: Policies(
          fetch: FetchPolicy.networkOnly,
          error: ErrorPolicy.all,
        ),
        mutate: Policies(
          fetch: FetchPolicy.networkOnly,
          error: ErrorPolicy.all,
        ),
      ),
    );
  }

  void closeClient() {
    _client = null;
  }
}

