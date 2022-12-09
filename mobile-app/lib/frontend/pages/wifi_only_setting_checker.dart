import 'package:flutter/material.dart';
import 'package:mobile_app/backend/repositories/SettingsRepository.dart';
import 'package:mobile_app/frontend/components/nisaba_app_bar.dart';
import 'package:mobile_app/frontend/dependentsizes.dart';
import 'package:mobile_app/frontend/theme.dart';
import 'package:mobile_app/frontend/strings.dart' as strings;

class WifiOnlySettingChecker extends StatefulWidget {
  WifiOnlySettingChecker({Key? key, required this.child}) : super(key: key);

  final Widget child;

  @override
  State<WifiOnlySettingChecker> createState() => _WifiOnlySettingCheckerState();
}

class _WifiOnlySettingCheckerState extends State<WifiOnlySettingChecker> {
  Widget get child => widget.child;

  void _useOnlyWifi(bool value) {
    SettingsRepository.instance.wifiOnly = value;
    if (mounted) setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    if (SettingsRepository.instance.wifiOnlyRawValue == null) {
      return getRequestWifiOnlySettingPage(context);
    } else {
      return child;
    }
  }

  Widget getRequestWifiOnlySettingPage(BuildContext context) {
    return Material(
      child: ListView(
        padding: MediaQuery.of(context).padding.copyWith(
              left:
                  MediaQuery.of(context).padding.left + defaultPadding(context),
              right: MediaQuery.of(context).padding.right +
                  defaultPadding(context),
            ),
        children: [
          NisabaAppBar(
            title: strings.internetUsage,
            showBackButton: false,
          ),
          Text(strings.restrictMobileDataQuestion),
          const SizedBox(
            height: 20,
          ),
          ElevatedButton(
              style: ButtonStyle(
                  backgroundColor: MaterialStateProperty.all(ThemeColors.green),
                  padding: MaterialStateProperty.all<EdgeInsets>(
                      const EdgeInsets.all(18)),
                  shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                      RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(15.0),
                  ))),
              onPressed: () => _useOnlyWifi(true),
              child: Text(strings.useOnlyWifiButton)),
          const SizedBox(
            height: 20,
          ),
          ElevatedButton(
              style: ButtonStyle(
                  backgroundColor: MaterialStateProperty.all(ThemeColors.green),
                  padding: MaterialStateProperty.all<EdgeInsets>(
                      const EdgeInsets.all(18)),
                  shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                      RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(15.0),
                  ))),
              onPressed: () => _useOnlyWifi(false),
              child: Text(strings.useWifiAndMobileData)),
        ],
      ),
    );
  }
}
