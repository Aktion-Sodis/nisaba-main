import 'dart:io';

import 'package:amplify_api/model_queries.dart';
import 'package:flutter/material.dart';
import 'package:mobile_app/backend/repositories/LocalDataRepository.dart';
import 'package:mobile_app/backend/storage/dataStorePaths.dart';
import 'package:mobile_app/backend/storage/image_synch.dart';
import 'package:mobile_app/models/ModelProvider.dart' as amp;
import 'package:mobile_app/backend/callableModels/CallableModels.dart';
import 'package:amplify_flutter/amplify_flutter.dart';
import '../../UserRepository.dart';

class UserRepositoryAmplifyDataStore extends UserRepository {
  static final UserRepositoryAmplifyDataStore instance =
      UserRepositoryAmplifyDataStore._();
  UserRepositoryAmplifyDataStore._();

  Future<User?> fetchUserByID(String id) async {
    GraphQLResponse<amp.User> result = await Amplify.API
        .query(
          request: ModelQueries.get(amp.User.classType, id),
        )
        .response;
    return result.data != null ? User.fromAmplifyModel(result.data!) : null;
  }

  Future<User?> getUserById(String userId) async {
    try {
      final List<amp.User> users = await Amplify.DataStore.query(
        amp.User.classType,
        where: amp.User.ID.eq(userId),
      );
      print("userQuery has REsults: ${users.length}");
      return users.isNotEmpty ? User.fromAmplifyModel(users.first) : null;
    } catch (e) {
      rethrow;
    }
  }

  Future<amp.User> getAmpUserByID(String userID) async {
    final List<amp.User> users = await Amplify.DataStore.query(
      amp.User.classType,
      where: amp.User.ID.eq(userID),
    );
    return users.first;
  }

  Future createUser(User user) async {
    ///creates a user
    ///ID always has to be set as it should equal the authentication ID
    amp.User newUser = user.toAmplifyModel();
    await Amplify.DataStore.save(newUser);
    LocalDataRepository.instance.user = User.fromAmplifyModel(newUser);
  }

  Future updateUser(User user) async {
    ///updates an existing User
    ///ID always has to be set

    amp.User ampUser = user.toAmplifyModel();
    await Amplify.DataStore.save(ampUser);
    LocalDataRepository.instance.user = User.fromAmplifyModel(ampUser);
  }

  SyncedFile getUserPicFile(User user) {
    String path = dataStorePath(DataStorePaths.userPicPath, [user.id!]);
    return SyncedFile(path);
  }

  SyncedFile getUserPicFileByUserID(String id) {
    String path = dataStorePath(DataStorePaths.userPicPath, [id]);
    return SyncedFile(path);
  }
}