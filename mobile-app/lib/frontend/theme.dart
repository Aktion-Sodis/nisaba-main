import 'package:flutter/material.dart';

Future<ThemeData> getThemeData() async {
  return ThemeData(
    cardTheme: const CardThemeData(
      color: Colors.white,
      shadowColor: Colors.grey,
      elevation: 3,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.all(Radius.circular(8)),
      ),
    ),
    colorScheme: const ColorScheme(
      primary: Colors.blue,
      //primaryVariant: Colors.blueAccent,
      secondary: Colors.green,
        //secondaryVariant: Colors.lightGreen,
        surface: Colors.white,
        error: Colors.red,
        onPrimary: Colors.white,
        onSecondary: Colors.white,
        onSurface: Colors.black,
        onError: Colors.white,
        brightness: Brightness.light),
    materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
    buttonTheme: const ButtonThemeData(height: 4),
    bottomNavigationBarTheme: const BottomNavigationBarThemeData(
        selectedItemColor: Colors.green,
        unselectedItemColor: Colors.grey,
        selectedLabelStyle: TextStyle(color: Colors.green),
        unselectedLabelStyle: TextStyle(color: Colors.grey),
        showUnselectedLabels: true),
    textTheme: const TextTheme(
        labelSmall: TextStyle(color: Colors.black87),
        displayLarge: TextStyle(color: Colors.blue, fontSize: 26),
        displayMedium: TextStyle(color: Colors.black87, fontSize: 26),
        titleMedium: TextStyle(color: Colors.black87, fontSize: 22),
        titleSmall: TextStyle(color: Colors.black87, fontSize: 20),
        bodyLarge: TextStyle(color: Colors.black87, fontSize: 18)),
    inputDecorationTheme: const InputDecorationTheme(
        labelStyle: TextStyle(color: Colors.grey, fontSize: 18),
        floatingLabelStyle: TextStyle(color: Colors.blue, fontSize: 18),
        floatingLabelBehavior: FloatingLabelBehavior.auto,
        hintStyle: TextStyle(color: Colors.grey, fontSize: 18),
        border: OutlineInputBorder(
            borderSide: BorderSide(color: Colors.grey),
            borderRadius: BorderRadius.all(Radius.circular(8))),
        focusedBorder: OutlineInputBorder(
            borderSide: BorderSide(color: Colors.blue),
            borderRadius: BorderRadius.all(Radius.circular(8))),
        errorBorder: OutlineInputBorder(
            borderSide: BorderSide(color: Colors.red),
            borderRadius: BorderRadius.all(Radius.circular(8))),
        prefixIconColor: Colors.grey),
    floatingActionButtonTheme: const FloatingActionButtonThemeData(
      backgroundColor: Colors.green,
    ),
    iconTheme: const IconThemeData(
      size: 25,
    ),
  );
}

class ThemeColors {
  static const Color black = Colors.black;
  static const Color yellow = Color.fromARGB(255, 255, 236, 69);
  static const Color green = Color.fromARGB(255, 75, 185, 126);
  static const Color darkGrey = Color.fromARGB(255, 72, 70, 73);
  static const Color red = Color.fromARGB(255, 219, 79, 71);
  static const Color mobster = Color.fromARGB(
      255, 120, 117, 121); // actually, light grey with purple tones
}

BoxShadow defaultShadow = BoxShadow(
  color: Colors.black.withOpacity(0.15),
  spreadRadius: 1,
  blurRadius: 2,
  offset: const Offset(0, 0), // changes position of shadow
);
