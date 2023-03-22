import 'package:amplify_flutter/amplify_flutter.dart';
import 'package:mobile_app/backend/callableModels/Content.dart';
import 'package:mobile_app/backend/database/DB.dart';
import 'package:mobile_app/backend/database/QPredicate.dart';
import 'package:mobile_app/backend/database/Query.dart';
import 'package:mobile_app/backend/database/db_implementations/synced_db/SyncedDB.dart';
import 'package:mobile_app/backend/repositories/ContentRepository.dart'
    as definition;
import 'package:mobile_app/backend/repositories/InterventionRepository.dart';
import 'package:mobile_app/backend/storage/dataStorePaths.dart';
import 'package:mobile_app/backend/storage/image_synch.dart';
import 'package:mobile_app/models/ModelProvider.dart' as amp;

import '../../../callableModels/Relation.dart';

class ContentRepositoryCustom extends definition.ContentRepository {
  static final ContentRepositoryCustom instance = ContentRepositoryCustom._();

  @override
  ContentRepositoryCustom._();

  DB db = SyncedDB.instance;

  @override
  Future<List<InterventionContentRelation>>
      getAllRelationsWithPopulatedContentsAndInterventions() async {
    //todo: kann man hier ggf. rauslassen
    List<InterventionContentRelation> raw =
        await db.get(InterventionContentRelation);

    return _populateContentsInConnectionList(raw);
  }

  @override
  Future<List<InterventionContentRelation>> _populateContentsInConnectionList(
      List<InterventionContentRelation> toPopulate) async {
    //todo: hier ggf. rauslassen
    List<Future<InterventionContentRelation>> toWait = List.generate(
        toPopulate.length,
        (index) =>
            _populateInterventionContentRelationContent(toPopulate[index]));
    return Future.wait(toWait);
  }

  @override
  Future<InterventionContentRelation>
      _populateInterventionContentRelationContent(
          InterventionContentRelation relation) async {
    InterventionContentRelation toReturn = relation;
    toReturn.second = await populatedContentByID(toReturn.contentId);
    toReturn.first = await InterventionRepository.instance
        .populatedInterventionFromContent(relation.interventionId);
    return toReturn;
  }

  @override
  Future<Content> _populate(Content content) async {
    Content toReturn = content;
    toReturn.tagConnections =
        await contentContentTagRelationsByContentID(toReturn.id!);
    toReturn.interventions = [];
    return toReturn;
  }

  Future<Content> populatedContentByID(String id) async {
    Content content = await db.getById(Content, id) as Content;
    content = await _populate(content);
    return content;
  }

  @override
  Future<List<ContentContentTagRelation>> contentContentTagRelationsByContentID(
      String ID) async {
    List<ContentContentTagRelation> toReturn = await db.get(
        ContentContentTagRelation, Query(QPredicate.EQ, 'contentId', ID));

    return toReturn;
  }

  @override
  SyncedFile getContentPDFFile(Content content) {
    String path = dataStorePath(DataStorePaths.docPdfPath, [content.id!]);
    print("synced pdf file called for path: $path");
    return SyncedFile(path);
  }

  @override
  SyncedFile getContentPic(Content content) {
    String path = dataStorePath(DataStorePaths.docPicPath, [content.id!]);
    return SyncedFile(path);
  }
}
