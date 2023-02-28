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
import 'package:amplify_core/amplify_core.dart';
import 'package:collection/collection.dart';
import 'package:flutter/foundation.dart';


/** This is an auto generated class representing the Survey type in your schema. */
@immutable
class Survey extends Model {
  static const classType = const _SurveyModelType();
  final String id;
  final I18nString? _name;
  final I18nString? _description;
  final Intervention? _intervention;
  final List<Question>? _questions;
  final List<SurveySurveyTagRelation>? _tags;
  final SurveyType? _surveyType;
  final int? _schemeVersion;
  final bool? _archived;
  final TemporalDateTime? _createdAt;
  final TemporalDateTime? _updatedAt;

  @override
  getInstanceType() => classType;
  
  @Deprecated('[getId] is being deprecated in favor of custom primary key feature. Use getter [modelIdentifier] to get model identifier.')
  @override
  String getId() => id;
  
  SurveyModelIdentifier get modelIdentifier {
      return SurveyModelIdentifier(
        id: id
      );
  }
  
  I18nString get name {
    try {
      return _name!;
    } catch(e) {
      throw new AmplifyCodeGenModelException(
          AmplifyExceptionMessages.codeGenRequiredFieldForceCastExceptionMessage,
          recoverySuggestion:
            AmplifyExceptionMessages.codeGenRequiredFieldForceCastRecoverySuggestion,
          underlyingException: e.toString()
          );
    }
  }
  
  I18nString get description {
    try {
      return _description!;
    } catch(e) {
      throw new AmplifyCodeGenModelException(
          AmplifyExceptionMessages.codeGenRequiredFieldForceCastExceptionMessage,
          recoverySuggestion:
            AmplifyExceptionMessages.codeGenRequiredFieldForceCastRecoverySuggestion,
          underlyingException: e.toString()
          );
    }
  }
  
  Intervention? get intervention {
    return _intervention;
  }
  
  List<Question> get questions {
    try {
      return _questions!;
    } catch(e) {
      throw new AmplifyCodeGenModelException(
          AmplifyExceptionMessages.codeGenRequiredFieldForceCastExceptionMessage,
          recoverySuggestion:
            AmplifyExceptionMessages.codeGenRequiredFieldForceCastRecoverySuggestion,
          underlyingException: e.toString()
          );
    }
  }
  
  List<SurveySurveyTagRelation> get tags {
    try {
      return _tags!;
    } catch(e) {
      throw new AmplifyCodeGenModelException(
          AmplifyExceptionMessages.codeGenRequiredFieldForceCastExceptionMessage,
          recoverySuggestion:
            AmplifyExceptionMessages.codeGenRequiredFieldForceCastRecoverySuggestion,
          underlyingException: e.toString()
          );
    }
  }
  
  SurveyType get surveyType {
    try {
      return _surveyType!;
    } catch(e) {
      throw new AmplifyCodeGenModelException(
          AmplifyExceptionMessages.codeGenRequiredFieldForceCastExceptionMessage,
          recoverySuggestion:
            AmplifyExceptionMessages.codeGenRequiredFieldForceCastRecoverySuggestion,
          underlyingException: e.toString()
          );
    }
  }
  
  int? get schemeVersion {
    return _schemeVersion;
  }
  
  bool? get archived {
    return _archived;
  }
  
  TemporalDateTime? get createdAt {
    return _createdAt;
  }
  
  TemporalDateTime? get updatedAt {
    return _updatedAt;
  }
  
  const Survey._internal({required this.id, required name, required description, intervention, required questions, required tags, required surveyType, schemeVersion, archived, createdAt, updatedAt}): _name = name, _description = description, _intervention = intervention, _questions = questions, _tags = tags, _surveyType = surveyType, _schemeVersion = schemeVersion, _archived = archived, _createdAt = createdAt, _updatedAt = updatedAt;
  
  factory Survey({String? id, required I18nString name, required I18nString description, Intervention? intervention, required List<Question> questions, required List<SurveySurveyTagRelation> tags, required SurveyType surveyType, int? schemeVersion, bool? archived}) {
    return Survey._internal(
      id: id == null ? UUID.getUUID() : id,
      name: name,
      description: description,
      intervention: intervention,
      questions: questions != null ? List<Question>.unmodifiable(questions) : questions,
      tags: tags != null ? List<SurveySurveyTagRelation>.unmodifiable(tags) : tags,
      surveyType: surveyType,
      schemeVersion: schemeVersion,
      archived: archived);
  }
  
  bool equals(Object other) {
    return this == other;
  }
  
  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is Survey &&
      id == other.id &&
      _name == other._name &&
      _description == other._description &&
      _intervention == other._intervention &&
      DeepCollectionEquality().equals(_questions, other._questions) &&
      DeepCollectionEquality().equals(_tags, other._tags) &&
      _surveyType == other._surveyType &&
      _schemeVersion == other._schemeVersion &&
      _archived == other._archived;
  }
  
  @override
  int get hashCode => toString().hashCode;
  
  @override
  String toString() {
    var buffer = new StringBuffer();
    
    buffer.write("Survey {");
    buffer.write("id=" + "$id" + ", ");
    buffer.write("name=" + (_name != null ? _name!.toString() : "null") + ", ");
    buffer.write("description=" + (_description != null ? _description!.toString() : "null") + ", ");
    buffer.write("intervention=" + (_intervention != null ? _intervention!.toString() : "null") + ", ");
    buffer.write("questions=" + (_questions != null ? _questions!.toString() : "null") + ", ");
    buffer.write("surveyType=" + (_surveyType != null ? enumToString(_surveyType)! : "null") + ", ");
    buffer.write("schemeVersion=" + (_schemeVersion != null ? _schemeVersion!.toString() : "null") + ", ");
    buffer.write("archived=" + (_archived != null ? _archived!.toString() : "null") + ", ");
    buffer.write("createdAt=" + (_createdAt != null ? _createdAt!.format() : "null") + ", ");
    buffer.write("updatedAt=" + (_updatedAt != null ? _updatedAt!.format() : "null"));
    buffer.write("}");
    
    return buffer.toString();
  }
  
  Survey copyWith({I18nString? name, I18nString? description, Intervention? intervention, List<Question>? questions, List<SurveySurveyTagRelation>? tags, SurveyType? surveyType, int? schemeVersion, bool? archived}) {
    return Survey._internal(
      id: id,
      name: name ?? this.name,
      description: description ?? this.description,
      intervention: intervention ?? this.intervention,
      questions: questions ?? this.questions,
      tags: tags ?? this.tags,
      surveyType: surveyType ?? this.surveyType,
      schemeVersion: schemeVersion ?? this.schemeVersion,
      archived: archived ?? this.archived);
  }
  
  Survey.fromJson(Map<String, dynamic> json)  
    : id = json['id'],
      _name = json['name']?['serializedData'] != null
        ? I18nString.fromJson(new Map<String, dynamic>.from(json['name']['serializedData']))
        : null,
      _description = json['description']?['serializedData'] != null
        ? I18nString.fromJson(new Map<String, dynamic>.from(json['description']['serializedData']))
        : null,
      _intervention = json['intervention']?['serializedData'] != null
        ? Intervention.fromJson(new Map<String, dynamic>.from(json['intervention']['serializedData']))
        : null,
      _questions = json['questions'] is List
        ? (json['questions'] as List)
          .where((e) => e != null)
          .map((e) => Question.fromJson(new Map<String, dynamic>.from(e['serializedData'])))
          .toList()
        : null,
      _tags = json['tags'] is List
        ? (json['tags'] as List)
          .where((e) => e?['serializedData'] != null)
          .map((e) => SurveySurveyTagRelation.fromJson(new Map<String, dynamic>.from(e['serializedData'])))
          .toList()
        : null,
      _surveyType = enumFromString<SurveyType>(json['surveyType'], SurveyType.values),
      _schemeVersion = (json['schemeVersion'] as num?)?.toInt(),
      _archived = json['archived'],
      _createdAt = json['createdAt'] != null ? TemporalDateTime.fromString(json['createdAt']) : null,
      _updatedAt = json['updatedAt'] != null ? TemporalDateTime.fromString(json['updatedAt']) : null;
  
  Map<String, dynamic> toJson() => {
    'id': id, 'name': _name?.toJson(), 'description': _description?.toJson(), 'intervention': _intervention?.toJson(), 'questions': _questions?.map((Question? e) => e?.toJson()).toList(), 'tags': _tags?.map((SurveySurveyTagRelation? e) => e?.toJson()).toList(), 'surveyType': enumToString(_surveyType), 'schemeVersion': _schemeVersion, 'archived': _archived, 'createdAt': _createdAt?.format(), 'updatedAt': _updatedAt?.format()
  };
  
  Map<String, Object?> toMap() => {
    'id': id, 'name': _name, 'description': _description, 'intervention': _intervention, 'questions': _questions, 'tags': _tags, 'surveyType': _surveyType, 'schemeVersion': _schemeVersion, 'archived': _archived, 'createdAt': _createdAt, 'updatedAt': _updatedAt
  };

  static final QueryModelIdentifier<SurveyModelIdentifier> MODEL_IDENTIFIER = QueryModelIdentifier<SurveyModelIdentifier>();
  static final QueryField ID = QueryField(fieldName: "id");
  static final QueryField NAME = QueryField(fieldName: "name");
  static final QueryField DESCRIPTION = QueryField(fieldName: "description");
  static final QueryField INTERVENTION = QueryField(
    fieldName: "intervention",
    fieldType: ModelFieldType(ModelFieldTypeEnum.model, ofModelName: 'Intervention'));
  static final QueryField QUESTIONS = QueryField(fieldName: "questions");
  static final QueryField TAGS = QueryField(
    fieldName: "tags",
    fieldType: ModelFieldType(ModelFieldTypeEnum.model, ofModelName: 'SurveySurveyTagRelation'));
  static final QueryField SURVEYTYPE = QueryField(fieldName: "surveyType");
  static final QueryField SCHEMEVERSION = QueryField(fieldName: "schemeVersion");
  static final QueryField ARCHIVED = QueryField(fieldName: "archived");
  static var schema = Model.defineSchema(define: (ModelSchemaDefinition modelSchemaDefinition) {
    modelSchemaDefinition.name = "Survey";
    modelSchemaDefinition.pluralName = "Surveys";
    
    modelSchemaDefinition.authRules = [
      AuthRule(
        authStrategy: AuthStrategy.OWNER,
        ownerField: "organization_id",
        identityClaim: "custom:organization_id",
        provider: AuthRuleProvider.USERPOOLS,
        operations: [
          ModelOperation.CREATE,
          ModelOperation.UPDATE,
          ModelOperation.DELETE,
          ModelOperation.READ
        ])
    ];
    
    modelSchemaDefinition.addField(ModelFieldDefinition.id());
    
    modelSchemaDefinition.addField(ModelFieldDefinition.embedded(
      fieldName: 'name',
      isRequired: true,
      ofType: ModelFieldType(ModelFieldTypeEnum.embedded, ofCustomTypeName: 'I18nString')
    ));
    
    modelSchemaDefinition.addField(ModelFieldDefinition.embedded(
      fieldName: 'description',
      isRequired: true,
      ofType: ModelFieldType(ModelFieldTypeEnum.embedded, ofCustomTypeName: 'I18nString')
    ));
    
    modelSchemaDefinition.addField(ModelFieldDefinition.belongsTo(
      key: Survey.INTERVENTION,
      isRequired: false,
      targetNames: ['interventionSurveysId'],
      ofModelName: 'Intervention'
    ));
    
    modelSchemaDefinition.addField(ModelFieldDefinition.embedded(
      fieldName: 'questions',
      isRequired: true,
      isArray: true,
      ofType: ModelFieldType(ModelFieldTypeEnum.embeddedCollection, ofCustomTypeName: 'Question')
    ));
    
    modelSchemaDefinition.addField(ModelFieldDefinition.hasMany(
      key: Survey.TAGS,
      isRequired: true,
      ofModelName: 'SurveySurveyTagRelation',
      associatedKey: SurveySurveyTagRelation.SURVEY
    ));
    
    modelSchemaDefinition.addField(ModelFieldDefinition.field(
      key: Survey.SURVEYTYPE,
      isRequired: true,
      ofType: ModelFieldType(ModelFieldTypeEnum.enumeration)
    ));
    
    modelSchemaDefinition.addField(ModelFieldDefinition.field(
      key: Survey.SCHEMEVERSION,
      isRequired: false,
      ofType: ModelFieldType(ModelFieldTypeEnum.int)
    ));
    
    modelSchemaDefinition.addField(ModelFieldDefinition.field(
      key: Survey.ARCHIVED,
      isRequired: false,
      ofType: ModelFieldType(ModelFieldTypeEnum.bool)
    ));
    
    modelSchemaDefinition.addField(ModelFieldDefinition.nonQueryField(
      fieldName: 'createdAt',
      isRequired: false,
      isReadOnly: true,
      ofType: ModelFieldType(ModelFieldTypeEnum.dateTime)
    ));
    
    modelSchemaDefinition.addField(ModelFieldDefinition.nonQueryField(
      fieldName: 'updatedAt',
      isRequired: false,
      isReadOnly: true,
      ofType: ModelFieldType(ModelFieldTypeEnum.dateTime)
    ));
  });
}

class _SurveyModelType extends ModelType<Survey> {
  const _SurveyModelType();
  
  @override
  Survey fromJson(Map<String, dynamic> jsonData) {
    return Survey.fromJson(jsonData);
  }
  
  @override
  String modelName() {
    return 'Survey';
  }
}

/**
 * This is an auto generated class representing the model identifier
 * of [Survey] in your schema.
 */
@immutable
class SurveyModelIdentifier implements ModelIdentifier<Survey> {
  final String id;

  /** Create an instance of SurveyModelIdentifier using [id] the primary key. */
  const SurveyModelIdentifier({
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
  String toString() => 'SurveyModelIdentifier(id: $id)';
  
  @override
  bool operator ==(Object other) {
    if (identical(this, other)) {
      return true;
    }
    
    return other is SurveyModelIdentifier &&
      id == other.id;
  }
  
  @override
  int get hashCode =>
    id.hashCode;
}