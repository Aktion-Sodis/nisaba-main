import 'package:amplify_flutter/amplify_flutter.dart';
import 'package:flutter/material.dart';
import 'package:mobile_app/frontend/dependentsizes.dart';

class AmplifyCognitoTest extends StatelessWidget {
  const AmplifyCognitoTest({Key? key}) : super(key: key);

  Future<void> _getOrganizationID() async {
    final userAttributes = await Amplify.Auth.fetchUserAttributes();
    final organizationID = userAttributes.firstWhere(
        (element) => element.userAttributeKey.key == "custom:organization_id");
    print("Get organization ID: " + organizationID.value);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: const Text("Test of Amplify Cognito"),
        ),
        body: Scrollbar(
          child: ListView(
            padding: EdgeInsets.all(defaultPadding(context)),
            children: [
              ElevatedButton(
                onPressed: _getOrganizationID,
                child: const Text("Open session"),
              ),
            ],
          ),
        ));
  }
}
