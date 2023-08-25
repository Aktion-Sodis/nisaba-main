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


/** This is an auto generated class representing the Level type in your schema. */
class Level extends amplify_core.Model {
  static const classType = const _LevelModelType();
  final String id;
  final I18nString? _name;
  final I18nString? _description;
  final String? _parentLevelID;
  final bool? _interventionsAreAllowed;
  final List<LevelInterventionRelation>? _allowedInterventions;
  final List<CustomData>? _customData;
  final int? _schemeVersion;
  final amplify_core.TemporalDateTime? _createdAt;
  final amplify_core.TemporalDateTime? _updatedAt;

  @override
  getInstanceType() => classType;
  
  @Deprecated('[getId] is being deprecated in favor of custom primary key feature. Use getter [modelIdentifier] to get model identifier.')
  @override
  String getId() => id;
  
  LevelModelIdentifier get modelIdentifier {
      return LevelModelIdentifier(
        id: id
      );
  }
  
  I18nString get name {
    try {
      return _name!;
    } catch(e) {
      throw amplify_core.AmplifyCodeGenModelException(
          amplify_core.AmplifyExceptionMessages.codeGenRequiredFieldForceCastExceptionMessage,
          recoverySuggestion:
            amplify_core.AmplifyExceptionMessages.codeGenRequiredFieldForceCastRecoverySuggestion,
          underlyingException: e.toString()
          );
    }
  }
  
  I18nString get description {
    try {
      return _description!;
    } catch(e) {
      throw amplify_core.AmplifyCodeGenModelException(
          amplify_core.AmplifyExceptionMessages.codeGenRequiredFieldForceCastExceptionMessage,
          recoverySuggestion:
            amplify_core.AmplifyExceptionMessages.codeGenRequiredFieldForceCastRecoverySuggestion,
          underlyingException: e.toString()
          );
    }
  }
  
  String? get parentLevelID {
    return _parentLevelID;
  }
  
  bool get interventionsAreAllowed {
    try {
      return _interventionsAreAllowed!;
    } catch(e) {
      throw amplify_core.AmplifyCodeGenModelException(
          amplify_core.AmplifyExceptionMessages.codeGenRequiredFieldForceCastExceptionMessage,
          recoverySuggestion:
            amplify_core.AmplifyExceptionMessages.codeGenRequiredFieldForceCastRecoverySuggestion,
          underlyingException: e.toString()
          );
    }
  }
  
  List<LevelInterventionRelation>? get allowedInterventions {
    return _allowedInterventions;
  }
  
  List<CustomData> get customData {
    try {
      return _customData!;
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
  
  const Level._internal({required this.id, required name, required description, parentLevelID, required interventionsAreAllowed, allowedInterventions, required customData, schemeVersion, createdAt, updatedAt}): _name = name, _description = description, _parentLevelID = parentLevelID, _interventionsAreAllowed = interventionsAreAllowed, _allowedInterventions = allowedInterventions, _customData = customData, _schemeVersion = schemeVersion, _createdAt = createdAt, _updatedAt = updatedAt;
  
  factory Level({String? id, required I18nString name, required I18nString description, String? parentLevelID, required bool interventionsAreAllowed, List<LevelInterventionRelation>? allowedInterventions, required List<CustomData> customData, int? schemeVersion}) {
    return Level._internal(
      id: id == null ? amplify_core.UUID.getUUID() : id,
      name: name,
      description: description,
      parentLevelID: parentLevelID,
      interventionsAreAllowed: interventionsAreAllowed,
      allowedInterventions: allowedInterventions != null ? List<LevelInterventionRelation>.unmodifiable(allowedInterventions) : allowedInterventions,
      customData: customData != null ? List<CustomData>.unmodifiable(customData) : customData,
      schemeVersion: schemeVersion);
  }
  
  bool equals(Object other) {
    return this == other;
  }
  
  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is Level &&
      id == other.id &&
      _name == other._name &&
      _description == other._description &&
      _parentLevelID == other._parentLevelID &&
      _interventionsAreAllowed == other._interventionsAreAllowed &&
      DeepCollectionEquality().equals(_allowedInterventions, other._allowedInterventions) &&
      DeepCollectionEquality().equals(_customData, other._customData) &&
      _schemeVersion == other._schemeVersion;
  }
  
  @override
  int get hashCode => toString().hashCode;
  
  @override
  String toString() {
    var buffer = new StringBuffer();
    
    buffer.write("Level {");
    buffer.write("id=" + "$id" + ", ");
    buffer.write("name=" + (_name != null ? _name!.toString() : "null") + ", ");
    buffer.write("description=" + (_description != null ? _description!.toString() : "null") + ", ");
    buffer.write("parentLevelID=" + "$_parentLevelID" + ", ");
    buffer.write("interventionsAreAllowed=" + (_interventionsAreAllowed != null ? _interventionsAreAllowed!.toString() : "null") + ", ");
    buffer.write("customData=" + (_customData != null ? _customData!.toString() : "null") + ", ");
    buffer.write("schemeVersion=" + (_schemeVersion != null ? _schemeVersion!.toString() : "null") + ", ");
    buffer.write("createdAt=" + (_createdAt != null ? _createdAt!.format() : "null") + ", ");
    buffer.write("updatedAt=" + (_updatedAt != null ? _updatedAt!.format() : "null"));
    buffer.write("}");
    
    return buffer.toString();
  }
  
  Level copyWith({I18nString? name, I18nString? description, String? parentLevelID, bool? interventionsAreAllowed, List<LevelInterventionRelation>? allowedInterventions, List<CustomData>? customData, int? schemeVersion}) {
    return Level._internal(
      id: id,
      name: name ?? this.name,
      description: description ?? this.description,
      parentLevelID: parentLevelID ?? this.parentLevelID,
      interventionsAreAllowed: interventionsAreAllowed ?? this.interventionsAreAllowed,
      allowedInterventions: allowedInterventions ?? this.allowedInterventions,
      customData: customData ?? this.customData,
      schemeVersion: schemeVersion ?? this.schemeVersion);
  }
  
  Level copyWithModelFieldValues({
    ModelFieldValue<I18nString>? name,
    ModelFieldValue<I18nString>? description,
    ModelFieldValue<String?>? parentLevelID,
    ModelFieldValue<bool>? interventionsAreAllowed,
    ModelFieldValue<List<LevelInterventionRelation>>? allowedInterventions,
    ModelFieldValue<List<CustomData>>? customData,
    ModelFieldValue<int?>? schemeVersion
  }) {
    return Level._internal(
      id: id,
      name: name == null ? this.name : name.value,
      description: description == null ? this.description : description.value,
      parentLevelID: parentLevelID == null ? this.parentLevelID : parentLevelID.value,
      interventionsAreAllowed: interventionsAreAllowed == null ? this.interventionsAreAllowed : interventionsAreAllowed.value,
      allowedInterventions: allowedInterventions == null ? this.allowedInterventions : allowedInterventions.value,
      customData: customData == null ? this.customData : customData.value,
      schemeVersion: schemeVersion == null ? this.schemeVersion : schemeVersion.value
    );
  }
  
  Level.fromJson(Map<String, dynamic> json)  
    : id = json['id'],
      _name = json['name']?['serializedData'] != null
        ? I18nString.fromJson(new Map<String, dynamic>.from(json['name']['serializedData']))
        : null,
      _description = json['description']?['serializedData'] != null
        ? I18nString.fromJson(new Map<String, dynamic>.from(json['description']['serializedData']))
        : null,
      _parentLevelID = json['parentLevelID'],
      _interventionsAreAllowed = json['interventionsAreAllowed'],
      _allowedInterventions = json['allowedInterventions'] is List
        ? (json['allowedInterventions'] as List)
          .where((e) => e?['serializedData'] != null)
          .map((e) => LevelInterventionRelation.fromJson(new Map<String, dynamic>.from(e['serializedData'])))
          .toList()
        : null,
      _customData = json['customData'] is List
        ? (json['customData'] as List)
          .where((e) => e != null)
          .map((e) => CustomData.fromJson(new Map<String, dynamic>.from(e['serializedData'])))
          .toList()
        : null,
      _schemeVersion = (json['schemeVersion'] as num?)?.toInt(),
      _createdAt = json['createdAt'] != null ? amplify_core.TemporalDateTime.fromString(json['createdAt']) : null,
      _updatedAt = json['updatedAt'] != null ? amplify_core.TemporalDateTime.fromString(json['updatedAt']) : null;
  
  Map<String, dynamic> toJson() => {
    'id': id, 'name': _name?.toJson(), 'description': _description?.toJson(), 'parentLevelID': _parentLevelID, 'interventionsAreAllowed': _interventionsAreAllowed, 'allowedInterventions': _allowedInterventions?.map((LevelInterventionRelation? e) => e?.toJson()).toList(), 'customData': _customData?.map((CustomData? e) => e?.toJson()).toList(), 'schemeVersion': _schemeVersion, 'createdAt': _createdAt?.format(), 'updatedAt': _updatedAt?.format()
  };
  
  Map<String, Object?> toMap() => {
    'id': id,
    'name': _name,
    'description': _description,
    'parentLevelID': _parentLevelID,
    'interventionsAreAllowed': _interventionsAreAllowed,
    'allowedInterventions': _allowedInterventions,
    'customData': _customData,
    'schemeVersion': _schemeVersion,
    'createdAt': _createdAt,
    'updatedAt': _updatedAt
  };

  static final amplify_core.QueryModelIdentifier<LevelModelIdentifier> MODEL_IDENTIFIER = amplify_core.QueryModelIdentifier<LevelModelIdentifier>();
  static final ID = amplify_core.QueryField(fieldName: "id");
  static final NAME = amplify_core.QueryField(fieldName: "name");
  static final DESCRIPTION = amplify_core.QueryField(fieldName: "description");
  static final PARENTLEVELID = amplify_core.QueryField(fieldName: "parentLevelID");
  static final INTERVENTIONSAREALLOWED = amplify_core.QueryField(fieldName: "interventionsAreAllowed");
  static final ALLOWEDINTERVENTIONS = amplify_core.QueryField(
    fieldName: "allowedInterventions",
    fieldType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.model, ofModelName: 'LevelInterventionRelation'));
  static final CUSTOMDATA = amplify_core.QueryField(fieldName: "customData");
  static final SCHEMEVERSION = amplify_core.QueryField(fieldName: "schemeVersion");
  static var schema = amplify_core.Model.defineSchema(define: (amplify_core.ModelSchemaDefinition modelSchemaDefinition) {
    modelSchemaDefinition.name = "Level";
    modelSchemaDefinition.pluralName = "Levels";
    
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
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.id());
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.embedded(
      fieldName: 'name',
      isRequired: true,
      ofType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.embedded, ofCustomTypeName: 'I18nString')
    ));
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.embedded(
      fieldName: 'description',
      isRequired: true,
      ofType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.embedded, ofCustomTypeName: 'I18nString')
    ));
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.field(
      key: Level.PARENTLEVELID,
      isRequired: false,
      ofType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.string)
    ));
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.field(
      key: Level.INTERVENTIONSAREALLOWED,
      isRequired: true,
      ofType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.bool)
    ));
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.hasMany(
      key: Level.ALLOWEDINTERVENTIONS,
      isRequired: true,
      ofModelName: 'LevelInterventionRelation',
      associatedKey: LevelInterventionRelation.LEVEL
    ));
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.embedded(
      fieldName: 'customData',
      isRequired: true,
      isArray: true,
      ofType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.embeddedCollection, ofCustomTypeName: 'CustomData')
    ));
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.field(
      key: Level.SCHEMEVERSION,
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
  });
}

class _LevelModelType extends amplify_core.ModelType<Level> {
  const _LevelModelType();
  
  @override
  Level fromJson(Map<String, dynamic> jsonData) {
    return Level.fromJson(jsonData);
  }
  
  @override
  String modelName() {
    return 'Level';
  }
}

/**
 * This is an auto generated class representing the model identifier
 * of [Level] in your schema.
 */
class LevelModelIdentifier implements amplify_core.ModelIdentifier<Level> {
  final String id;

  /** Create an instance of LevelModelIdentifier using [id] the primary key. */
  const LevelModelIdentifier({
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
  String toString() => 'LevelModelIdentifier(id: $id)';
  
  @override
  bool operator ==(Object other) {
    if (identical(this, other)) {
      return true;
    }
    
    return other is LevelModelIdentifier &&
      id == other.id;
  }
  
  @override
  int get hashCode =>
    id.hashCode;
}