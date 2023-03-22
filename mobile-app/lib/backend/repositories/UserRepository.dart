import 'dart:io';

import 'package:amplify_api/model_queries.dart';
import 'package:flutter/material.dart';
import 'package:mobile_app/backend/repositories/LocalDataRepository.dart';
import 'package:mobile_app/backend/repositories/implementations/custom_syncronization/UserRepositoryCustom.dart';
import 'package:mobile_app/backend/storage/dataStorePaths.dart';
import 'package:mobile_app/backend/storage/image_synch.dart';
import 'package:mobile_app/models/ModelProvider.dart' as amp;
import 'package:mobile_app/backend/callableModels/CallableModels.dart';
import 'package:amplify_flutter/amplify_flutter.dart';

abstract class UserRepository {
  static final UserRepository instance = UserRepositoryCustom.instance;

  Future<User?> fetchUserByID(String id);

  Future<User?> getUserById(String userId);

  Future<User> getAmpUserByID(String userID);

  Future createUser(User user);

  Future updateUser(User user);

  SyncedFile getUserPicFile(User user);

  SyncedFile getUserPicFileByUserID(String id);
}
