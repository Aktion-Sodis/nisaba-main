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


/** This is an auto generated class representing the InterventionContentRelation type in your schema. */
class InterventionContentRelation extends amplify_core.Model {
  static const classType = const _InterventionContentRelationModelType();
  final String id;
  final Intervention? _intervention;
  final Content? _content;
  final amplify_core.TemporalDateTime? _createdAt;
  final amplify_core.TemporalDateTime? _updatedAt;

  @override
  getInstanceType() => classType;
  
  @Deprecated('[getId] is being deprecated in favor of custom primary key feature. Use getter [modelIdentifier] to get model identifier.')
  @override
  String getId() => id;
  
  InterventionContentRelationModelIdentifier get modelIdentifier {
      return InterventionContentRelationModelIdentifier(
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
  
  Content get content {
    try {
      return _content!;
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
  
  const InterventionContentRelation._internal({required this.id, required intervention, required content, createdAt, updatedAt}): _intervention = intervention, _content = content, _createdAt = createdAt, _updatedAt = updatedAt;
  
  factory InterventionContentRelation({String? id, required Intervention intervention, required Content content}) {
    return InterventionContentRelation._internal(
      id: id == null ? amplify_core.UUID.getUUID() : id,
      intervention: intervention,
      content: content);
  }
  
  bool equals(Object other) {
    return this == other;
  }
  
  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is InterventionContentRelation &&
      id == other.id &&
      _intervention == other._intervention &&
      _content == other._content;
  }
  
  @override
  int get hashCode => toString().hashCode;
  
  @override
  String toString() {
    var buffer = new StringBuffer();
    
    buffer.write("InterventionContentRelation {");
    buffer.write("id=" + "$id" + ", ");
    buffer.write("intervention=" + (_intervention != null ? _intervention!.toString() : "null") + ", ");
    buffer.write("content=" + (_content != null ? _content!.toString() : "null") + ", ");
    buffer.write("createdAt=" + (_createdAt != null ? _createdAt!.format() : "null") + ", ");
    buffer.write("updatedAt=" + (_updatedAt != null ? _updatedAt!.format() : "null"));
    buffer.write("}");
    
    return buffer.toString();
  }
  
  InterventionContentRelation copyWith({Intervention? intervention, Content? content}) {
    return InterventionContentRelation._internal(
      id: id,
      intervention: intervention ?? this.intervention,
      content: content ?? this.content);
  }
  
  InterventionContentRelation copyWithModelFieldValues({
    ModelFieldValue<Intervention>? intervention,
    ModelFieldValue<Content>? content
  }) {
    return InterventionContentRelation._internal(
      id: id,
      intervention: intervention == null ? this.intervention : intervention.value,
      content: content == null ? this.content : content.value
    );
  }
  
  InterventionContentRelation.fromJson(Map<String, dynamic> json)  
    : id = json['id'],
      _intervention = json['intervention']?['serializedData'] != null
        ? Intervention.fromJson(new Map<String, dynamic>.from(json['intervention']['serializedData']))
        : null,
      _content = json['content']?['serializedData'] != null
        ? Content.fromJson(new Map<String, dynamic>.from(json['content']['serializedData']))
        : null,
      _createdAt = json['createdAt'] != null ? amplify_core.TemporalDateTime.fromString(json['createdAt']) : null,
      _updatedAt = json['updatedAt'] != null ? amplify_core.TemporalDateTime.fromString(json['updatedAt']) : null;
  
  Map<String, dynamic> toJson() => {
    'id': id, 'intervention': _intervention?.toJson(), 'content': _content?.toJson(), 'createdAt': _createdAt?.format(), 'updatedAt': _updatedAt?.format()
  };
  
  Map<String, Object?> toMap() => {
    'id': id,
    'intervention': _intervention,
    'content': _content,
    'createdAt': _createdAt,
    'updatedAt': _updatedAt
  };

  static final amplify_core.QueryModelIdentifier<InterventionContentRelationModelIdentifier> MODEL_IDENTIFIER = amplify_core.QueryModelIdentifier<InterventionContentRelationModelIdentifier>();
  static final ID = amplify_core.QueryField(fieldName: "id");
  static final INTERVENTION = amplify_core.QueryField(
    fieldName: "intervention",
    fieldType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.model, ofModelName: 'Intervention'));
  static final CONTENT = amplify_core.QueryField(
    fieldName: "content",
    fieldType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.model, ofModelName: 'Content'));
  static var schema = amplify_core.Model.defineSchema(define: (amplify_core.ModelSchemaDefinition modelSchemaDefinition) {
    modelSchemaDefinition.name = "InterventionContentRelation";
    modelSchemaDefinition.pluralName = "InterventionContentRelations";
    
    modelSchemaDefinition.indexes = [
      amplify_core.ModelIndex(fields: const ["interventionId"], name: "byIntervention"),
      amplify_core.ModelIndex(fields: const ["contentId"], name: "byContent")
    ];
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.id());
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.belongsTo(
      key: InterventionContentRelation.INTERVENTION,
      isRequired: true,
      targetNames: ["interventionId"],
      ofModelName: (Intervention).toString()
    ));
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.belongsTo(
      key: InterventionContentRelation.CONTENT,
      isRequired: true,
      targetNames: ["contentId"],
      ofModelName: (Content).toString()
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

class _InterventionContentRelationModelType extends amplify_core.ModelType<InterventionContentRelation> {
  const _InterventionContentRelationModelType();
  
  @override
  InterventionContentRelation fromJson(Map<String, dynamic> jsonData) {
    return InterventionContentRelation.fromJson(jsonData);
  }
}

/**
 * This is an auto generated class representing the model identifier
 * of [InterventionContentRelation] in your schema.
 */
class InterventionContentRelationModelIdentifier implements amplify_core.ModelIdentifier<InterventionContentRelation> {
  final String id;

  /** Create an instance of InterventionContentRelationModelIdentifier using [id] the primary key. */
  const InterventionContentRelationModelIdentifier({
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
  String toString() => 'InterventionContentRelationModelIdentifier(id: $id)';
  
  @override
  bool operator ==(Object other) {
    if (identical(this, other)) {
      return true;
    }
    
    return other is InterventionContentRelationModelIdentifier &&
      id == other.id;
  }
  
  @override
  int get hashCode =>
    id.hashCode;
}