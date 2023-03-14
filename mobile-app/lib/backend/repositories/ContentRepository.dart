import 'package:amplify_flutter/amplify_flutter.dart';
import 'package:mobile_app/backend/callableModels/Content.dart';
import 'package:mobile_app/backend/repositories/InterventionRepository.dart';
import 'package:mobile_app/backend/repositories/implementations/custom_syncronization/ContentRepositoryCustom.dart';

import 'package:mobile_app/backend/storage/dataStorePaths.dart';
import 'package:mobile_app/backend/storage/image_synch.dart';
import 'package:mobile_app/models/ModelProvider.dart' as amp;

import '../callableModels/Relation.dart';

abstract class ContentRepository {
  static final ContentRepository instance = ContentRepositoryCustom.instance;

  Future<List<InterventionContentRelation>>
      getAllRelationsWithPopulatedContentsAndInterventions();

  Future<List<InterventionContentRelation>> _populateContentsInConnectionList(
      List<InterventionContentRelation> toPopulate);

  Future<InterventionContentRelation>
      _populateInterventionContentRelationContent(
          InterventionContentRelation relation);

  Future<Content> _populate(Content content);

  Future<List<ContentContentTagRelation>> contentContentTagRelationsByContentID(
      String ID);

  SyncedFile getContentPDFFile(Content content);

  SyncedFile getContentPic(Content content);
}
