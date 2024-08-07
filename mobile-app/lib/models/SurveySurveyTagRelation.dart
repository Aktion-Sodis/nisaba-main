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


/** This is an auto generated class representing the SurveySurveyTagRelation type in your schema. */
class SurveySurveyTagRelation extends amplify_core.Model {
  static const classType = const _SurveySurveyTagRelationModelType();
  final String id;
  final Survey? _survey;
  final SurveyTag? _surveyTag;
  final amplify_core.TemporalDateTime? _createdAt;
  final amplify_core.TemporalDateTime? _updatedAt;

  @override
  getInstanceType() => classType;
  
  @Deprecated('[getId] is being deprecated in favor of custom primary key feature. Use getter [modelIdentifier] to get model identifier.')
  @override
  String getId() => id;
  
  SurveySurveyTagRelationModelIdentifier get modelIdentifier {
      return SurveySurveyTagRelationModelIdentifier(
        id: id
      );
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
  
  SurveyTag get surveyTag {
    try {
      return _surveyTag!;
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
  
  const SurveySurveyTagRelation._internal({required this.id, required survey, required surveyTag, createdAt, updatedAt}): _survey = survey, _surveyTag = surveyTag, _createdAt = createdAt, _updatedAt = updatedAt;
  
  factory SurveySurveyTagRelation({String? id, required Survey survey, required SurveyTag surveyTag}) {
    return SurveySurveyTagRelation._internal(
      id: id == null ? amplify_core.UUID.getUUID() : id,
      survey: survey,
      surveyTag: surveyTag);
  }
  
  bool equals(Object other) {
    return this == other;
  }
  
  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is SurveySurveyTagRelation &&
      id == other.id &&
      _survey == other._survey &&
      _surveyTag == other._surveyTag;
  }
  
  @override
  int get hashCode => toString().hashCode;
  
  @override
  String toString() {
    var buffer = new StringBuffer();
    
    buffer.write("SurveySurveyTagRelation {");
    buffer.write("id=" + "$id" + ", ");
    buffer.write("survey=" + (_survey != null ? _survey!.toString() : "null") + ", ");
    buffer.write("surveyTag=" + (_surveyTag != null ? _surveyTag!.toString() : "null") + ", ");
    buffer.write("createdAt=" + (_createdAt != null ? _createdAt!.format() : "null") + ", ");
    buffer.write("updatedAt=" + (_updatedAt != null ? _updatedAt!.format() : "null"));
    buffer.write("}");
    
    return buffer.toString();
  }
  
  SurveySurveyTagRelation copyWith({Survey? survey, SurveyTag? surveyTag}) {
    return SurveySurveyTagRelation._internal(
      id: id,
      survey: survey ?? this.survey,
      surveyTag: surveyTag ?? this.surveyTag);
  }
  
  SurveySurveyTagRelation copyWithModelFieldValues({
    ModelFieldValue<Survey>? survey,
    ModelFieldValue<SurveyTag>? surveyTag
  }) {
    return SurveySurveyTagRelation._internal(
      id: id,
      survey: survey == null ? this.survey : survey.value,
      surveyTag: surveyTag == null ? this.surveyTag : surveyTag.value
    );
  }
  
  SurveySurveyTagRelation.fromJson(Map<String, dynamic> json)  
    : id = json['id'],
      _survey = json['survey']?['serializedData'] != null
        ? Survey.fromJson(new Map<String, dynamic>.from(json['survey']['serializedData']))
        : null,
      _surveyTag = json['surveyTag']?['serializedData'] != null
        ? SurveyTag.fromJson(new Map<String, dynamic>.from(json['surveyTag']['serializedData']))
        : null,
      _createdAt = json['createdAt'] != null ? amplify_core.TemporalDateTime.fromString(json['createdAt']) : null,
      _updatedAt = json['updatedAt'] != null ? amplify_core.TemporalDateTime.fromString(json['updatedAt']) : null;
  
  Map<String, dynamic> toJson() => {
    'id': id, 'survey': _survey?.toJson(), 'surveyTag': _surveyTag?.toJson(), 'createdAt': _createdAt?.format(), 'updatedAt': _updatedAt?.format()
  };
  
  Map<String, Object?> toMap() => {
    'id': id,
    'survey': _survey,
    'surveyTag': _surveyTag,
    'createdAt': _createdAt,
    'updatedAt': _updatedAt
  };

  static final amplify_core.QueryModelIdentifier<SurveySurveyTagRelationModelIdentifier> MODEL_IDENTIFIER = amplify_core.QueryModelIdentifier<SurveySurveyTagRelationModelIdentifier>();
  static final ID = amplify_core.QueryField(fieldName: "id");
  static final SURVEY = amplify_core.QueryField(
    fieldName: "survey",
    fieldType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.model, ofModelName: 'Survey'));
  static final SURVEYTAG = amplify_core.QueryField(
    fieldName: "surveyTag",
    fieldType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.model, ofModelName: 'SurveyTag'));
  static var schema = amplify_core.Model.defineSchema(define: (amplify_core.ModelSchemaDefinition modelSchemaDefinition) {
    modelSchemaDefinition.name = "SurveySurveyTagRelation";
    modelSchemaDefinition.pluralName = "SurveySurveyTagRelations";
    
    modelSchemaDefinition.indexes = [
      amplify_core.ModelIndex(fields: const ["surveyId"], name: "bySurvey"),
      amplify_core.ModelIndex(fields: const ["surveyTagId"], name: "bySurveyTag")
    ];
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.id());
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.belongsTo(
      key: SurveySurveyTagRelation.SURVEY,
      isRequired: true,
      targetNames: ['surveyId'],
      ofModelName: 'Survey'
    ));
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.belongsTo(
      key: SurveySurveyTagRelation.SURVEYTAG,
      isRequired: true,
      targetNames: ['surveyTagId'],
      ofModelName: 'SurveyTag'
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

class _SurveySurveyTagRelationModelType extends amplify_core.ModelType<SurveySurveyTagRelation> {
  const _SurveySurveyTagRelationModelType();
  
  @override
  SurveySurveyTagRelation fromJson(Map<String, dynamic> jsonData) {
    return SurveySurveyTagRelation.fromJson(jsonData);
  }
  
  @override
  String modelName() {
    return 'SurveySurveyTagRelation';
  }
}

/**
 * This is an auto generated class representing the model identifier
 * of [SurveySurveyTagRelation] in your schema.
 */
class SurveySurveyTagRelationModelIdentifier implements amplify_core.ModelIdentifier<SurveySurveyTagRelation> {
  final String id;

  /** Create an instance of SurveySurveyTagRelationModelIdentifier using [id] the primary key. */
  const SurveySurveyTagRelationModelIdentifier({
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
  String toString() => 'SurveySurveyTagRelationModelIdentifier(id: $id)';
  
  @override
  bool operator ==(Object other) {
    if (identical(this, other)) {
      return true;
    }
    
    return other is SurveySurveyTagRelationModelIdentifier &&
      id == other.id;
  }
  
  @override
  int get hashCode =>
    id.hashCode;
}