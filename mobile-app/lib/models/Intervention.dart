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


/** This is an auto generated class representing the Intervention type in your schema. */
@immutable
class Intervention extends Model {
  static const classType = const _InterventionModelType();
  final String id;
  final I18nString? _name;
  final I18nString? _description;
  final InterventionType? _interventionType;
  final List<InterventionContentRelation>? _contents;
  final List<Survey>? _surveys;
  final List<InterventionInterventionTagRelation>? _tags;
  final int? _schemeVersion;
  final List<LevelInterventionRelation>? _levels;
  final TemporalDateTime? _createdAt;
  final TemporalDateTime? _updatedAt;

  @override
  getInstanceType() => classType;
  
  @Deprecated('[getId] is being deprecated in favor of custom primary key feature. Use getter [modelIdentifier] to get model identifier.')
  @override
  String getId() => id;
  
  InterventionModelIdentifier get modelIdentifier {
      return InterventionModelIdentifier(
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
  
  InterventionType get interventionType {
    try {
      return _interventionType!;
    } catch(e) {
      throw new AmplifyCodeGenModelException(
          AmplifyExceptionMessages.codeGenRequiredFieldForceCastExceptionMessage,
          recoverySuggestion:
            AmplifyExceptionMessages.codeGenRequiredFieldForceCastRecoverySuggestion,
          underlyingException: e.toString()
          );
    }
  }
  
  List<InterventionContentRelation> get contents {
    try {
      return _contents!;
    } catch(e) {
      throw new AmplifyCodeGenModelException(
          AmplifyExceptionMessages.codeGenRequiredFieldForceCastExceptionMessage,
          recoverySuggestion:
            AmplifyExceptionMessages.codeGenRequiredFieldForceCastRecoverySuggestion,
          underlyingException: e.toString()
          );
    }
  }
  
  List<Survey> get surveys {
    try {
      return _surveys!;
    } catch(e) {
      throw new AmplifyCodeGenModelException(
          AmplifyExceptionMessages.codeGenRequiredFieldForceCastExceptionMessage,
          recoverySuggestion:
            AmplifyExceptionMessages.codeGenRequiredFieldForceCastRecoverySuggestion,
          underlyingException: e.toString()
          );
    }
  }
  
  List<InterventionInterventionTagRelation> get tags {
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
  
  int? get schemeVersion {
    return _schemeVersion;
  }
  
  List<LevelInterventionRelation> get levels {
    try {
      return _levels!;
    } catch(e) {
      throw new AmplifyCodeGenModelException(
          AmplifyExceptionMessages.codeGenRequiredFieldForceCastExceptionMessage,
          recoverySuggestion:
            AmplifyExceptionMessages.codeGenRequiredFieldForceCastRecoverySuggestion,
          underlyingException: e.toString()
          );
    }
  }
  
  TemporalDateTime? get createdAt {
    return _createdAt;
  }
  
  TemporalDateTime? get updatedAt {
    return _updatedAt;
  }
  
  const Intervention._internal({required this.id, required name, required description, required interventionType, required contents, required surveys, required tags, schemeVersion, required levels, createdAt, updatedAt}): _name = name, _description = description, _interventionType = interventionType, _contents = contents, _surveys = surveys, _tags = tags, _schemeVersion = schemeVersion, _levels = levels, _createdAt = createdAt, _updatedAt = updatedAt;
  
  factory Intervention({String? id, required I18nString name, required I18nString description, required InterventionType interventionType, required List<InterventionContentRelation> contents, required List<Survey> surveys, required List<InterventionInterventionTagRelation> tags, int? schemeVersion, required List<LevelInterventionRelation> levels}) {
    return Intervention._internal(
      id: id == null ? UUID.getUUID() : id,
      name: name,
      description: description,
      interventionType: interventionType,
      contents: contents != null ? List<InterventionContentRelation>.unmodifiable(contents) : contents,
      surveys: surveys != null ? List<Survey>.unmodifiable(surveys) : surveys,
      tags: tags != null ? List<InterventionInterventionTagRelation>.unmodifiable(tags) : tags,
      schemeVersion: schemeVersion,
      levels: levels != null ? List<LevelInterventionRelation>.unmodifiable(levels) : levels);
  }
  
  bool equals(Object other) {
    return this == other;
  }
  
  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is Intervention &&
      id == other.id &&
      _name == other._name &&
      _description == other._description &&
      _interventionType == other._interventionType &&
      DeepCollectionEquality().equals(_contents, other._contents) &&
      DeepCollectionEquality().equals(_surveys, other._surveys) &&
      DeepCollectionEquality().equals(_tags, other._tags) &&
      _schemeVersion == other._schemeVersion &&
      DeepCollectionEquality().equals(_levels, other._levels);
  }
  
  @override
  int get hashCode => toString().hashCode;
  
  @override
  String toString() {
    var buffer = new StringBuffer();
    
    buffer.write("Intervention {");
    buffer.write("id=" + "$id" + ", ");
    buffer.write("name=" + (_name != null ? _name!.toString() : "null") + ", ");
    buffer.write("description=" + (_description != null ? _description!.toString() : "null") + ", ");
    buffer.write("interventionType=" + (_interventionType != null ? enumToString(_interventionType)! : "null") + ", ");
    buffer.write("schemeVersion=" + (_schemeVersion != null ? _schemeVersion!.toString() : "null") + ", ");
    buffer.write("createdAt=" + (_createdAt != null ? _createdAt!.format() : "null") + ", ");
    buffer.write("updatedAt=" + (_updatedAt != null ? _updatedAt!.format() : "null"));
    buffer.write("}");
    
    return buffer.toString();
  }
  
  Intervention copyWith({I18nString? name, I18nString? description, InterventionType? interventionType, List<InterventionContentRelation>? contents, List<Survey>? surveys, List<InterventionInterventionTagRelation>? tags, int? schemeVersion, List<LevelInterventionRelation>? levels}) {
    return Intervention._internal(
      id: id,
      name: name ?? this.name,
      description: description ?? this.description,
      interventionType: interventionType ?? this.interventionType,
      contents: contents ?? this.contents,
      surveys: surveys ?? this.surveys,
      tags: tags ?? this.tags,
      schemeVersion: schemeVersion ?? this.schemeVersion,
      levels: levels ?? this.levels);
  }
  
  Intervention.fromJson(Map<String, dynamic> json)  
    : id = json['id'],
      _name = json['name']?['serializedData'] != null
        ? I18nString.fromJson(new Map<String, dynamic>.from(json['name']['serializedData']))
        : null,
      _description = json['description']?['serializedData'] != null
        ? I18nString.fromJson(new Map<String, dynamic>.from(json['description']['serializedData']))
        : null,
      _interventionType = enumFromString<InterventionType>(json['interventionType'], InterventionType.values),
      _contents = json['contents'] is List
        ? (json['contents'] as List)
          .where((e) => e?['serializedData'] != null)
          .map((e) => InterventionContentRelation.fromJson(new Map<String, dynamic>.from(e['serializedData'])))
          .toList()
        : null,
      _surveys = json['surveys'] is List
        ? (json['surveys'] as List)
          .where((e) => e?['serializedData'] != null)
          .map((e) => Survey.fromJson(new Map<String, dynamic>.from(e['serializedData'])))
          .toList()
        : null,
      _tags = json['tags'] is List
        ? (json['tags'] as List)
          .where((e) => e?['serializedData'] != null)
          .map((e) => InterventionInterventionTagRelation.fromJson(new Map<String, dynamic>.from(e['serializedData'])))
          .toList()
        : null,
      _schemeVersion = (json['schemeVersion'] as num?)?.toInt(),
      _levels = json['levels'] is List
        ? (json['levels'] as List)
          .where((e) => e?['serializedData'] != null)
          .map((e) => LevelInterventionRelation.fromJson(new Map<String, dynamic>.from(e['serializedData'])))
          .toList()
        : null,
      _createdAt = json['createdAt'] != null ? TemporalDateTime.fromString(json['createdAt']) : null,
      _updatedAt = json['updatedAt'] != null ? TemporalDateTime.fromString(json['updatedAt']) : null;
  
  Map<String, dynamic> toJson() => {
    'id': id, 'name': _name?.toJson(), 'description': _description?.toJson(), 'interventionType': enumToString(_interventionType), 'contents': _contents?.map((InterventionContentRelation? e) => e?.toJson()).toList(), 'surveys': _surveys?.map((Survey? e) => e?.toJson()).toList(), 'tags': _tags?.map((InterventionInterventionTagRelation? e) => e?.toJson()).toList(), 'schemeVersion': _schemeVersion, 'levels': _levels?.map((LevelInterventionRelation? e) => e?.toJson()).toList(), 'createdAt': _createdAt?.format(), 'updatedAt': _updatedAt?.format()
  };
  
  Map<String, Object?> toMap() => {
    'id': id, 'name': _name, 'description': _description, 'interventionType': _interventionType, 'contents': _contents, 'surveys': _surveys, 'tags': _tags, 'schemeVersion': _schemeVersion, 'levels': _levels, 'createdAt': _createdAt, 'updatedAt': _updatedAt
  };

  static final QueryModelIdentifier<InterventionModelIdentifier> MODEL_IDENTIFIER = QueryModelIdentifier<InterventionModelIdentifier>();
  static final QueryField ID = QueryField(fieldName: "id");
  static final QueryField NAME = QueryField(fieldName: "name");
  static final QueryField DESCRIPTION = QueryField(fieldName: "description");
  static final QueryField INTERVENTIONTYPE = QueryField(fieldName: "interventionType");
  static final QueryField CONTENTS = QueryField(
    fieldName: "contents",
    fieldType: ModelFieldType(ModelFieldTypeEnum.model, ofModelName: 'InterventionContentRelation'));
  static final QueryField SURVEYS = QueryField(
    fieldName: "surveys",
    fieldType: ModelFieldType(ModelFieldTypeEnum.model, ofModelName: 'Survey'));
  static final QueryField TAGS = QueryField(
    fieldName: "tags",
    fieldType: ModelFieldType(ModelFieldTypeEnum.model, ofModelName: 'InterventionInterventionTagRelation'));
  static final QueryField SCHEMEVERSION = QueryField(fieldName: "schemeVersion");
  static final QueryField LEVELS = QueryField(
    fieldName: "levels",
    fieldType: ModelFieldType(ModelFieldTypeEnum.model, ofModelName: 'LevelInterventionRelation'));
  static var schema = Model.defineSchema(define: (ModelSchemaDefinition modelSchemaDefinition) {
    modelSchemaDefinition.name = "Intervention";
    modelSchemaDefinition.pluralName = "Interventions";
    
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
    
    modelSchemaDefinition.addField(ModelFieldDefinition.field(
      key: Intervention.INTERVENTIONTYPE,
      isRequired: true,
      ofType: ModelFieldType(ModelFieldTypeEnum.enumeration)
    ));
    
    modelSchemaDefinition.addField(ModelFieldDefinition.hasMany(
      key: Intervention.CONTENTS,
      isRequired: true,
      ofModelName: 'InterventionContentRelation',
      associatedKey: InterventionContentRelation.INTERVENTION
    ));
    
    modelSchemaDefinition.addField(ModelFieldDefinition.hasMany(
      key: Intervention.SURVEYS,
      isRequired: true,
      ofModelName: 'Survey',
      associatedKey: Survey.INTERVENTION
    ));
    
    modelSchemaDefinition.addField(ModelFieldDefinition.hasMany(
      key: Intervention.TAGS,
      isRequired: true,
      ofModelName: 'InterventionInterventionTagRelation',
      associatedKey: InterventionInterventionTagRelation.INTERVENTION
    ));
    
    modelSchemaDefinition.addField(ModelFieldDefinition.field(
      key: Intervention.SCHEMEVERSION,
      isRequired: false,
      ofType: ModelFieldType(ModelFieldTypeEnum.int)
    ));
    
    modelSchemaDefinition.addField(ModelFieldDefinition.hasMany(
      key: Intervention.LEVELS,
      isRequired: true,
      ofModelName: 'LevelInterventionRelation',
      associatedKey: LevelInterventionRelation.INTERVENTION
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

class _InterventionModelType extends ModelType<Intervention> {
  const _InterventionModelType();
  
  @override
  Intervention fromJson(Map<String, dynamic> jsonData) {
    return Intervention.fromJson(jsonData);
  }
  
  @override
  String modelName() {
    return 'Intervention';
  }
}

/**
 * This is an auto generated class representing the model identifier
 * of [Intervention] in your schema.
 */
@immutable
class InterventionModelIdentifier implements ModelIdentifier<Intervention> {
  final String id;

  /** Create an instance of InterventionModelIdentifier using [id] the primary key. */
  const InterventionModelIdentifier({
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
  String toString() => 'InterventionModelIdentifier(id: $id)';
  
  @override
  bool operator ==(Object other) {
    if (identical(this, other)) {
      return true;
    }
    
    return other is InterventionModelIdentifier &&
      id == other.id;
  }
  
  @override
  int get hashCode =>
    id.hashCode;
}