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


/** This is an auto generated class representing the Entity type in your schema. */
class Entity extends amplify_core.Model {
  static const classType = const _EntityModelType();
  final String id;
  final I18nString? _name;
  final I18nString? _description;
  final String? _parentEntityID;
  final Level? _level;
  final Location? _location;
  final List<AppliedCustomData>? _customData;
  final List<AppliedIntervention>? _appliedInterventions;
  final int? _schemeVersion;
  final amplify_core.TemporalDateTime? _createdAt;
  final amplify_core.TemporalDateTime? _updatedAt;
  final String? _entityLevelId;

  @override
  getInstanceType() => classType;
  
  @Deprecated('[getId] is being deprecated in favor of custom primary key feature. Use getter [modelIdentifier] to get model identifier.')
  @override
  String getId() => id;
  
  EntityModelIdentifier get modelIdentifier {
      return EntityModelIdentifier(
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
  
  String? get parentEntityID {
    return _parentEntityID;
  }
  
  Level get level {
    try {
      return _level!;
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
  
  List<AppliedCustomData> get customData {
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
  
  List<AppliedIntervention>? get appliedInterventions {
    return _appliedInterventions;
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
  
  String get entityLevelId {
    try {
      return _entityLevelId!;
    } catch(e) {
      throw amplify_core.AmplifyCodeGenModelException(
          amplify_core.AmplifyExceptionMessages.codeGenRequiredFieldForceCastExceptionMessage,
          recoverySuggestion:
            amplify_core.AmplifyExceptionMessages.codeGenRequiredFieldForceCastRecoverySuggestion,
          underlyingException: e.toString()
          );
    }
  }
  
  const Entity._internal({required this.id, required name, required description, parentEntityID, required level, location, required customData, appliedInterventions, schemeVersion, createdAt, updatedAt, required entityLevelId}): _name = name, _description = description, _parentEntityID = parentEntityID, _level = level, _location = location, _customData = customData, _appliedInterventions = appliedInterventions, _schemeVersion = schemeVersion, _createdAt = createdAt, _updatedAt = updatedAt, _entityLevelId = entityLevelId;
  
  factory Entity({String? id, required I18nString name, required I18nString description, String? parentEntityID, required Level level, Location? location, required List<AppliedCustomData> customData, List<AppliedIntervention>? appliedInterventions, int? schemeVersion, required String entityLevelId}) {
    return Entity._internal(
      id: id == null ? amplify_core.UUID.getUUID() : id,
      name: name,
      description: description,
      parentEntityID: parentEntityID,
      level: level,
      location: location,
      customData: customData != null ? List<AppliedCustomData>.unmodifiable(customData) : customData,
      appliedInterventions: appliedInterventions != null ? List<AppliedIntervention>.unmodifiable(appliedInterventions) : appliedInterventions,
      schemeVersion: schemeVersion,
      entityLevelId: entityLevelId);
  }
  
  bool equals(Object other) {
    return this == other;
  }
  
  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is Entity &&
      id == other.id &&
      _name == other._name &&
      _description == other._description &&
      _parentEntityID == other._parentEntityID &&
      _level == other._level &&
      _location == other._location &&
      DeepCollectionEquality().equals(_customData, other._customData) &&
      DeepCollectionEquality().equals(_appliedInterventions, other._appliedInterventions) &&
      _schemeVersion == other._schemeVersion &&
      _entityLevelId == other._entityLevelId;
  }
  
  @override
  int get hashCode => toString().hashCode;
  
  @override
  String toString() {
    var buffer = new StringBuffer();
    
    buffer.write("Entity {");
    buffer.write("id=" + "$id" + ", ");
    buffer.write("name=" + (_name != null ? _name!.toString() : "null") + ", ");
    buffer.write("description=" + (_description != null ? _description!.toString() : "null") + ", ");
    buffer.write("parentEntityID=" + "$_parentEntityID" + ", ");
    buffer.write("location=" + (_location != null ? _location!.toString() : "null") + ", ");
    buffer.write("customData=" + (_customData != null ? _customData!.toString() : "null") + ", ");
    buffer.write("schemeVersion=" + (_schemeVersion != null ? _schemeVersion!.toString() : "null") + ", ");
    buffer.write("createdAt=" + (_createdAt != null ? _createdAt!.format() : "null") + ", ");
    buffer.write("updatedAt=" + (_updatedAt != null ? _updatedAt!.format() : "null") + ", ");
    buffer.write("entityLevelId=" + "$_entityLevelId");
    buffer.write("}");
    
    return buffer.toString();
  }
  
  Entity copyWith({I18nString? name, I18nString? description, String? parentEntityID, Level? level, Location? location, List<AppliedCustomData>? customData, List<AppliedIntervention>? appliedInterventions, int? schemeVersion, String? entityLevelId}) {
    return Entity._internal(
      id: id,
      name: name ?? this.name,
      description: description ?? this.description,
      parentEntityID: parentEntityID ?? this.parentEntityID,
      level: level ?? this.level,
      location: location ?? this.location,
      customData: customData ?? this.customData,
      appliedInterventions: appliedInterventions ?? this.appliedInterventions,
      schemeVersion: schemeVersion ?? this.schemeVersion,
      entityLevelId: entityLevelId ?? this.entityLevelId);
  }
  
  Entity copyWithModelFieldValues({
    ModelFieldValue<I18nString>? name,
    ModelFieldValue<I18nString>? description,
    ModelFieldValue<String?>? parentEntityID,
    ModelFieldValue<Level>? level,
    ModelFieldValue<Location?>? location,
    ModelFieldValue<List<AppliedCustomData>?>? customData,
    ModelFieldValue<List<AppliedIntervention>>? appliedInterventions,
    ModelFieldValue<int?>? schemeVersion,
    ModelFieldValue<String>? entityLevelId
  }) {
    return Entity._internal(
      id: id,
      name: name == null ? this.name : name.value,
      description: description == null ? this.description : description.value,
      parentEntityID: parentEntityID == null ? this.parentEntityID : parentEntityID.value,
      level: level == null ? this.level : level.value,
      location: location == null ? this.location : location.value,
      customData: customData == null ? this.customData : customData.value,
      appliedInterventions: appliedInterventions == null ? this.appliedInterventions : appliedInterventions.value,
      schemeVersion: schemeVersion == null ? this.schemeVersion : schemeVersion.value,
      entityLevelId: entityLevelId == null ? this.entityLevelId : entityLevelId.value
    );
  }
  
  Entity.fromJson(Map<String, dynamic> json)  
    : id = json['id'],
      _name = json['name']?['serializedData'] != null
        ? I18nString.fromJson(new Map<String, dynamic>.from(json['name']['serializedData']))
        : null,
      _description = json['description']?['serializedData'] != null
        ? I18nString.fromJson(new Map<String, dynamic>.from(json['description']['serializedData']))
        : null,
      _parentEntityID = json['parentEntityID'],
      _level = json['level']?['serializedData'] != null
        ? Level.fromJson(new Map<String, dynamic>.from(json['level']['serializedData']))
        : null,
      _location = json['location']?['serializedData'] != null
        ? Location.fromJson(new Map<String, dynamic>.from(json['location']['serializedData']))
        : null,
      _customData = json['customData'] is List
        ? (json['customData'] as List)
          .where((e) => e != null)
          .map((e) => AppliedCustomData.fromJson(new Map<String, dynamic>.from(e['serializedData'])))
          .toList()
        : null,
      _appliedInterventions = json['appliedInterventions'] is List
        ? (json['appliedInterventions'] as List)
          .where((e) => e?['serializedData'] != null)
          .map((e) => AppliedIntervention.fromJson(new Map<String, dynamic>.from(e['serializedData'])))
          .toList()
        : null,
      _schemeVersion = (json['schemeVersion'] as num?)?.toInt(),
      _createdAt = json['createdAt'] != null ? amplify_core.TemporalDateTime.fromString(json['createdAt']) : null,
      _updatedAt = json['updatedAt'] != null ? amplify_core.TemporalDateTime.fromString(json['updatedAt']) : null,
      _entityLevelId = json['entityLevelId'];
  
  Map<String, dynamic> toJson() => {
    'id': id, 'name': _name?.toJson(), 'description': _description?.toJson(), 'parentEntityID': _parentEntityID, 'level': _level?.toJson(), 'location': _location?.toJson(), 'customData': _customData?.map((AppliedCustomData? e) => e?.toJson()).toList(), 'appliedInterventions': _appliedInterventions?.map((AppliedIntervention? e) => e?.toJson()).toList(), 'schemeVersion': _schemeVersion, 'createdAt': _createdAt?.format(), 'updatedAt': _updatedAt?.format(), 'entityLevelId': _entityLevelId
  };
  
  Map<String, Object?> toMap() => {
    'id': id,
    'name': _name,
    'description': _description,
    'parentEntityID': _parentEntityID,
    'level': _level,
    'location': _location,
    'customData': _customData,
    'appliedInterventions': _appliedInterventions,
    'schemeVersion': _schemeVersion,
    'createdAt': _createdAt,
    'updatedAt': _updatedAt,
    'entityLevelId': _entityLevelId
  };

  static final amplify_core.QueryModelIdentifier<EntityModelIdentifier> MODEL_IDENTIFIER = amplify_core.QueryModelIdentifier<EntityModelIdentifier>();
  static final ID = amplify_core.QueryField(fieldName: "id");
  static final NAME = amplify_core.QueryField(fieldName: "name");
  static final DESCRIPTION = amplify_core.QueryField(fieldName: "description");
  static final PARENTENTITYID = amplify_core.QueryField(fieldName: "parentEntityID");
  static final LEVEL = amplify_core.QueryField(
    fieldName: "level",
    fieldType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.model, ofModelName: 'Level'));
  static final LOCATION = amplify_core.QueryField(fieldName: "location");
  static final CUSTOMDATA = amplify_core.QueryField(fieldName: "customData");
  static final APPLIEDINTERVENTIONS = amplify_core.QueryField(
    fieldName: "appliedInterventions",
    fieldType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.model, ofModelName: 'AppliedIntervention'));
  static final SCHEMEVERSION = amplify_core.QueryField(fieldName: "schemeVersion");
  static final ENTITYLEVELID = amplify_core.QueryField(fieldName: "entityLevelId");
  static var schema = amplify_core.Model.defineSchema(define: (amplify_core.ModelSchemaDefinition modelSchemaDefinition) {
    modelSchemaDefinition.name = "Entity";
    modelSchemaDefinition.pluralName = "Entities";
    
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
      key: Entity.PARENTENTITYID,
      isRequired: false,
      ofType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.string)
    ));
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.hasOne(
      key: Entity.LEVEL,
      isRequired: true,
      ofModelName: (Level).toString(),
      associatedKey: Level.ID
    ));
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.embedded(
      fieldName: 'location',
      isRequired: false,
      ofType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.embedded, ofCustomTypeName: 'Location')
    ));
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.embedded(
      fieldName: 'customData',
      isRequired: true,
      isArray: true,
      ofType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.embeddedCollection, ofCustomTypeName: 'AppliedCustomData')
    ));
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.hasMany(
      key: Entity.APPLIEDINTERVENTIONS,
      isRequired: true,
      ofModelName: (AppliedIntervention).toString(),
      associatedKey: AppliedIntervention.ENTITYAPPLIEDINTERVENTIONSID
    ));
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.field(
      key: Entity.SCHEMEVERSION,
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
      key: Entity.ENTITYLEVELID,
      isRequired: true,
      ofType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.string)
    ));
  });
}

class _EntityModelType extends amplify_core.ModelType<Entity> {
  const _EntityModelType();
  
  @override
  Entity fromJson(Map<String, dynamic> jsonData) {
    return Entity.fromJson(jsonData);
  }
}

/**
 * This is an auto generated class representing the model identifier
 * of [Entity] in your schema.
 */
class EntityModelIdentifier implements amplify_core.ModelIdentifier<Entity> {
  final String id;

  /** Create an instance of EntityModelIdentifier using [id] the primary key. */
  const EntityModelIdentifier({
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
  String toString() => 'EntityModelIdentifier(id: $id)';
  
  @override
  bool operator ==(Object other) {
    if (identical(this, other)) {
      return true;
    }
    
    return other is EntityModelIdentifier &&
      id == other.id;
  }
  
  @override
  int get hashCode =>
    id.hashCode;
}