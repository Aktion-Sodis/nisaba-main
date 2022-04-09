import 'package:flutter/material.dart';
import 'package:mobile_app/frontend/components/loadingsign.dart';
import 'package:mobile_app/frontend/dependentsizes.dart';

class LoadingView extends StatelessWidget {
  const LoadingView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: Center(
            child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
          Container(
              width: width(context) * .7,
              child: Image.asset("assets/fixAssets/nisaba_logo.png")),
          SizedBox(height: height(context) * .15),
          loadingSign(context)
        ])));
  }
}
