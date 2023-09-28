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


/** This is an auto generated class representing the ContentContentTagRelation type in your schema. */
class ContentContentTagRelation extends amplify_core.Model {
  static const classType = const _ContentContentTagRelationModelType();
  final String id;
  final Content? _content;
  final ContentTag? _contentTag;
  final amplify_core.TemporalDateTime? _createdAt;
  final amplify_core.TemporalDateTime? _updatedAt;

  @override
  getInstanceType() => classType;
  
  @Deprecated('[getId] is being deprecated in favor of custom primary key feature. Use getter [modelIdentifier] to get model identifier.')
  @override
  String getId() => id;
  
  ContentContentTagRelationModelIdentifier get modelIdentifier {
      return ContentContentTagRelationModelIdentifier(
        id: id
      );
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
  
  ContentTag get contentTag {
    try {
      return _contentTag!;
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
  
  const ContentContentTagRelation._internal({required this.id, required content, required contentTag, createdAt, updatedAt}): _content = content, _contentTag = contentTag, _createdAt = createdAt, _updatedAt = updatedAt;
  
  factory ContentContentTagRelation({String? id, required Content content, required ContentTag contentTag}) {
    return ContentContentTagRelation._internal(
      id: id == null ? amplify_core.UUID.getUUID() : id,
      content: content,
      contentTag: contentTag);
  }
  
  bool equals(Object other) {
    return this == other;
  }
  
  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is ContentContentTagRelation &&
      id == other.id &&
      _content == other._content &&
      _contentTag == other._contentTag;
  }
  
  @override
  int get hashCode => toString().hashCode;
  
  @override
  String toString() {
    var buffer = new StringBuffer();
    
    buffer.write("ContentContentTagRelation {");
    buffer.write("id=" + "$id" + ", ");
    buffer.write("content=" + (_content != null ? _content!.toString() : "null") + ", ");
    buffer.write("contentTag=" + (_contentTag != null ? _contentTag!.toString() : "null") + ", ");
    buffer.write("createdAt=" + (_createdAt != null ? _createdAt!.format() : "null") + ", ");
    buffer.write("updatedAt=" + (_updatedAt != null ? _updatedAt!.format() : "null"));
    buffer.write("}");
    
    return buffer.toString();
  }
  
  ContentContentTagRelation copyWith({Content? content, ContentTag? contentTag}) {
    return ContentContentTagRelation._internal(
      id: id,
      content: content ?? this.content,
      contentTag: contentTag ?? this.contentTag);
  }
  
  ContentContentTagRelation copyWithModelFieldValues({
    ModelFieldValue<Content>? content,
    ModelFieldValue<ContentTag>? contentTag
  }) {
    return ContentContentTagRelation._internal(
      id: id,
      content: content == null ? this.content : content.value,
      contentTag: contentTag == null ? this.contentTag : contentTag.value
    );
  }
  
  ContentContentTagRelation.fromJson(Map<String, dynamic> json)  
    : id = json['id'],
      _content = json['content']?['serializedData'] != null
        ? Content.fromJson(new Map<String, dynamic>.from(json['content']['serializedData']))
        : null,
      _contentTag = json['contentTag']?['serializedData'] != null
        ? ContentTag.fromJson(new Map<String, dynamic>.from(json['contentTag']['serializedData']))
        : null,
      _createdAt = json['createdAt'] != null ? amplify_core.TemporalDateTime.fromString(json['createdAt']) : null,
      _updatedAt = json['updatedAt'] != null ? amplify_core.TemporalDateTime.fromString(json['updatedAt']) : null;
  
  Map<String, dynamic> toJson() => {
    'id': id, 'content': _content?.toJson(), 'contentTag': _contentTag?.toJson(), 'createdAt': _createdAt?.format(), 'updatedAt': _updatedAt?.format()
  };
  
  Map<String, Object?> toMap() => {
    'id': id,
    'content': _content,
    'contentTag': _contentTag,
    'createdAt': _createdAt,
    'updatedAt': _updatedAt
  };

  static final amplify_core.QueryModelIdentifier<ContentContentTagRelationModelIdentifier> MODEL_IDENTIFIER = amplify_core.QueryModelIdentifier<ContentContentTagRelationModelIdentifier>();
  static final ID = amplify_core.QueryField(fieldName: "id");
  static final CONTENT = amplify_core.QueryField(
    fieldName: "content",
    fieldType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.model, ofModelName: 'Content'));
  static final CONTENTTAG = amplify_core.QueryField(
    fieldName: "contentTag",
    fieldType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.model, ofModelName: 'ContentTag'));
  static var schema = amplify_core.Model.defineSchema(define: (amplify_core.ModelSchemaDefinition modelSchemaDefinition) {
    modelSchemaDefinition.name = "ContentContentTagRelation";
    modelSchemaDefinition.pluralName = "ContentContentTagRelations";
    
    modelSchemaDefinition.indexes = [
      amplify_core.ModelIndex(fields: const ["contentId"], name: "byContent"),
      amplify_core.ModelIndex(fields: const ["contentTagId"], name: "byContentTag")
    ];
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.id());
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.belongsTo(
      key: ContentContentTagRelation.CONTENT,
      isRequired: true,
      targetNames: ['contentId'],
      ofModelName: 'Content'
    ));
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.belongsTo(
      key: ContentContentTagRelation.CONTENTTAG,
      isRequired: true,
      targetNames: ['contentTagId'],
      ofModelName: 'ContentTag'
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

class _ContentContentTagRelationModelType extends amplify_core.ModelType<ContentContentTagRelation> {
  const _ContentContentTagRelationModelType();
  
  @override
  ContentContentTagRelation fromJson(Map<String, dynamic> jsonData) {
    return ContentContentTagRelation.fromJson(jsonData);
  }
  
  @override
  String modelName() {
    return 'ContentContentTagRelation';
  }
}

/**
 * This is an auto generated class representing the model identifier
 * of [ContentContentTagRelation] in your schema.
 */
class ContentContentTagRelationModelIdentifier implements amplify_core.ModelIdentifier<ContentContentTagRelation> {
  final String id;

  /** Create an instance of ContentContentTagRelationModelIdentifier using [id] the primary key. */
  const ContentContentTagRelationModelIdentifier({
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
  String toString() => 'ContentContentTagRelationModelIdentifier(id: $id)';
  
  @override
  bool operator ==(Object other) {
    if (identical(this, other)) {
      return true;
    }
    
    return other is ContentContentTagRelationModelIdentifier &&
      id == other.id;
  }
  
  @override
  int get hashCode =>
    id.hashCode;
}