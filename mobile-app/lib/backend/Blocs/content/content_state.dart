import 'package:mobile_app/backend/callableModels/CallableModels.dart';
import 'package:mobile_app/models/ModelProvider.dart' as amp;

import '../../callableModels/Relation.dart';

abstract class ContentState {}

class LoadingContentState extends ContentState {}

class LoadedContentState extends ContentState {
  //first two have same length and sort
  final List<InterventionContentRelation> allRelations;
  final List<Content> allContents;

  final List<Content> contentsToDisplay;
  final List<Intervention> selectedInterventions;
  final List<Intervention> allInterventions;

  bool isSelectedIntervention(Intervention intervention) {
    return selectedInterventions
        .any((element) => element.id == intervention.id);
  }

  LoadedContentState(
      {required this.allRelations,
      required this.allContents,
      required this.contentsToDisplay,
      required this.selectedInterventions,
      required this.allInterventions});

  LoadedContentState copyWith(
      {List<InterventionContentRelation>? allRelations,
      List<Content>? allContents,
      List<Content>? contentsToDisplay,
      List<Intervention>? selectedInterventions,
      List<Intervention>? allInterventions}) {
    return LoadedContentState(
        allRelations: allRelations ?? this.allRelations,
        allContents: allContents ?? this.allContents,
        contentsToDisplay: contentsToDisplay ?? this.contentsToDisplay,
        selectedInterventions:
            selectedInterventions ?? this.selectedInterventions,
        allInterventions: allInterventions ?? this.allInterventions);
  }
}
