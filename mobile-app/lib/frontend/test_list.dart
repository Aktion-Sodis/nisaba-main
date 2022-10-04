import 'package:flutter/material.dart';
import 'package:flutter_sound/flutter_sound.dart';
import 'package:mobile_app/frontend/dependentsizes.dart';
import 'package:mobile_app/frontend/pages/main_menu_components/main_menu_app_bar.dart';
import 'package:mobile_app/frontend/strings.dart';
import 'package:mobile_app/frontend/tests/audio_test.dart';
import 'package:mobile_app/frontend/tests/gps_test.dart';

class TestList extends StatelessWidget {
  TestList({Key? key}) : super(key: key);

  final Map<String, Widget Function()> _allTests = {
    "flutter_sound": () => AudioTest(),
    "geolocator": () => GpsTest()
  };

  Widget _itemBuilder(BuildContext context, int index) {
    if (index == 0) {
      return Wrap(
        children: [
          Column(
            children: [
              Padding(
                padding: EdgeInsets.all(defaultPadding(context)),
                child: Text(
                    "This page is only accessible, because you are in debug mode"),
              ),
              Divider()
            ],
          )
        ],
      );
    } else {
      String key = _allTests.keys.toList()[index - 1];
      if (_allTests[key] == null) return SizedBox.shrink();
      return ListTile(
        title: Text(key),
        onTap: () => Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => _allTests[key]!(),
            )),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      MainMenuAppBar(context, () {}, "Tests"),
      Expanded(
          child: Scrollbar(
        child: ListView.builder(
          itemBuilder: _itemBuilder,
          itemCount: _allTests.length + 1,
        ),
      ))
    ]);
  }
}
