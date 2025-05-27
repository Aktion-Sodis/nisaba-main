import 'package:mobile_app/backend/database/DB.dart';
import 'package:mobile_app/backend/database/db_implementations/synced_db/SyncedDB.dart';
import 'package:mobile_app/backend/repositories/LocalDataRepository.dart';
import 'package:mobile_app/backend/storage/dataStorePaths.dart';
import 'package:mobile_app/backend/storage/image_synch.dart';
import 'package:mobile_app/backend/callableModels/CallableModels.dart';
import '../../UserRepository.dart';

class UserRepositoryCustom extends UserRepository {
  static final UserRepositoryCustom instance = UserRepositoryCustom._();
  UserRepositoryCustom._();

  DB db = SyncedDB.instance;

  @override
  Future<User?> getUserById(String userId) async {
    User? user = await db.getById(User, userId);
    return user;
  }

  @override
  Future createUser(User user) async {
    ///creates a user
    ///ID always has to be set as it should equal the authentication ID
    await (db as SyncedDB).remoteDB.create(user);
    LocalDataRepository.instance.user = user;
  }

  @override
  Future updateUser(User user) async {
    ///updates an existing User
    ///ID always has to be set

    db.update(user);
    LocalDataRepository.instance.user = user;
  }

  @override
  SyncedFile getUserPicFile(User user) {
    String path = dataStorePath(DataStorePaths.userPicPath, [user.id]);
    return SyncedFile(path);
  }

  @override
  SyncedFile getUserPicFileByUserID(String id) {
    String path = dataStorePath(DataStorePaths.userPicPath, [id]);
    return SyncedFile(path);
  }
}
