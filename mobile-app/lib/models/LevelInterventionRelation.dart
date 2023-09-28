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


/** This is an auto generated class representing the LevelInterventionRelation type in your schema. */
class LevelInterventionRelation extends amplify_core.Model {
  static const classType = const _LevelInterventionRelationModelType();
  final String id;
  final Level? _level;
  final Intervention? _intervention;
  final amplify_core.TemporalDateTime? _createdAt;
  final amplify_core.TemporalDateTime? _updatedAt;

  @override
  getInstanceType() => classType;
  
  @Deprecated('[getId] is being deprecated in favor of custom primary key feature. Use getter [modelIdentifier] to get model identifier.')
  @override
  String getId() => id;
  
  LevelInterventionRelationModelIdentifier get modelIdentifier {
      return LevelInterventionRelationModelIdentifier(
        id: id
      );
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
  
  Intervention get intervention {
    try {
      return _intervention!;
    } catch(e) {
      throw amplify_core.AmplifyCodeGenModelException(
          amplify_core.AmplifyExceptionMessages.codeGenRequiredFieldForceCastExceptionMessage,
          recoverySuggestion:
            amplify_core.AmplifyExceptionMessages.codeGenRequiredFieldForceCastRecoverySuggestion,
          underlyingException: e.toString()
          );
    }
  }
  
  amplify_core.TemporalDateTime? get createdAt {
    return _createdAt;
  }
  
  amplify_core.TemporalDateTime? get updatedAt {
    return _updatedAt;
  }
  
  const LevelInterventionRelation._internal({required this.id, required level, required intervention, createdAt, updatedAt}): _level = level, _intervention = intervention, _createdAt = createdAt, _updatedAt = updatedAt;
  
  factory LevelInterventionRelation({String? id, required Level level, required Intervention intervention}) {
    return LevelInterventionRelation._internal(
      id: id == null ? amplify_core.UUID.getUUID() : id,
      level: level,
      intervention: intervention);
  }
  
  bool equals(Object other) {
    return this == other;
  }
  
  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is LevelInterventionRelation &&
      id == other.id &&
      _level == other._level &&
      _intervention == other._intervention;
  }
  
  @override
  int get hashCode => toString().hashCode;
  
  @override
  String toString() {
    var buffer = new StringBuffer();
    
    buffer.write("LevelInterventionRelation {");
    buffer.write("id=" + "$id" + ", ");
    buffer.write("level=" + (_level != null ? _level!.toString() : "null") + ", ");
    buffer.write("intervention=" + (_intervention != null ? _intervention!.toString() : "null") + ", ");
    buffer.write("createdAt=" + (_createdAt != null ? _createdAt!.format() : "null") + ", ");
    buffer.write("updatedAt=" + (_updatedAt != null ? _updatedAt!.format() : "null"));
    buffer.write("}");
    
    return buffer.toString();
  }
  
  LevelInterventionRelation copyWith({Level? level, Intervention? intervention}) {
    return LevelInterventionRelation._internal(
      id: id,
      level: level ?? this.level,
      intervention: intervention ?? this.intervention);
  }
  
  LevelInterventionRelation copyWithModelFieldValues({
    ModelFieldValue<Level>? level,
    ModelFieldValue<Intervention>? intervention
  }) {
    return LevelInterventionRelation._internal(
      id: id,
      level: level == null ? this.level : level.value,
      intervention: intervention == null ? this.intervention : intervention.value
    );
  }
  
  LevelInterventionRelation.fromJson(Map<String, dynamic> json)  
    : id = json['id'],
      _level = json['level']?['serializedData'] != null
        ? Level.fromJson(new Map<String, dynamic>.from(json['level']['serializedData']))
        : null,
      _intervention = json['intervention']?['serializedData'] != null
        ? Intervention.fromJson(new Map<String, dynamic>.from(json['intervention']['serializedData']))
        : null,
      _createdAt = json['createdAt'] != null ? amplify_core.TemporalDateTime.fromString(json['createdAt']) : null,
      _updatedAt = json['updatedAt'] != null ? amplify_core.TemporalDateTime.fromString(json['updatedAt']) : null;
  
  Map<String, dynamic> toJson() => {
    'id': id, 'level': _level?.toJson(), 'intervention': _intervention?.toJson(), 'createdAt': _createdAt?.format(), 'updatedAt': _updatedAt?.format()
  };
  
  Map<String, Object?> toMap() => {
    'id': id,
    'level': _level,
    'intervention': _intervention,
    'createdAt': _createdAt,
    'updatedAt': _updatedAt
  };

  static final amplify_core.QueryModelIdentifier<LevelInterventionRelationModelIdentifier> MODEL_IDENTIFIER = amplify_core.QueryModelIdentifier<LevelInterventionRelationModelIdentifier>();
  static final ID = amplify_core.QueryField(fieldName: "id");
  static final LEVEL = amplify_core.QueryField(
    fieldName: "level",
    fieldType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.model, ofModelName: 'Level'));
  static final INTERVENTION = amplify_core.QueryField(
    fieldName: "intervention",
    fieldType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.model, ofModelName: 'Intervention'));
  static var schema = amplify_core.Model.defineSchema(define: (amplify_core.ModelSchemaDefinition modelSchemaDefinition) {
    modelSchemaDefinition.name = "LevelInterventionRelation";
    modelSchemaDefinition.pluralName = "LevelInterventionRelations";
    
    modelSchemaDefinition.indexes = [
      amplify_core.ModelIndex(fields: const ["levelId"], name: "byLevel"),
      amplify_core.ModelIndex(fields: const ["interventionId"], name: "byIntervention")
    ];
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.id());
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.belongsTo(
      key: LevelInterventionRelation.LEVEL,
      isRequired: true,
      targetNames: ['levelId'],
      ofModelName: 'Level'
    ));
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.belongsTo(
      key: LevelInterventionRelation.INTERVENTION,
      isRequired: true,
      targetNames: ['interventionId'],
      ofModelName: 'Intervention'
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

class _LevelInterventionRelationModelType extends amplify_core.ModelType<LevelInterventionRelation> {
  const _LevelInterventionRelationModelType();
  
  @override
  LevelInterventionRelation fromJson(Map<String, dynamic> jsonData) {
    return LevelInterventionRelation.fromJson(jsonData);
  }
  
  @override
  String modelName() {
    return 'LevelInterventionRelation';
  }
}

/**
 * This is an auto generated class representing the model identifier
 * of [LevelInterventionRelation] in your schema.
 */
class LevelInterventionRelationModelIdentifier implements amplify_core.ModelIdentifier<LevelInterventionRelation> {
  final String id;

  /** Create an instance of LevelInterventionRelationModelIdentifier using [id] the primary key. */
  const LevelInterventionRelationModelIdentifier({
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
  String toString() => 'LevelInterventionRelationModelIdentifier(id: $id)';
  
  @override
  bool operator ==(Object other) {
    if (identical(this, other)) {
      return true;
    }
    
    return other is LevelInterventionRelationModelIdentifier &&
      id == other.id;
  }
  
  @override
  int get hashCode =>
    id.hashCode;
}