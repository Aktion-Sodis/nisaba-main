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


/** This is an auto generated class representing the ContentTag type in your schema. */
class ContentTag extends amplify_core.Model {
  static const classType = const _ContentTagModelType();
  final String id;
  final I18nString? _text;
  final int? _schemeVersion;
  final List<ContentContentTagRelation>? _contents;
  final amplify_core.TemporalDateTime? _createdAt;
  final amplify_core.TemporalDateTime? _updatedAt;

  @override
  getInstanceType() => classType;
  
  @Deprecated('[getId] is being deprecated in favor of custom primary key feature. Use getter [modelIdentifier] to get model identifier.')
  @override
  String getId() => id;
  
  ContentTagModelIdentifier get modelIdentifier {
      return ContentTagModelIdentifier(
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
  
  List<ContentContentTagRelation>? get contents {
    return _contents;
  }
  
  amplify_core.TemporalDateTime? get createdAt {
    return _createdAt;
  }
  
  amplify_core.TemporalDateTime? get updatedAt {
    return _updatedAt;
  }
  
  const ContentTag._internal({required this.id, required text, schemeVersion, contents, createdAt, updatedAt}): _text = text, _schemeVersion = schemeVersion, _contents = contents, _createdAt = createdAt, _updatedAt = updatedAt;
  
  factory ContentTag({String? id, required I18nString text, int? schemeVersion, List<ContentContentTagRelation>? contents}) {
    return ContentTag._internal(
      id: id == null ? amplify_core.UUID.getUUID() : id,
      text: text,
      schemeVersion: schemeVersion,
      contents: contents != null ? List<ContentContentTagRelation>.unmodifiable(contents) : contents);
  }
  
  bool equals(Object other) {
    return this == other;
  }
  
  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is ContentTag &&
      id == other.id &&
      _text == other._text &&
      _schemeVersion == other._schemeVersion &&
      DeepCollectionEquality().equals(_contents, other._contents);
  }
  
  @override
  int get hashCode => toString().hashCode;
  
  @override
  String toString() {
    var buffer = new StringBuffer();
    
    buffer.write("ContentTag {");
    buffer.write("id=" + "$id" + ", ");
    buffer.write("text=" + (_text != null ? _text!.toString() : "null") + ", ");
    buffer.write("schemeVersion=" + (_schemeVersion != null ? _schemeVersion!.toString() : "null") + ", ");
    buffer.write("createdAt=" + (_createdAt != null ? _createdAt!.format() : "null") + ", ");
    buffer.write("updatedAt=" + (_updatedAt != null ? _updatedAt!.format() : "null"));
    buffer.write("}");
    
    return buffer.toString();
  }
  
  ContentTag copyWith({I18nString? text, int? schemeVersion, List<ContentContentTagRelation>? contents}) {
    return ContentTag._internal(
      id: id,
      text: text ?? this.text,
      schemeVersion: schemeVersion ?? this.schemeVersion,
      contents: contents ?? this.contents);
  }
  
  ContentTag copyWithModelFieldValues({
    ModelFieldValue<I18nString>? text,
    ModelFieldValue<int?>? schemeVersion,
    ModelFieldValue<List<ContentContentTagRelation>>? contents
  }) {
    return ContentTag._internal(
      id: id,
      text: text == null ? this.text : text.value,
      schemeVersion: schemeVersion == null ? this.schemeVersion : schemeVersion.value,
      contents: contents == null ? this.contents : contents.value
    );
  }
  
  ContentTag.fromJson(Map<String, dynamic> json)  
    : id = json['id'],
      _text = json['text']?['serializedData'] != null
        ? I18nString.fromJson(new Map<String, dynamic>.from(json['text']['serializedData']))
        : null,
      _schemeVersion = (json['schemeVersion'] as num?)?.toInt(),
      _contents = json['contents'] is List
        ? (json['contents'] as List)
          .where((e) => e?['serializedData'] != null)
          .map((e) => ContentContentTagRelation.fromJson(new Map<String, dynamic>.from(e['serializedData'])))
          .toList()
        : null,
      _createdAt = json['createdAt'] != null ? amplify_core.TemporalDateTime.fromString(json['createdAt']) : null,
      _updatedAt = json['updatedAt'] != null ? amplify_core.TemporalDateTime.fromString(json['updatedAt']) : null;
  
  Map<String, dynamic> toJson() => {
    'id': id, 'text': _text?.toJson(), 'schemeVersion': _schemeVersion, 'contents': _contents?.map((ContentContentTagRelation? e) => e?.toJson()).toList(), 'createdAt': _createdAt?.format(), 'updatedAt': _updatedAt?.format()
  };
  
  Map<String, Object?> toMap() => {
    'id': id,
    'text': _text,
    'schemeVersion': _schemeVersion,
    'contents': _contents,
    'createdAt': _createdAt,
    'updatedAt': _updatedAt
  };

  static final amplify_core.QueryModelIdentifier<ContentTagModelIdentifier> MODEL_IDENTIFIER = amplify_core.QueryModelIdentifier<ContentTagModelIdentifier>();
  static final ID = amplify_core.QueryField(fieldName: "id");
  static final TEXT = amplify_core.QueryField(fieldName: "text");
  static final SCHEMEVERSION = amplify_core.QueryField(fieldName: "schemeVersion");
  static final CONTENTS = amplify_core.QueryField(
    fieldName: "contents",
    fieldType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.model, ofModelName: 'ContentContentTagRelation'));
  static var schema = amplify_core.Model.defineSchema(define: (amplify_core.ModelSchemaDefinition modelSchemaDefinition) {
    modelSchemaDefinition.name = "ContentTag";
    modelSchemaDefinition.pluralName = "ContentTags";
    
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
      key: ContentTag.SCHEMEVERSION,
      isRequired: false,
      ofType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.int)
    ));
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.hasMany(
      key: ContentTag.CONTENTS,
      isRequired: true,
      ofModelName: (ContentContentTagRelation).toString(),
      associatedKey: ContentContentTagRelation.CONTENTTAG
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

class _ContentTagModelType extends amplify_core.ModelType<ContentTag> {
  const _ContentTagModelType();
  
  @override
  ContentTag fromJson(Map<String, dynamic> jsonData) {
    return ContentTag.fromJson(jsonData);
  }
}

/**
 * This is an auto generated class representing the model identifier
 * of [ContentTag] in your schema.
 */
class ContentTagModelIdentifier implements amplify_core.ModelIdentifier<ContentTag> {
  final String id;

  /** Create an instance of ContentTagModelIdentifier using [id] the primary key. */
  const ContentTagModelIdentifier({
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
  String toString() => 'ContentTagModelIdentifier(id: $id)';
  
  @override
  bool operator ==(Object other) {
    if (identical(this, other)) {
      return true;
    }
    
    return other is ContentTagModelIdentifier &&
      id == other.id;
  }
  
  @override
  int get hashCode =>
    id.hashCode;
}