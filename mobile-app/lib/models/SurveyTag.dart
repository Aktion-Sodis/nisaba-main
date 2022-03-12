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

// ignore_for_file: public_member_api_docs, file_names, unnecessary_new, prefer_if_null_operators, prefer_const_constructors, slash_for_doc_comments, annotate_overrides, non_constant_identifier_names, unnecessary_string_interpolations, prefer_adjacent_string_concatenation, unnecessary_const, dead_code

import 'ModelProvider.dart';
import 'package:amplify_core/amplify_core.dart';
import 'package:flutter/foundation.dart';


/** This is an auto generated class representing the SurveyTag type in your schema. */
@immutable
class SurveyTag extends Model {
  static const classType = const _SurveyTagModelType();
  final String id;
  final I18nString? _text;
  final int? _schemeVersion;
  final TemporalDateTime? _createdAt;
  final TemporalDateTime? _updatedAt;
  final String? _surveyTagsId;

  @override
  getInstanceType() => classType;
  
  @override
  String getId() {
    return id;
  }
  
  I18nString get text {
    try {
      return _text!;
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
  
  String? get surveyTagsId {
    return _surveyTagsId;
  }
  
  const SurveyTag._internal({required this.id, required text, schemeVersion, createdAt, updatedAt, surveyTagsId}): _text = text, _schemeVersion = schemeVersion, _createdAt = createdAt, _updatedAt = updatedAt, _surveyTagsId = surveyTagsId;
  
  factory SurveyTag({String? id, required I18nString text, int? schemeVersion, String? surveyTagsId}) {
    return SurveyTag._internal(
      id: id == null ? UUID.getUUID() : id,
      text: text,
      schemeVersion: schemeVersion,
      surveyTagsId: surveyTagsId);
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
      _surveyTagsId == other._surveyTagsId;
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
    buffer.write("updatedAt=" + (_updatedAt != null ? _updatedAt!.format() : "null") + ", ");
    buffer.write("surveyTagsId=" + "$_surveyTagsId");
    buffer.write("}");
    
    return buffer.toString();
  }
  
  SurveyTag copyWith({String? id, I18nString? text, int? schemeVersion, String? surveyTagsId}) {
    return SurveyTag._internal(
      id: id ?? this.id,
      text: text ?? this.text,
      schemeVersion: schemeVersion ?? this.schemeVersion,
      surveyTagsId: surveyTagsId ?? this.surveyTagsId);
  }
  
  SurveyTag.fromJson(Map<String, dynamic> json)  
    : id = json['id'],
      _text = json['text']?['serializedData'] != null
        ? I18nString.fromJson(new Map<String, dynamic>.from(json['text']['serializedData']))
        : null,
      _schemeVersion = (json['schemeVersion'] as num?)?.toInt(),
      _createdAt = json['createdAt'] != null ? TemporalDateTime.fromString(json['createdAt']) : null,
      _updatedAt = json['updatedAt'] != null ? TemporalDateTime.fromString(json['updatedAt']) : null,
      _surveyTagsId = json['surveyTagsId'];
  
  Map<String, dynamic> toJson() => {
    'id': id, 'text': _text?.toJson(), 'schemeVersion': _schemeVersion, 'createdAt': _createdAt?.format(), 'updatedAt': _updatedAt?.format(), 'surveyTagsId': _surveyTagsId
  };

  static final QueryField ID = QueryField(fieldName: "surveyTag.id");
  static final QueryField TEXT = QueryField(fieldName: "text");
  static final QueryField SCHEMEVERSION = QueryField(fieldName: "schemeVersion");
  static final QueryField SURVEYTAGSID = QueryField(fieldName: "surveyTagsId");
  static var schema = Model.defineSchema(define: (ModelSchemaDefinition modelSchemaDefinition) {
    modelSchemaDefinition.name = "SurveyTag";
    modelSchemaDefinition.pluralName = "SurveyTags";
    
    modelSchemaDefinition.addField(ModelFieldDefinition.id());
    
    modelSchemaDefinition.addField(ModelFieldDefinition.embedded(
      fieldName: 'text',
      isRequired: true,
      ofType: ModelFieldType(ModelFieldTypeEnum.embedded, ofCustomTypeName: 'I18nString')
    ));
    
    modelSchemaDefinition.addField(ModelFieldDefinition.field(
      key: SurveyTag.SCHEMEVERSION,
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
      key: SurveyTag.SURVEYTAGSID,
      isRequired: false,
      ofType: ModelFieldType(ModelFieldTypeEnum.string)
    ));
  });
}

class _SurveyTagModelType extends ModelType<SurveyTag> {
  const _SurveyTagModelType();
  
  @override
  SurveyTag fromJson(Map<String, dynamic> jsonData) {
    return SurveyTag.fromJson(jsonData);
  }
}