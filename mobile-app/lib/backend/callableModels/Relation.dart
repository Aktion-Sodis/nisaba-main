import 'package:mobile_app/backend/database/DBModel.dart';

class Relation<T extends DBModel, P extends DBModel> extends DBModel {
  late final T first;
  late final P second;

  Relation({required this.first, required this.second, String? id}) : super(id);

  Relation.unpopulated(String? id) : super(id);
  @override
  DBModel getUnpopulated() {
    return Relation.unpopulated(id);
  }

  // Operator == is used to compare two objects. It compares
  // all the properties of the objects except for lists and returns true if
  // all the properties are equal.
  @override
  bool operator ==(Object other) {
    if (other is Relation) {
      return first == other.first && second == other.second && id == other.id;
    }
    return false;
  }
}
