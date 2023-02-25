import 'package:amplify_flutter/amplify_flutter.dart';
import 'package:mobile_app/backend/callableModels/Content.dart';
import 'package:mobile_app/backend/repositories/InterventionRepository.dart';
import 'package:mobile_app/backend/repositories/implementations/amplify_datastore/ContentRepositoryAmplifyDataStore.dart'
    as implementation;
import 'package:mobile_app/backend/storage/dataStorePaths.dart';
import 'package:mobile_app/backend/storage/image_synch.dart';
import 'package:mobile_app/models/ModelProvider.dart' as amp;

abstract class ContentRepository {
  static final ContentRepository instance =
      implementation.ContentRepositoryAmplifyDataStore.instance;

  Future<List<amp.InterventionContentRelation>>
      getAllRelationsWithPopulatedContentsAndInterventions();

  Future<List<amp.InterventionContentRelation>>
      _populateContentsInConnectionList(
          List<amp.InterventionContentRelation> toPopulate);

  Future<amp.InterventionContentRelation>
      _populateInterventionContentRelationContent(
          amp.InterventionContentRelation relation);

  Future<amp.Content> _populate(amp.Content content);

  Future<List<amp.ContentContentTagRelation>>
      contentContentTagRelationsByContentID(String ID);

  SyncedFile getContentPDFFile(Content content);

  SyncedFile getContentPic(Content content);
}
