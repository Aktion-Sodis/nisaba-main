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


/** This is an auto generated class representing the InterventionInterventionTagRelation type in your schema. */
class InterventionInterventionTagRelation extends amplify_core.Model {
  static const classType = const _InterventionInterventionTagRelationModelType();
  final String id;
  final Intervention? _intervention;
  final InterventionTag? _interventionTag;
  final amplify_core.TemporalDateTime? _createdAt;
  final amplify_core.TemporalDateTime? _updatedAt;

  @override
  getInstanceType() => classType;
  
  @Deprecated('[getId] is being deprecated in favor of custom primary key feature. Use getter [modelIdentifier] to get model identifier.')
  @override
  String getId() => id;
  
  InterventionInterventionTagRelationModelIdentifier get modelIdentifier {
      return InterventionInterventionTagRelationModelIdentifier(
        id: id
      );
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
  
  InterventionTag get interventionTag {
    try {
      return _interventionTag!;
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
  
  const InterventionInterventionTagRelation._internal({required this.id, required intervention, required interventionTag, createdAt, updatedAt}): _intervention = intervention, _interventionTag = interventionTag, _createdAt = createdAt, _updatedAt = updatedAt;
  
  factory InterventionInterventionTagRelation({String? id, required Intervention intervention, required InterventionTag interventionTag}) {
    return InterventionInterventionTagRelation._internal(
      id: id == null ? amplify_core.UUID.getUUID() : id,
      intervention: intervention,
      interventionTag: interventionTag);
  }
  
  bool equals(Object other) {
    return this == other;
  }
  
  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is InterventionInterventionTagRelation &&
      id == other.id &&
      _intervention == other._intervention &&
      _interventionTag == other._interventionTag;
  }
  
  @override
  int get hashCode => toString().hashCode;
  
  @override
  String toString() {
    var buffer = new StringBuffer();
    
    buffer.write("InterventionInterventionTagRelation {");
    buffer.write("id=" + "$id" + ", ");
    buffer.write("intervention=" + (_intervention != null ? _intervention!.toString() : "null") + ", ");
    buffer.write("interventionTag=" + (_interventionTag != null ? _interventionTag!.toString() : "null") + ", ");
    buffer.write("createdAt=" + (_createdAt != null ? _createdAt!.format() : "null") + ", ");
    buffer.write("updatedAt=" + (_updatedAt != null ? _updatedAt!.format() : "null"));
    buffer.write("}");
    
    return buffer.toString();
  }
  
  InterventionInterventionTagRelation copyWith({Intervention? intervention, InterventionTag? interventionTag}) {
    return InterventionInterventionTagRelation._internal(
      id: id,
      intervention: intervention ?? this.intervention,
      interventionTag: interventionTag ?? this.interventionTag);
  }
  
  InterventionInterventionTagRelation copyWithModelFieldValues({
    ModelFieldValue<Intervention>? intervention,
    ModelFieldValue<InterventionTag>? interventionTag
  }) {
    return InterventionInterventionTagRelation._internal(
      id: id,
      intervention: intervention == null ? this.intervention : intervention.value,
      interventionTag: interventionTag == null ? this.interventionTag : interventionTag.value
    );
  }
  
  InterventionInterventionTagRelation.fromJson(Map<String, dynamic> json)  
    : id = json['id'],
      _intervention = json['intervention']?['serializedData'] != null
        ? Intervention.fromJson(new Map<String, dynamic>.from(json['intervention']['serializedData']))
        : null,
      _interventionTag = json['interventionTag']?['serializedData'] != null
        ? InterventionTag.fromJson(new Map<String, dynamic>.from(json['interventionTag']['serializedData']))
        : null,
      _createdAt = json['createdAt'] != null ? amplify_core.TemporalDateTime.fromString(json['createdAt']) : null,
      _updatedAt = json['updatedAt'] != null ? amplify_core.TemporalDateTime.fromString(json['updatedAt']) : null;
  
  Map<String, dynamic> toJson() => {
    'id': id, 'intervention': _intervention?.toJson(), 'interventionTag': _interventionTag?.toJson(), 'createdAt': _createdAt?.format(), 'updatedAt': _updatedAt?.format()
  };
  
  Map<String, Object?> toMap() => {
    'id': id,
    'intervention': _intervention,
    'interventionTag': _interventionTag,
    'createdAt': _createdAt,
    'updatedAt': _updatedAt
  };

  static final amplify_core.QueryModelIdentifier<InterventionInterventionTagRelationModelIdentifier> MODEL_IDENTIFIER = amplify_core.QueryModelIdentifier<InterventionInterventionTagRelationModelIdentifier>();
  static final ID = amplify_core.QueryField(fieldName: "id");
  static final INTERVENTION = amplify_core.QueryField(
    fieldName: "intervention",
    fieldType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.model, ofModelName: 'Intervention'));
  static final INTERVENTIONTAG = amplify_core.QueryField(
    fieldName: "interventionTag",
    fieldType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.model, ofModelName: 'InterventionTag'));
  static var schema = amplify_core.Model.defineSchema(define: (amplify_core.ModelSchemaDefinition modelSchemaDefinition) {
    modelSchemaDefinition.name = "InterventionInterventionTagRelation";
    modelSchemaDefinition.pluralName = "InterventionInterventionTagRelations";
    
    modelSchemaDefinition.indexes = [
      amplify_core.ModelIndex(fields: const ["interventionId"], name: "byIntervention"),
      amplify_core.ModelIndex(fields: const ["interventionTagId"], name: "byInterventionTag")
    ];
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.id());
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.belongsTo(
      key: InterventionInterventionTagRelation.INTERVENTION,
      isRequired: true,
      targetNames: ["interventionId"],
      ofModelName: (Intervention).toString()
    ));
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.belongsTo(
      key: InterventionInterventionTagRelation.INTERVENTIONTAG,
      isRequired: true,
      targetNames: ["interventionTagId"],
      ofModelName: (InterventionTag).toString()
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

class _InterventionInterventionTagRelationModelType extends amplify_core.ModelType<InterventionInterventionTagRelation> {
  const _InterventionInterventionTagRelationModelType();
  
  @override
  InterventionInterventionTagRelation fromJson(Map<String, dynamic> jsonData) {
    return InterventionInterventionTagRelation.fromJson(jsonData);
  }
}

/**
 * This is an auto generated class representing the model identifier
 * of [InterventionInterventionTagRelation] in your schema.
 */
class InterventionInterventionTagRelationModelIdentifier implements amplify_core.ModelIdentifier<InterventionInterventionTagRelation> {
  final String id;

  /** Create an instance of InterventionInterventionTagRelationModelIdentifier using [id] the primary key. */
  const InterventionInterventionTagRelationModelIdentifier({
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
  String toString() => 'InterventionInterventionTagRelationModelIdentifier(id: $id)';
  
  @override
  bool operator ==(Object other) {
    if (identical(this, other)) {
      return true;
    }
    
    return other is InterventionInterventionTagRelationModelIdentifier &&
      id == other.id;
  }
  
  @override
  int get hashCode =>
    id.hashCode;
}