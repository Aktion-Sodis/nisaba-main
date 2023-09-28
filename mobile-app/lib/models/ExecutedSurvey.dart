/*
* Copyright 2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
*
* Licensed under the Apache License, Version 2.0 (the "License").
* You may not use this file except in compliance with the License.
* A copy of the License is located at
*
*  http://aws.amazon.com/apache2.0
*
* or in the "license" file accompanying this file. This file is distributed
* on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
* express or implied. See the License for the specific language governing
* permissions and limitations under the License.
*/

// NOTE: This file is generated and may not follow lint rules defined in your app
// Generated files can be excluded from analysis in analysis_options.yaml
// For more info, see: https://dart.dev/guides/language/analysis-options#excluding-code-from-analysis

// ignore_for_file: public_member_api_docs, annotate_overrides, dead_code, dead_codepublic_member_api_docs, depend_on_referenced_packages, file_names, library_private_types_in_public_api, no_leading_underscores_for_library_prefixes, no_leading_underscores_for_local_identifiers, non_constant_identifier_names, null_check_on_nullable_type_parameter, prefer_adjacent_string_concatenation, prefer_const_constructors, prefer_if_null_operators, prefer_interpolation_to_compose_strings, slash_for_doc_comments, sort_child_properties_last, unnecessary_const, unnecessary_constructor_name, unnecessary_late, unnecessary_new, unnecessary_null_aware_assignments, unnecessary_nullable_for_final_variable_declarations, unnecessary_string_interpolations, use_build_context_synchronously

import 'ModelProvider.dart';
import 'package:amplify_core/amplify_core.dart' as amplify_core;
import 'package:collection/collection.dart';


/** This is an auto generated class representing the ExecutedSurvey type in your schema. */
class ExecutedSurvey extends amplify_core.Model {
  static const classType = const _ExecutedSurveyModelType();
  final String id;
  final AppliedIntervention? _appliedIntervention;
  final Survey? _survey;
  final String? _surveyID;
  final User? _whoExecutedIt;
  final amplify_core.TemporalDateTime? _date;
  final Location? _location;
  final List<QuestionAnswer>? _answers;
  final int? _schemeVersion;
  final amplify_core.TemporalDateTime? _createdAt;
  final amplify_core.TemporalDateTime? _updatedAt;
  final String? _executedSurveySurveyId;
  final String? _executedSurveyWhoExecutedItId;

  @override
  getInstanceType() => classType;
  
  @Deprecated('[getId] is being deprecated in favor of custom primary key feature. Use getter [modelIdentifier] to get model identifier.')
  @override
  String getId() => id;
  
  ExecutedSurveyModelIdentifier get modelIdentifier {
      return ExecutedSurveyModelIdentifier(
        id: id
      );
  }
  
  AppliedIntervention get appliedIntervention {
    try {
      return _appliedIntervention!;
    } catch(e) {
      throw amplify_core.AmplifyCodeGenModelException(
          amplify_core.AmplifyExceptionMessages.codeGenRequiredFieldForceCastExceptionMessage,
          recoverySuggestion:
            amplify_core.AmplifyExceptionMessages.codeGenRequiredFieldForceCastRecoverySuggestion,
          underlyingException: e.toString()
          );
    }
  }
  
  Survey get survey {
    try {
      return _survey!;
    } catch(e) {
      throw amplify_core.AmplifyCodeGenModelException(
          amplify_core.AmplifyExceptionMessages.codeGenRequiredFieldForceCastExceptionMessage,
          recoverySuggestion:
            amplify_core.AmplifyExceptionMessages.codeGenRequiredFieldForceCastRecoverySuggestion,
          underlyingException: e.toString()
          );
    }
  }
  
  String? get surveyID {
    return _surveyID;
  }
  
  User get whoExecutedIt {
    try {
      return _whoExecutedIt!;
    } catch(e) {
      throw amplify_core.AmplifyCodeGenModelException(
          amplify_core.AmplifyExceptionMessages.codeGenRequiredFieldForceCastExceptionMessage,
          recoverySuggestion:
            amplify_core.AmplifyExceptionMessages.codeGenRequiredFieldForceCastRecoverySuggestion,
          underlyingException: e.toString()
          );
    }
  }
  
  amplify_core.TemporalDateTime get date {
    try {
      return _date!;
    } catch(e) {
      throw amplify_core.AmplifyCodeGenModelException(
          amplify_core.AmplifyExceptionMessages.codeGenRequiredFieldForceCastExceptionMessage,
          recoverySuggestion:
            amplify_core.AmplifyExceptionMessages.codeGenRequiredFieldForceCastRecoverySuggestion,
          underlyingException: e.toString()
          );
    }
  }
  
  Location? get location {
    return _location;
  }
  
  List<QuestionAnswer> get answers {
    try {
      return _answers!;
    } catch(e) {
      throw amplify_core.AmplifyCodeGenModelException(
          amplify_core.AmplifyExceptionMessages.codeGenRequiredFieldForceCastExceptionMessage,
          recoverySuggestion:
            amplify_core.AmplifyExceptionMessages.codeGenRequiredFieldForceCastRecoverySuggestion,
          underlyingException: e.toString()
          );
    }
  }
  
  int? get schemeVersion {
    return _schemeVersion;
  }
  
  amplify_core.TemporalDateTime? get createdAt {
    return _createdAt;
  }
  
  amplify_core.TemporalDateTime? get updatedAt {
    return _updatedAt;
  }
  
  String get executedSurveySurveyId {
    try {
      return _executedSurveySurveyId!;
    } catch(e) {
      throw amplify_core.AmplifyCodeGenModelException(
          amplify_core.AmplifyExceptionMessages.codeGenRequiredFieldForceCastExceptionMessage,
          recoverySuggestion:
            amplify_core.AmplifyExceptionMessages.codeGenRequiredFieldForceCastRecoverySuggestion,
          underlyingException: e.toString()
          );
    }
  }
  
  String get executedSurveyWhoExecutedItId {
    try {
      return _executedSurveyWhoExecutedItId!;
    } catch(e) {
      throw amplify_core.AmplifyCodeGenModelException(
          amplify_core.AmplifyExceptionMessages.codeGenRequiredFieldForceCastExceptionMessage,
          recoverySuggestion:
            amplify_core.AmplifyExceptionMessages.codeGenRequiredFieldForceCastRecoverySuggestion,
          underlyingException: e.toString()
          );
    }
  }
  
  const ExecutedSurvey._internal({required this.id, required appliedIntervention, required survey, surveyID, required whoExecutedIt, required date, location, required answers, schemeVersion, createdAt, updatedAt, required executedSurveySurveyId, required executedSurveyWhoExecutedItId}): _appliedIntervention = appliedIntervention, _survey = survey, _surveyID = surveyID, _whoExecutedIt = whoExecutedIt, _date = date, _location = location, _answers = answers, _schemeVersion = schemeVersion, _createdAt = createdAt, _updatedAt = updatedAt, _executedSurveySurveyId = executedSurveySurveyId, _executedSurveyWhoExecutedItId = executedSurveyWhoExecutedItId;
  
  factory ExecutedSurvey({String? id, required AppliedIntervention appliedIntervention, required Survey survey, String? surveyID, required User whoExecutedIt, required amplify_core.TemporalDateTime date, Location? location, required List<QuestionAnswer> answers, int? schemeVersion, required String executedSurveySurveyId, required String executedSurveyWhoExecutedItId}) {
    return ExecutedSurvey._internal(
      id: id == null ? amplify_core.UUID.getUUID() : id,
      appliedIntervention: appliedIntervention,
      survey: survey,
      surveyID: surveyID,
      whoExecutedIt: whoExecutedIt,
      date: date,
      location: location,
      answers: answers != null ? List<QuestionAnswer>.unmodifiable(answers) : answers,
      schemeVersion: schemeVersion,
      executedSurveySurveyId: executedSurveySurveyId,
      executedSurveyWhoExecutedItId: executedSurveyWhoExecutedItId);
  }
  
  bool equals(Object other) {
    return this == other;
  }
  
  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is ExecutedSurvey &&
      id == other.id &&
      _appliedIntervention == other._appliedIntervention &&
      _survey == other._survey &&
      _surveyID == other._surveyID &&
      _whoExecutedIt == other._whoExecutedIt &&
      _date == other._date &&
      _location == other._location &&
      DeepCollectionEquality().equals(_answers, other._answers) &&
      _schemeVersion == other._schemeVersion &&
      _executedSurveySurveyId == other._executedSurveySurveyId &&
      _executedSurveyWhoExecutedItId == other._executedSurveyWhoExecutedItId;
  }
  
  @override
  int get hashCode => toString().hashCode;
  
  @override
  String toString() {
    var buffer = new StringBuffer();
    
    buffer.write("ExecutedSurvey {");
    buffer.write("id=" + "$id" + ", ");
    buffer.write("appliedIntervention=" + (_appliedIntervention != null ? _appliedIntervention!.toString() : "null") + ", ");
    buffer.write("surveyID=" + "$_surveyID" + ", ");
    buffer.write("date=" + (_date != null ? _date!.format() : "null") + ", ");
    buffer.write("location=" + (_location != null ? _location!.toString() : "null") + ", ");
    buffer.write("answers=" + (_answers != null ? _answers!.toString() : "null") + ", ");
    buffer.write("schemeVersion=" + (_schemeVersion != null ? _schemeVersion!.toString() : "null") + ", ");
    buffer.write("createdAt=" + (_createdAt != null ? _createdAt!.format() : "null") + ", ");
    buffer.write("updatedAt=" + (_updatedAt != null ? _updatedAt!.format() : "null") + ", ");
    buffer.write("executedSurveySurveyId=" + "$_executedSurveySurveyId" + ", ");
    buffer.write("executedSurveyWhoExecutedItId=" + "$_executedSurveyWhoExecutedItId");
    buffer.write("}");
    
    return buffer.toString();
  }
  
  ExecutedSurvey copyWith({AppliedIntervention? appliedIntervention, Survey? survey, String? surveyID, User? whoExecutedIt, amplify_core.TemporalDateTime? date, Location? location, List<QuestionAnswer>? answers, int? schemeVersion, String? executedSurveySurveyId, String? executedSurveyWhoExecutedItId}) {
    return ExecutedSurvey._internal(
      id: id,
      appliedIntervention: appliedIntervention ?? this.appliedIntervention,
      survey: survey ?? this.survey,
      surveyID: surveyID ?? this.surveyID,
      whoExecutedIt: whoExecutedIt ?? this.whoExecutedIt,
      date: date ?? this.date,
      location: location ?? this.location,
      answers: answers ?? this.answers,
      schemeVersion: schemeVersion ?? this.schemeVersion,
      executedSurveySurveyId: executedSurveySurveyId ?? this.executedSurveySurveyId,
      executedSurveyWhoExecutedItId: executedSurveyWhoExecutedItId ?? this.executedSurveyWhoExecutedItId);
  }
  
  ExecutedSurvey copyWithModelFieldValues({
    ModelFieldValue<AppliedIntervention>? appliedIntervention,
    ModelFieldValue<Survey>? survey,
    ModelFieldValue<String?>? surveyID,
    ModelFieldValue<User>? whoExecutedIt,
    ModelFieldValue<amplify_core.TemporalDateTime>? date,
    ModelFieldValue<Location?>? location,
    ModelFieldValue<List<QuestionAnswer>>? answers,
    ModelFieldValue<int?>? schemeVersion,
    ModelFieldValue<String>? executedSurveySurveyId,
    ModelFieldValue<String>? executedSurveyWhoExecutedItId
  }) {
    return ExecutedSurvey._internal(
      id: id,
      appliedIntervention: appliedIntervention == null ? this.appliedIntervention : appliedIntervention.value,
      survey: survey == null ? this.survey : survey.value,
      surveyID: surveyID == null ? this.surveyID : surveyID.value,
      whoExecutedIt: whoExecutedIt == null ? this.whoExecutedIt : whoExecutedIt.value,
      date: date == null ? this.date : date.value,
      location: location == null ? this.location : location.value,
      answers: answers == null ? this.answers : answers.value,
      schemeVersion: schemeVersion == null ? this.schemeVersion : schemeVersion.value,
      executedSurveySurveyId: executedSurveySurveyId == null ? this.executedSurveySurveyId : executedSurveySurveyId.value,
      executedSurveyWhoExecutedItId: executedSurveyWhoExecutedItId == null ? this.executedSurveyWhoExecutedItId : executedSurveyWhoExecutedItId.value
    );
  }
  
  ExecutedSurvey.fromJson(Map<String, dynamic> json)  
    : id = json['id'],
      _appliedIntervention = json['appliedIntervention']?['serializedData'] != null
        ? AppliedIntervention.fromJson(new Map<String, dynamic>.from(json['appliedIntervention']['serializedData']))
        : null,
      _survey = json['survey']?['serializedData'] != null
        ? Survey.fromJson(new Map<String, dynamic>.from(json['survey']['serializedData']))
        : null,
      _surveyID = json['surveyID'],
      _whoExecutedIt = json['whoExecutedIt']?['serializedData'] != null
        ? User.fromJson(new Map<String, dynamic>.from(json['whoExecutedIt']['serializedData']))
        : null,
      _date = json['date'] != null ? amplify_core.TemporalDateTime.fromString(json['date']) : null,
      _location = json['location']?['serializedData'] != null
        ? Location.fromJson(new Map<String, dynamic>.from(json['location']['serializedData']))
        : null,
      _answers = json['answers'] is List
        ? (json['answers'] as List)
          .where((e) => e != null)
          .map((e) => QuestionAnswer.fromJson(new Map<String, dynamic>.from(e['serializedData'])))
          .toList()
        : null,
      _schemeVersion = (json['schemeVersion'] as num?)?.toInt(),
      _createdAt = json['createdAt'] != null ? amplify_core.TemporalDateTime.fromString(json['createdAt']) : null,
      _updatedAt = json['updatedAt'] != null ? amplify_core.TemporalDateTime.fromString(json['updatedAt']) : null,
      _executedSurveySurveyId = json['executedSurveySurveyId'],
      _executedSurveyWhoExecutedItId = json['executedSurveyWhoExecutedItId'];
  
  Map<String, dynamic> toJson() => {
    'id': id, 'appliedIntervention': _appliedIntervention?.toJson(), 'survey': _survey?.toJson(), 'surveyID': _surveyID, 'whoExecutedIt': _whoExecutedIt?.toJson(), 'date': _date?.format(), 'location': _location?.toJson(), 'answers': _answers?.map((QuestionAnswer? e) => e?.toJson()).toList(), 'schemeVersion': _schemeVersion, 'createdAt': _createdAt?.format(), 'updatedAt': _updatedAt?.format(), 'executedSurveySurveyId': _executedSurveySurveyId, 'executedSurveyWhoExecutedItId': _executedSurveyWhoExecutedItId
  };
  
  Map<String, Object?> toMap() => {
    'id': id,
    'appliedIntervention': _appliedIntervention,
    'survey': _survey,
    'surveyID': _surveyID,
    'whoExecutedIt': _whoExecutedIt,
    'date': _date,
    'location': _location,
    'answers': _answers,
    'schemeVersion': _schemeVersion,
    'createdAt': _createdAt,
    'updatedAt': _updatedAt,
    'executedSurveySurveyId': _executedSurveySurveyId,
    'executedSurveyWhoExecutedItId': _executedSurveyWhoExecutedItId
  };

  static final amplify_core.QueryModelIdentifier<ExecutedSurveyModelIdentifier> MODEL_IDENTIFIER = amplify_core.QueryModelIdentifier<ExecutedSurveyModelIdentifier>();
  static final ID = amplify_core.QueryField(fieldName: "id");
  static final APPLIEDINTERVENTION = amplify_core.QueryField(
    fieldName: "appliedIntervention",
    fieldType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.model, ofModelName: 'AppliedIntervention'));
  static final SURVEY = amplify_core.QueryField(
    fieldName: "survey",
    fieldType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.model, ofModelName: 'Survey'));
  static final SURVEYID = amplify_core.QueryField(fieldName: "surveyID");
  static final WHOEXECUTEDIT = amplify_core.QueryField(
    fieldName: "whoExecutedIt",
    fieldType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.model, ofModelName: 'User'));
  static final DATE = amplify_core.QueryField(fieldName: "date");
  static final LOCATION = amplify_core.QueryField(fieldName: "location");
  static final ANSWERS = amplify_core.QueryField(fieldName: "answers");
  static final SCHEMEVERSION = amplify_core.QueryField(fieldName: "schemeVersion");
  static final EXECUTEDSURVEYSURVEYID = amplify_core.QueryField(fieldName: "executedSurveySurveyId");
  static final EXECUTEDSURVEYWHOEXECUTEDITID = amplify_core.QueryField(fieldName: "executedSurveyWhoExecutedItId");
  static var schema = amplify_core.Model.defineSchema(define: (amplify_core.ModelSchemaDefinition modelSchemaDefinition) {
    modelSchemaDefinition.name = "ExecutedSurvey";
    modelSchemaDefinition.pluralName = "ExecutedSurveys";
    
    modelSchemaDefinition.authRules = [
      amplify_core.AuthRule(
        authStrategy: amplify_core.AuthStrategy.OWNER,
        ownerField: "organization_id",
        identityClaim: "custom:organization_id",
        provider: amplify_core.AuthRuleProvider.USERPOOLS,
        operations: const [
          amplify_core.ModelOperation.CREATE,
          amplify_core.ModelOperation.UPDATE,
          amplify_core.ModelOperation.DELETE,
          amplify_core.ModelOperation.READ
        ])
    ];
    
    modelSchemaDefinition.indexes = [
      amplify_core.ModelIndex(fields: const ["surveyID"], name: "bySurveyID")
    ];
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.id());
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.belongsTo(
      key: ExecutedSurvey.APPLIEDINTERVENTION,
      isRequired: true,
      targetNames: ['appliedInterventionExecutedSurveysId'],
      ofModelName: 'AppliedIntervention'
    ));
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.hasOne(
      key: ExecutedSurvey.SURVEY,
      isRequired: true,
      ofModelName: 'Survey',
      associatedKey: Survey.ID
    ));
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.field(
      key: ExecutedSurvey.SURVEYID,
      isRequired: false,
      ofType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.string)
    ));
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.hasOne(
      key: ExecutedSurvey.WHOEXECUTEDIT,
      isRequired: true,
      ofModelName: 'User',
      associatedKey: User.ID
    ));
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.field(
      key: ExecutedSurvey.DATE,
      isRequired: true,
      ofType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.dateTime)
    ));
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.embedded(
      fieldName: 'location',
      isRequired: false,
      ofType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.embedded, ofCustomTypeName: 'Location')
    ));
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.embedded(
      fieldName: 'answers',
      isRequired: true,
      isArray: true,
      ofType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.embeddedCollection, ofCustomTypeName: 'QuestionAnswer')
    ));
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.field(
      key: ExecutedSurvey.SCHEMEVERSION,
      isRequired: false,
      ofType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.int)
    ));
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.nonQueryField(
      fieldName: 'createdAt',
      isRequired: false,
      isReadOnly: true,
      ofType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.dateTime)
    ));
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.nonQueryField(
      fieldName: 'updatedAt',
      isRequired: false,
      isReadOnly: true,
      ofType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.dateTime)
    ));
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.field(
      key: ExecutedSurvey.EXECUTEDSURVEYSURVEYID,
      isRequired: true,
      ofType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.string)
    ));
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.field(
      key: ExecutedSurvey.EXECUTEDSURVEYWHOEXECUTEDITID,
      isRequired: true,
      ofType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.string)
    ));
  });
}

class _ExecutedSurveyModelType extends amplify_core.ModelType<ExecutedSurvey> {
  const _ExecutedSurveyModelType();
  
  @override
  ExecutedSurvey fromJson(Map<String, dynamic> jsonData) {
    return ExecutedSurvey.fromJson(jsonData);
  }
  
  @override
  String modelName() {
    return 'ExecutedSurvey';
  }
}

/**
 * This is an auto generated class representing the model identifier
 * of [ExecutedSurvey] in your schema.
 */
class ExecutedSurveyModelIdentifier implements amplify_core.ModelIdentifier<ExecutedSurvey> {
  final String id;

  /** Create an instance of ExecutedSurveyModelIdentifier using [id] the primary key. */
  const ExecutedSurveyModelIdentifier({
    required this.id});
  
  @override
  Map<String, dynamic> serializeAsMap() => (<String, dynamic>{
    'id': id
  });
  
  @override
  List<Map<String, dynamic>> serializeAsList() => serializeAsMap()
    .entries
    .map((entry) => (<String, dynamic>{ entry.key: entry.value }))
    .toList();
  
  @override
  String serializeAsString() => serializeAsMap().values.join('#');
  
  @override
  String toString() => 'ExecutedSurveyModelIdentifier(id: $id)';
  
  @override
  bool operator ==(Object other) {
    if (identical(this, other)) {
      return true;
    }
    
    return other is ExecutedSurveyModelIdentifier &&
      id == other.id;
  }
  
  @override
  int get hashCode =>
    id.hashCode;
}