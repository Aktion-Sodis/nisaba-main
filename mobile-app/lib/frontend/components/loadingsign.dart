import 'package:flutter/material.dart';
import 'package:mobile_app/frontend/dependentsizes.dart';

Widget loadingSign(BuildContext context) => Container(
    constraints: BoxConstraints(
        maxWidth: width(context) * .1, maxHeight: width(context) * .1),
    child: CircularProgressIndicator());
