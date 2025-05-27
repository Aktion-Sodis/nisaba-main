import 'package:flutter/material.dart';
import 'package:mobile_app/frontend/common_widgets.dart';
import 'package:mobile_app/frontend/dependentsizes.dart';

class NisabaAppBar extends StatelessWidget implements PreferredSizeWidget {
  final String title;
  final bool showBackButton;

  const NisabaAppBar(
      {super.key, required this.title, this.showBackButton = true});

  @override
  Widget build(BuildContext context) {
    return Padding(
        padding: EdgeInsets.symmetric(
            horizontal: defaultPadding(context), vertical: 20),
        child: Row(
          children: [
            showBackButton ? _backButton(context) : const SizedBox.shrink(),
            if(showBackButton) SizedBox(
              width: defaultPadding(context),
            ),
            Text(
              title,
              style: const TextStyle(fontSize: 27),
            )
          ],
        ));
  }

  @override
  Size get preferredSize => const Size(double.infinity, 80);

  Widget _backButton(BuildContext context) {
    if (Navigator.canPop(context)) {
      return CommonWidgets.defaultBackwardButton(context: context,
        goBack: (){
        Navigator.pop(context);
      }
      );
    } else {
      return const SizedBox.shrink();
    }
  }
}
