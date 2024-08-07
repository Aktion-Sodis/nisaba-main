import 'dart:convert';

import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:graphql/client.dart';
import 'package:mobile_app/utils/amplify.dart';

import '../../../../amplifyconfiguration.dart';

class ConfigGraphQL {
  // Singleton
  static final ConfigGraphQL _singleton = ConfigGraphQL._internal();
  factory ConfigGraphQL() {
    return _singleton;
  }
  ConfigGraphQL._internal();

  GraphQLClient? _client;

  GraphQLClient? get client => _client;

  String getEndpoint() {
    try {
      Map<String, dynamic> config = jsonDecode(amplifyconfig);
      String endpoint = config["api"]["plugins"]["awsAPIPlugin"]
          [dotenv.env["AMPLIFY_API_RESOURCE_NAME"]]["endpoint"];

      return endpoint;
    } catch (e) {
      throw const FormatException(
          "Config file does not fit the format used in this app. Please, check if AMPLIFY_API_RESOURCE_NAME is correct. Otherwise, the problem can be that Amplify updated the format of the config file.");
    }
  }

  void closeClient() {
    _client = null;
  }

  void initClient() {
    final _httpLink = HttpLink(
      getEndpoint(),
    );

    print('endpoint_Link: $_httpLink');

    final _authLink = AuthLink(
      getToken: () {
        return CognitoOIDCAuthProvider.fetchAndRememberAuthToken();
      },
    );

    print('authLink: $_authLink');

    Link _link = _authLink.concat(_httpLink);

    print('endpoint link graphql: ${_link}');

    /// subscriptions must be split otherwise `HttpLink` will. swallow them
    /*if (websocketEndpoint != null) {
      final _wsLink = WebSocketLink(websockeEndpoint);
      _link = Link.split((request) => request.isSubscription, _wsLink, _link);
    }*/

    _client = GraphQLClient(
      /// **NOTE** The default store is the InMemoryStore, which does NOT persist to disk
      cache: GraphQLCache(
        partialDataPolicy: PartialDataCachePolicy.accept,
      ),
      defaultPolicies: DefaultPolicies(
        watchQuery: Policies(
          fetch: FetchPolicy.noCache,
          error: ErrorPolicy.all,
        ),
        query: Policies(
          fetch: FetchPolicy.noCache,
          error: ErrorPolicy.all,
        ),
        mutate: Policies(
          fetch: FetchPolicy.noCache,
          error: ErrorPolicy.all,
        ),
      ),
      link: _link,
    );
    print('graph ql client initialized');
  }
}
