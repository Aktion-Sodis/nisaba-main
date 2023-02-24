import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:mobile_app/backend/repositories/UserRepository.dart';
import 'package:mobile_app/frontend/pages/main_menu_components/main_menu_home.dart';
import 'package:mobile_app/frontend/pages/main_menu_components/main_menu_organization.dart';
import 'package:mobile_app/frontend/pages/main_menu_components/main_menu_tasks.dart';
import 'package:mobile_app/frontend/pages/main_menu_components/main_menu_wiki.dart';

import 'package:mobile_app/frontend/strings.dart' as strings;
import 'package:mobile_app/frontend/test_list.dart';

class MainMenu extends StatefulWidget {
  const MainMenu({Key? key}) : super(key: key);

  @override
  State<StatefulWidget> createState() {
    return MainMenuState();
  }
}

class MainMenuState extends State<MainMenu> {
  @override
  initState() {
    pageController = PageController(initialPage: 0);
    currentIndex = 0;
    super.initState();
  }

  late PageController pageController;

  late int currentIndex;

  onNavigationTap(int i) {
    setState(() {
      currentIndex = i;
    });
    pageController.animateToPage(i,
        duration: Duration(milliseconds: 300), curve: Curves.easeInOutCubic);
  }

  PageView mainPageView() => PageView(
        controller: pageController,
        pageSnapping: false,
        physics: NeverScrollableScrollPhysics(),
        children: [
          MainMenuHome(onNavigationTap),
          MainMenuOrganization(),
          MainMenuTasks(),
          MainMenuWiki(),
          TestList()
        ],
      );

  BottomNavigationBar bottomNavigationBar() {
    List<BottomNavigationBarItem> menuItems = [
      BottomNavigationBarItem(
          icon: const Icon(FontAwesomeIcons.home),
          label: strings.main_menu_home),
      BottomNavigationBarItem(
          icon: const Icon(FontAwesomeIcons.folder),
          label: strings.main_menu_organization),
      BottomNavigationBarItem(
          icon: const Icon(FontAwesomeIcons.tasks),
          label: strings.main_menu_tasks),
      BottomNavigationBarItem(
          icon: const Icon(FontAwesomeIcons.handSparkles),
          label: strings.main_menu_wiki),
    ];
    if (kDebugMode) {
      menuItems.add(const BottomNavigationBarItem(
          icon: Icon(FontAwesomeIcons.cubes), label: "Tests"));
    }

    return BottomNavigationBar(
        currentIndex: currentIndex, onTap: onNavigationTap, items: menuItems);
  }

  @override
  Widget build(BuildContext context) {
    return MultiRepositoryProvider(
        providers: [
          RepositoryProvider(create: (context) => UserRepository.instance)
        ],
        child: Scaffold(
            bottomNavigationBar: bottomNavigationBar(),
            body: SafeArea(child: mainPageView())));
  }
}
