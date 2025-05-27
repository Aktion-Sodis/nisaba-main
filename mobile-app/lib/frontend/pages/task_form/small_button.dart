import 'package:flutter/material.dart';
import 'package:mobile_app/frontend/theme.dart';

class SmallButton extends StatelessWidget {
  const SmallButton(
      {required this.iconData,
      required this.text,
      required this.onPressed,
      this.selected = false,
      super.key,
      this.outlinedWhenSelected = false,
      this.keepClickable = false});

  final IconData iconData;
  final String text;
  final Function() onPressed;
  final bool selected;
  final bool outlinedWhenSelected;
  final bool keepClickable;

  @override
  Widget build(BuildContext context) {
    Color textColor =
        selected && !outlinedWhenSelected ? Colors.white : ThemeColors.black;
    Color backgroundColor =
        selected && !outlinedWhenSelected ? ThemeColors.red : Colors.white;
    BorderSide borderSide = selected && outlinedWhenSelected
        ? BorderSide(color: ThemeColors.red, width: 3)
        : BorderSide.none;

    return ElevatedButton(
        onPressed: selected && !keepClickable ? null : onPressed,
        style: ButtonStyle(
            padding: WidgetStateProperty.all(const EdgeInsets.only(
                left: 15, right: 20, top: 10, bottom: 10)),
            backgroundColor: WidgetStateProperty.all(backgroundColor),
            shape: WidgetStateProperty.all<OutlinedBorder>(
                RoundedRectangleBorder(
                    side: borderSide,
                    borderRadius: BorderRadius.circular(30)))),
        child: Wrap(
          crossAxisAlignment: WrapCrossAlignment.center,
          children: [
            Icon(iconData, color: textColor),
            const SizedBox(
              width: 5,
            ),
            Text(
              text,
              style: TextStyle(fontSize: 14, color: textColor),
            ),
          ],
        ));
  }
}
