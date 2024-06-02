import 'package:mobile_app/backend/database/DB.dart';
import 'package:mobile_app/backend/database/DBModel.dart';
import 'package:mobile_app/backend/database/db_implementations/local_db/LocalDB.dart';
import 'package:mobile_app/backend/database/db_implementations/synced_db/DBQueueObject.dart';
import 'package:mobile_app/backend/repositories/LocalDataRepository.dart';
import 'package:sembast/sembast.dart';

/// DBQueue uses sembast database of the LocalDB, however uses
/// the `intMapStoreFactory`. It means, that the entries in the DBQueue
/// have an `int`-key, which makes it possible to use sorting by key
class DBQueue {
  final LocalDB localDB;

  //static const String queueStoreName = 'DBQueue';

  static String queueStoreName() {
    String orga_id = LocalDataRepository.instance.organizationID;
    return 'DBQueue_' + orga_id;
  }

  DBQueue(this.localDB);

  Future<void> enqueue<G extends DBModel>(G object, DBAction action) async {
    var store = intMapStoreFactory.store(queueStoreName());
    var entry = DBQueueObject(object.runtimeType.toString(), object, action);
    await store.add(localDB.db,
        localDB.getRegisteredModel(DBQueueObject).fromDBModel(entry)!);
  }

  Future<List<int>> getNumberOfQueuedEntries() async {
    //returns [number of Surveys, number of other entries]
    var store = intMapStoreFactory.store(queueStoreName());
    //number of entries of type Survey
    /**
     * entry structure: instance.modelType == Survey
     * <String, dynamic>{
      'id': instance.id,
      'action': _$DBActionEnumMap[instance.action]!,
      'modelType': instance.modelType,
      'object': DBModelConverter.instance.toJson(instance.object),
      'deleted': instance.deleted,
    };
     * 
     * 
     */

    int surveysToUpload = 0;
    int otherToUpload = 0;
    List<RecordSnapshot> records = await store.find(localDB.db);

    for (var record in records) {
      if ((record.value! as Map<String, dynamic>)['modelType'] == 'Survey') {
        surveysToUpload++;
      } else {
        otherToUpload++;
      }
    }
    return [surveysToUpload, otherToUpload];
  }

  Future<DBQueueObject?> get() async {
    var store = intMapStoreFactory.store(queueStoreName());
    var finder = Finder(sortOrders: [
      SortOrder("key"),
    ]);
    var record = await store.findFirst(localDB.db, finder: finder);
    if (record == null) {
      return Future.value(null);
    }

    var entry = localDB
        .getRegisteredModel(DBQueueObject)
        .toDBModel(record.value) as DBQueueObject;
    entry.id = record.key.toString();

    return Future.value(entry);
  }

  Future<DBQueueObject?> delete(DBQueueObject queueObject) async {
    var store = intMapStoreFactory.store(queueStoreName());
    await store.record(int.parse(queueObject.id!)).delete(localDB.db);
    return Future.value(queueObject);
  }

  // TODO: Test this
  /*Future<void> clear() async {
    var store = intMapStoreFactory.store(queueStoreName);
    await store.delete(localDB.db);
  }*/
}
