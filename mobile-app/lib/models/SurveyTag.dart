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


/** This is an auto generated class representing the SurveyTag type in your schema. */
class SurveyTag extends amplify_core.Model {
  static const classType = const _SurveyTagModelType();
  final String id;
  final I18nString? _text;
  final int? _schemeVersion;
  final List<SurveySurveyTagRelation>? _surveys;
  final amplify_core.TemporalDateTime? _createdAt;
  final amplify_core.TemporalDateTime? _updatedAt;

  @override
  getInstanceType() => classType;
  
  @Deprecated('[getId] is being deprecated in favor of custom primary key feature. Use getter [modelIdentifier] to get model identifier.')
  @override
  String getId() => id;
  
  SurveyTagModelIdentifier get modelIdentifier {
      return SurveyTagModelIdentifier(
        id: id
      );
  }
  
  I18nString get text {
    try {
      return _text!;
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
  
  List<SurveySurveyTagRelation>? get surveys {
    return _surveys;
  }
  
  amplify_core.TemporalDateTime? get createdAt {
    return _createdAt;
  }
  
  amplify_core.TemporalDateTime? get updatedAt {
    return _updatedAt;
  }
  
  const SurveyTag._internal({required this.id, required text, schemeVersion, surveys, createdAt, updatedAt}): _text = text, _schemeVersion = schemeVersion, _surveys = surveys, _createdAt = createdAt, _updatedAt = updatedAt;
  
  factory SurveyTag({String? id, required I18nString text, int? schemeVersion, List<SurveySurveyTagRelation>? surveys}) {
    return SurveyTag._internal(
      id: id == null ? amplify_core.UUID.getUUID() : id,
      text: text,
      schemeVersion: schemeVersion,
      surveys: surveys != null ? List<SurveySurveyTagRelation>.unmodifiable(surveys) : surveys);
  }
  
  bool equals(Object other) {
    return this == other;
  }
  
  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is SurveyTag &&
      id == other.id &&
      _text == other._text &&
      _schemeVersion == other._schemeVersion &&
      DeepCollectionEquality().equals(_surveys, other._surveys);
  }
  
  @override
  int get hashCode => toString().hashCode;
  
  @override
  String toString() {
    var buffer = new StringBuffer();
    
    buffer.write("SurveyTag {");
    buffer.write("id=" + "$id" + ", ");
    buffer.write("text=" + (_text != null ? _text!.toString() : "null") + ", ");
    buffer.write("schemeVersion=" + (_schemeVersion != null ? _schemeVersion!.toString() : "null") + ", ");
    buffer.write("createdAt=" + (_createdAt != null ? _createdAt!.format() : "null") + ", ");
    buffer.write("updatedAt=" + (_updatedAt != null ? _updatedAt!.format() : "null"));
    buffer.write("}");
    
    return buffer.toString();
  }
  
  SurveyTag copyWith({I18nString? text, int? schemeVersion, List<SurveySurveyTagRelation>? surveys}) {
    return SurveyTag._internal(
      id: id,
      text: text ?? this.text,
      schemeVersion: schemeVersion ?? this.schemeVersion,
      surveys: surveys ?? this.surveys);
  }
  
  SurveyTag copyWithModelFieldValues({
    ModelFieldValue<I18nString>? text,
    ModelFieldValue<int?>? schemeVersion,
    ModelFieldValue<List<SurveySurveyTagRelation>>? surveys
  }) {
    return SurveyTag._internal(
      id: id,
      text: text == null ? this.text : text.value,
      schemeVersion: schemeVersion == null ? this.schemeVersion : schemeVersion.value,
      surveys: surveys == null ? this.surveys : surveys.value
    );
  }
  
  SurveyTag.fromJson(Map<String, dynamic> json)  
    : id = json['id'],
      _text = json['text']?['serializedData'] != null
        ? I18nString.fromJson(new Map<String, dynamic>.from(json['text']['serializedData']))
        : null,
      _schemeVersion = (json['schemeVersion'] as num?)?.toInt(),
      _surveys = json['surveys'] is List
        ? (json['surveys'] as List)
          .where((e) => e?['serializedData'] != null)
          .map((e) => SurveySurveyTagRelation.fromJson(new Map<String, dynamic>.from(e['serializedData'])))
          .toList()
        : null,
      _createdAt = json['createdAt'] != null ? amplify_core.TemporalDateTime.fromString(json['createdAt']) : null,
      _updatedAt = json['updatedAt'] != null ? amplify_core.TemporalDateTime.fromString(json['updatedAt']) : null;
  
  Map<String, dynamic> toJson() => {
    'id': id, 'text': _text?.toJson(), 'schemeVersion': _schemeVersion, 'surveys': _surveys?.map((SurveySurveyTagRelation? e) => e?.toJson()).toList(), 'createdAt': _createdAt?.format(), 'updatedAt': _updatedAt?.format()
  };
  
  Map<String, Object?> toMap() => {
    'id': id,
    'text': _text,
    'schemeVersion': _schemeVersion,
    'surveys': _surveys,
    'createdAt': _createdAt,
    'updatedAt': _updatedAt
  };

  static final amplify_core.QueryModelIdentifier<SurveyTagModelIdentifier> MODEL_IDENTIFIER = amplify_core.QueryModelIdentifier<SurveyTagModelIdentifier>();
  static final ID = amplify_core.QueryField(fieldName: "id");
  static final TEXT = amplify_core.QueryField(fieldName: "text");
  static final SCHEMEVERSION = amplify_core.QueryField(fieldName: "schemeVersion");
  static final SURVEYS = amplify_core.QueryField(
    fieldName: "surveys",
    fieldType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.model, ofModelName: 'SurveySurveyTagRelation'));
  static var schema = amplify_core.Model.defineSchema(define: (amplify_core.ModelSchemaDefinition modelSchemaDefinition) {
    modelSchemaDefinition.name = "SurveyTag";
    modelSchemaDefinition.pluralName = "SurveyTags";
    
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
      fieldName: 'text',
      isRequired: true,
      ofType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.embedded, ofCustomTypeName: 'I18nString')
    ));
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.field(
      key: SurveyTag.SCHEMEVERSION,
      isRequired: false,
      ofType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.int)
    ));
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.hasMany(
      key: SurveyTag.SURVEYS,
      isRequired: true,
      ofModelName: (SurveySurveyTagRelation).toString(),
      associatedKey: SurveySurveyTagRelation.SURVEYTAG
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

class _SurveyTagModelType extends amplify_core.ModelType<SurveyTag> {
  const _SurveyTagModelType();
  
  @override
  SurveyTag fromJson(Map<String, dynamic> jsonData) {
    return SurveyTag.fromJson(jsonData);
  }
}

/**
 * This is an auto generated class representing the model identifier
 * of [SurveyTag] in your schema.
 */
class SurveyTagModelIdentifier implements amplify_core.ModelIdentifier<SurveyTag> {
  final String id;

  /** Create an instance of SurveyTagModelIdentifier using [id] the primary key. */
  const SurveyTagModelIdentifier({
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
  String toString() => 'SurveyTagModelIdentifier(id: $id)';
  
  @override
  bool operator ==(Object other) {
    if (identical(this, other)) {
      return true;
    }
    
    return other is SurveyTagModelIdentifier &&
      id == other.id;
  }
  
  @override
  int get hashCode =>
    id.hashCode;
}