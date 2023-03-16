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


/** This is an auto generated class representing the AppliedIntervention type in your schema. */
@immutable
class AppliedIntervention extends Model {
  static const classType = const _AppliedInterventionModelType();
  final String id;
  final User? _whoDidIt;
  final Intervention? _intervention;
  final Location? _location;
  final bool? _isOkay;
  final List<ExecutedSurvey>? _executedSurveys;
  final int? _schemeVersion;
  final TemporalDateTime? _createdAt;
  final TemporalDateTime? _updatedAt;
  final String? _entityAppliedInterventionsId;
  final String? _appliedInterventionWhoDidItId;
  final String? _appliedInterventionInterventionId;

  @override
  getInstanceType() => classType;
  
  @Deprecated('[getId] is being deprecated in favor of custom primary key feature. Use getter [modelIdentifier] to get model identifier.')
  @override
  String getId() => id;
  
  AppliedInterventionModelIdentifier get modelIdentifier {
      return AppliedInterventionModelIdentifier(
        id: id
      );
  }
  
  User get whoDidIt {
    try {
      return _whoDidIt!;
    } catch(e) {
      throw new AmplifyCodeGenModelException(
          AmplifyExceptionMessages.codeGenRequiredFieldForceCastExceptionMessage,
          recoverySuggestion:
            AmplifyExceptionMessages.codeGenRequiredFieldForceCastRecoverySuggestion,
          underlyingException: e.toString()
          );
    }
  }
  
  Intervention get intervention {
    try {
      return _intervention!;
    } catch(e) {
      throw new AmplifyCodeGenModelException(
          AmplifyExceptionMessages.codeGenRequiredFieldForceCastExceptionMessage,
          recoverySuggestion:
            AmplifyExceptionMessages.codeGenRequiredFieldForceCastRecoverySuggestion,
          underlyingException: e.toString()
          );
    }
  }
  
  Location? get location {
    return _location;
  }
  
  bool get isOkay {
    try {
      return _isOkay!;
    } catch(e) {
      throw new AmplifyCodeGenModelException(
          AmplifyExceptionMessages.codeGenRequiredFieldForceCastExceptionMessage,
          recoverySuggestion:
            AmplifyExceptionMessages.codeGenRequiredFieldForceCastRecoverySuggestion,
          underlyingException: e.toString()
          );
    }
  }
  
  List<ExecutedSurvey> get executedSurveys {
    try {
      return _executedSurveys!;
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
  
  TemporalDateTime? get createdAt {
    return _createdAt;
  }
  
  TemporalDateTime? get updatedAt {
    return _updatedAt;
  }
  
  String? get entityAppliedInterventionsId {
    return _entityAppliedInterventionsId;
  }
  
  String get appliedInterventionWhoDidItId {
    try {
      return _appliedInterventionWhoDidItId!;
    } catch(e) {
      throw new AmplifyCodeGenModelException(
          AmplifyExceptionMessages.codeGenRequiredFieldForceCastExceptionMessage,
          recoverySuggestion:
            AmplifyExceptionMessages.codeGenRequiredFieldForceCastRecoverySuggestion,
          underlyingException: e.toString()
          );
    }
  }
  
  String get appliedInterventionInterventionId {
    try {
      return _appliedInterventionInterventionId!;
    } catch(e) {
      throw new AmplifyCodeGenModelException(
          AmplifyExceptionMessages.codeGenRequiredFieldForceCastExceptionMessage,
          recoverySuggestion:
            AmplifyExceptionMessages.codeGenRequiredFieldForceCastRecoverySuggestion,
          underlyingException: e.toString()
          );
    }
  }
  
  const AppliedIntervention._internal({required this.id, required whoDidIt, required intervention, location, required isOkay, required executedSurveys, schemeVersion, createdAt, updatedAt, entityAppliedInterventionsId, required appliedInterventionWhoDidItId, required appliedInterventionInterventionId}): _whoDidIt = whoDidIt, _intervention = intervention, _location = location, _isOkay = isOkay, _executedSurveys = executedSurveys, _schemeVersion = schemeVersion, _createdAt = createdAt, _updatedAt = updatedAt, _entityAppliedInterventionsId = entityAppliedInterventionsId, _appliedInterventionWhoDidItId = appliedInterventionWhoDidItId, _appliedInterventionInterventionId = appliedInterventionInterventionId;
  
  factory AppliedIntervention({String? id, required User whoDidIt, required Intervention intervention, Location? location, required bool isOkay, required List<ExecutedSurvey> executedSurveys, int? schemeVersion, String? entityAppliedInterventionsId, required String appliedInterventionWhoDidItId, required String appliedInterventionInterventionId}) {
    return AppliedIntervention._internal(
      id: id == null ? UUID.getUUID() : id,
      whoDidIt: whoDidIt,
      intervention: intervention,
      location: location,
      isOkay: isOkay,
      executedSurveys: executedSurveys != null ? List<ExecutedSurvey>.unmodifiable(executedSurveys) : executedSurveys,
      schemeVersion: schemeVersion,
      entityAppliedInterventionsId: entityAppliedInterventionsId,
      appliedInterventionWhoDidItId: appliedInterventionWhoDidItId,
      appliedInterventionInterventionId: appliedInterventionInterventionId);
  }
  
  bool equals(Object other) {
    return this == other;
  }
  
  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is AppliedIntervention &&
      id == other.id &&
      _whoDidIt == other._whoDidIt &&
      _intervention == other._intervention &&
      _location == other._location &&
      _isOkay == other._isOkay &&
      DeepCollectionEquality().equals(_executedSurveys, other._executedSurveys) &&
      _schemeVersion == other._schemeVersion &&
      _entityAppliedInterventionsId == other._entityAppliedInterventionsId &&
      _appliedInterventionWhoDidItId == other._appliedInterventionWhoDidItId &&
      _appliedInterventionInterventionId == other._appliedInterventionInterventionId;
  }
  
  @override
  int get hashCode => toString().hashCode;
  
  @override
  String toString() {
    var buffer = new StringBuffer();
    
    buffer.write("AppliedIntervention {");
    buffer.write("id=" + "$id" + ", ");
    buffer.write("location=" + (_location != null ? _location!.toString() : "null") + ", ");
    buffer.write("isOkay=" + (_isOkay != null ? _isOkay!.toString() : "null") + ", ");
    buffer.write("schemeVersion=" + (_schemeVersion != null ? _schemeVersion!.toString() : "null") + ", ");
    buffer.write("createdAt=" + (_createdAt != null ? _createdAt!.format() : "null") + ", ");
    buffer.write("updatedAt=" + (_updatedAt != null ? _updatedAt!.format() : "null") + ", ");
    buffer.write("entityAppliedInterventionsId=" + "$_entityAppliedInterventionsId" + ", ");
    buffer.write("appliedInterventionWhoDidItId=" + "$_appliedInterventionWhoDidItId" + ", ");
    buffer.write("appliedInterventionInterventionId=" + "$_appliedInterventionInterventionId");
    buffer.write("}");
    
    return buffer.toString();
  }
  
  AppliedIntervention copyWith({User? whoDidIt, Intervention? intervention, Location? location, bool? isOkay, List<ExecutedSurvey>? executedSurveys, int? schemeVersion, String? entityAppliedInterventionsId, String? appliedInterventionWhoDidItId, String? appliedInterventionInterventionId}) {
    return AppliedIntervention._internal(
      id: id,
      whoDidIt: whoDidIt ?? this.whoDidIt,
      intervention: intervention ?? this.intervention,
      location: location ?? this.location,
      isOkay: isOkay ?? this.isOkay,
      executedSurveys: executedSurveys ?? this.executedSurveys,
      schemeVersion: schemeVersion ?? this.schemeVersion,
      entityAppliedInterventionsId: entityAppliedInterventionsId ?? this.entityAppliedInterventionsId,
      appliedInterventionWhoDidItId: appliedInterventionWhoDidItId ?? this.appliedInterventionWhoDidItId,
      appliedInterventionInterventionId: appliedInterventionInterventionId ?? this.appliedInterventionInterventionId);
  }
  
  AppliedIntervention.fromJson(Map<String, dynamic> json)  
    : id = json['id'],
      _whoDidIt = json['whoDidIt']?['serializedData'] != null
        ? User.fromJson(new Map<String, dynamic>.from(json['whoDidIt']['serializedData']))
        : null,
      _intervention = json['intervention']?['serializedData'] != null
        ? Intervention.fromJson(new Map<String, dynamic>.from(json['intervention']['serializedData']))
        : null,
      _location = json['location']?['serializedData'] != null
        ? Location.fromJson(new Map<String, dynamic>.from(json['location']['serializedData']))
        : null,
      _isOkay = json['isOkay'],
      _executedSurveys = json['executedSurveys'] is List
        ? (json['executedSurveys'] as List)
          .where((e) => e?['serializedData'] != null)
          .map((e) => ExecutedSurvey.fromJson(new Map<String, dynamic>.from(e['serializedData'])))
          .toList()
        : null,
      _schemeVersion = (json['schemeVersion'] as num?)?.toInt(),
      _createdAt = json['createdAt'] != null ? TemporalDateTime.fromString(json['createdAt']) : null,
      _updatedAt = json['updatedAt'] != null ? TemporalDateTime.fromString(json['updatedAt']) : null,
      _entityAppliedInterventionsId = json['entityAppliedInterventionsId'],
      _appliedInterventionWhoDidItId = json['appliedInterventionWhoDidItId'],
      _appliedInterventionInterventionId = json['appliedInterventionInterventionId'];
  
  Map<String, dynamic> toJson() => {
    'id': id, 'whoDidIt': _whoDidIt?.toJson(), 'intervention': _intervention?.toJson(), 'location': _location?.toJson(), 'isOkay': _isOkay, 'executedSurveys': _executedSurveys?.map((ExecutedSurvey? e) => e?.toJson()).toList(), 'schemeVersion': _schemeVersion, 'createdAt': _createdAt?.format(), 'updatedAt': _updatedAt?.format(), 'entityAppliedInterventionsId': _entityAppliedInterventionsId, 'appliedInterventionWhoDidItId': _appliedInterventionWhoDidItId, 'appliedInterventionInterventionId': _appliedInterventionInterventionId
  };
  
  Map<String, Object?> toMap() => {
    'id': id, 'whoDidIt': _whoDidIt, 'intervention': _intervention, 'location': _location, 'isOkay': _isOkay, 'executedSurveys': _executedSurveys, 'schemeVersion': _schemeVersion, 'createdAt': _createdAt, 'updatedAt': _updatedAt, 'entityAppliedInterventionsId': _entityAppliedInterventionsId, 'appliedInterventionWhoDidItId': _appliedInterventionWhoDidItId, 'appliedInterventionInterventionId': _appliedInterventionInterventionId
  };

  static final QueryModelIdentifier<AppliedInterventionModelIdentifier> MODEL_IDENTIFIER = QueryModelIdentifier<AppliedInterventionModelIdentifier>();
  static final QueryField ID = QueryField(fieldName: "id");
  static final QueryField WHODIDIT = QueryField(
    fieldName: "whoDidIt",
    fieldType: ModelFieldType(ModelFieldTypeEnum.model, ofModelName: 'User'));
  static final QueryField INTERVENTION = QueryField(
    fieldName: "intervention",
    fieldType: ModelFieldType(ModelFieldTypeEnum.model, ofModelName: 'Intervention'));
  static final QueryField LOCATION = QueryField(fieldName: "location");
  static final QueryField ISOKAY = QueryField(fieldName: "isOkay");
  static final QueryField EXECUTEDSURVEYS = QueryField(
    fieldName: "executedSurveys",
    fieldType: ModelFieldType(ModelFieldTypeEnum.model, ofModelName: 'ExecutedSurvey'));
  static final QueryField SCHEMEVERSION = QueryField(fieldName: "schemeVersion");
  static final QueryField ENTITYAPPLIEDINTERVENTIONSID = QueryField(fieldName: "entityAppliedInterventionsId");
  static final QueryField APPLIEDINTERVENTIONWHODIDITID = QueryField(fieldName: "appliedInterventionWhoDidItId");
  static final QueryField APPLIEDINTERVENTIONINTERVENTIONID = QueryField(fieldName: "appliedInterventionInterventionId");
  static var schema = Model.defineSchema(define: (ModelSchemaDefinition modelSchemaDefinition) {
    modelSchemaDefinition.name = "AppliedIntervention";
    modelSchemaDefinition.pluralName = "AppliedInterventions";
    
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
    
    modelSchemaDefinition.addField(ModelFieldDefinition.hasOne(
      key: AppliedIntervention.WHODIDIT,
      isRequired: true,
      ofModelName: 'User',
      associatedKey: User.ID
    ));
    
    modelSchemaDefinition.addField(ModelFieldDefinition.hasOne(
      key: AppliedIntervention.INTERVENTION,
      isRequired: true,
      ofModelName: 'Intervention',
      associatedKey: Intervention.ID
    ));
    
    modelSchemaDefinition.addField(ModelFieldDefinition.embedded(
      fieldName: 'location',
      isRequired: false,
      ofType: ModelFieldType(ModelFieldTypeEnum.embedded, ofCustomTypeName: 'Location')
    ));
    
    modelSchemaDefinition.addField(ModelFieldDefinition.field(
      key: AppliedIntervention.ISOKAY,
      isRequired: true,
      ofType: ModelFieldType(ModelFieldTypeEnum.bool)
    ));
    
    modelSchemaDefinition.addField(ModelFieldDefinition.hasMany(
      key: AppliedIntervention.EXECUTEDSURVEYS,
      isRequired: true,
      ofModelName: 'ExecutedSurvey',
      associatedKey: ExecutedSurvey.APPLIEDINTERVENTION
    ));
    
    modelSchemaDefinition.addField(ModelFieldDefinition.field(
      key: AppliedIntervention.SCHEMEVERSION,
      isRequired: false,
      ofType: ModelFieldType(ModelFieldTypeEnum.int)
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
    
    modelSchemaDefinition.addField(ModelFieldDefinition.field(
      key: AppliedIntervention.ENTITYAPPLIEDINTERVENTIONSID,
      isRequired: false,
      ofType: ModelFieldType(ModelFieldTypeEnum.string)
    ));
    
    modelSchemaDefinition.addField(ModelFieldDefinition.field(
      key: AppliedIntervention.APPLIEDINTERVENTIONWHODIDITID,
      isRequired: true,
      ofType: ModelFieldType(ModelFieldTypeEnum.string)
    ));
    
    modelSchemaDefinition.addField(ModelFieldDefinition.field(
      key: AppliedIntervention.APPLIEDINTERVENTIONINTERVENTIONID,
      isRequired: true,
      ofType: ModelFieldType(ModelFieldTypeEnum.string)
    ));
  });
}

class _AppliedInterventionModelType extends ModelType<AppliedIntervention> {
  const _AppliedInterventionModelType();
  
  @override
  AppliedIntervention fromJson(Map<String, dynamic> jsonData) {
    return AppliedIntervention.fromJson(jsonData);
  }
  
  @override
  String modelName() {
    return 'AppliedIntervention';
  }
}

/**
 * This is an auto generated class representing the model identifier
 * of [AppliedIntervention] in your schema.
 */
@immutable
class AppliedInterventionModelIdentifier implements ModelIdentifier<AppliedIntervention> {
  final String id;

  /** Create an instance of AppliedInterventionModelIdentifier using [id] the primary key. */
  const AppliedInterventionModelIdentifier({
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
  String toString() => 'AppliedInterventionModelIdentifier(id: $id)';
  
  @override
  bool operator ==(Object other) {
    if (identical(this, other)) {
      return true;
    }
    
    return other is AppliedInterventionModelIdentifier &&
      id == other.id;
  }
  
  @override
  int get hashCode =>
    id.hashCode;
}