import 'package:mobile_app/backend/repositories/implementations/custom_syncronization/UserRepositoryCustom.dart';
import 'package:mobile_app/backend/storage/image_synch.dart';
import 'package:mobile_app/backend/callableModels/CallableModels.dart';

abstract class UserRepository {
  static final UserRepository instance = UserRepositoryCustom.instance;

  Future<User?> getUserById(String userId);

  Future createUser(User user);

  Future updateUser(User user);

  SyncedFile getUserPicFile(User user);

  SyncedFile getUserPicFileByUserID(String id);
}
