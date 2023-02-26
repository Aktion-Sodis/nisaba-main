abstract class DBObject {
  bool isPopulated = false;
  int version = 0;

  DBObject.fromMap(Map<String, dynamic> map);

  Map<String, dynamic> toMap();
}
