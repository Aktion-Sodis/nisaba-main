abstract class DBObject {
  String? id;
  bool isPopulated = false;
  int version = 0;

  Map<String, dynamic> toMap();
}
