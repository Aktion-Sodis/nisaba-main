import 'package:amplify_flutter/amplify_flutter.dart';
import 'package:flutter/foundation.dart';

/// Child classes have to implement following methods besides the
/// offered by abstract class DBModel:
/// - constructor unpopulated(String? id)
/// - operator ==(Object other)
/// - DBModel getUnpopulated()
abstract class DBModel {
  String? id;
  bool isPopulated = true;

  // This has to return a new instance of the class with only the id set
  DBModel getUnpopulated();

  DBModel([this.id]) {
    id ??= UUID.getUUID();
  }

  bool operator ==(Object other) {
    throw UnimplementedError();
  }

  bool unpopulatedListsEqual(List<DBModel> a, List<DBModel> b) {
    List<DBModel> aUnpopulated = a.map((e) => e.getUnpopulated()).toList();
    List<DBModel> bUnpopulated = b.map((e) => e.getUnpopulated()).toList();

    return listEquals(aUnpopulated, bUnpopulated);
  }
}
