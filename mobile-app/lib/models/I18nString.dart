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


/** This is an auto generated class representing the I18nString type in your schema. */
class I18nString {
  final List<String>? _languageKeys;
  final List<String>? _languageTexts;

  List<String> get languageKeys {
    try {
      return _languageKeys!;
    } catch(e) {
      throw amplify_core.AmplifyCodeGenModelException(
          amplify_core.AmplifyExceptionMessages.codeGenRequiredFieldForceCastExceptionMessage,
          recoverySuggestion:
            amplify_core.AmplifyExceptionMessages.codeGenRequiredFieldForceCastRecoverySuggestion,
          underlyingException: e.toString()
          );
    }
  }
  
  List<String> get languageTexts {
    try {
      return _languageTexts!;
    } catch(e) {
      throw amplify_core.AmplifyCodeGenModelException(
          amplify_core.AmplifyExceptionMessages.codeGenRequiredFieldForceCastExceptionMessage,
          recoverySuggestion:
            amplify_core.AmplifyExceptionMessages.codeGenRequiredFieldForceCastRecoverySuggestion,
          underlyingException: e.toString()
          );
    }
  }
  
  const I18nString._internal({required languageKeys, required languageTexts}): _languageKeys = languageKeys, _languageTexts = languageTexts;
  
  factory I18nString({required List<String> languageKeys, required List<String> languageTexts}) {
    return I18nString._internal(
      languageKeys: languageKeys != null ? List<String>.unmodifiable(languageKeys) : languageKeys,
      languageTexts: languageTexts != null ? List<String>.unmodifiable(languageTexts) : languageTexts);
  }
  
  bool equals(Object other) {
    return this == other;
  }
  
  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is I18nString &&
      DeepCollectionEquality().equals(_languageKeys, other._languageKeys) &&
      DeepCollectionEquality().equals(_languageTexts, other._languageTexts);
  }
  
  @override
  int get hashCode => toString().hashCode;
  
  @override
  String toString() {
    var buffer = new StringBuffer();
    
    buffer.write("I18nString {");
    buffer.write("languageKeys=" + (_languageKeys != null ? _languageKeys!.toString() : "null") + ", ");
    buffer.write("languageTexts=" + (_languageTexts != null ? _languageTexts!.toString() : "null"));
    buffer.write("}");
    
    return buffer.toString();
  }
  
  I18nString copyWith({List<String>? languageKeys, List<String>? languageTexts}) {
    return I18nString._internal(
      languageKeys: languageKeys ?? this.languageKeys,
      languageTexts: languageTexts ?? this.languageTexts);
  }
  
  I18nString copyWithModelFieldValues({
    ModelFieldValue<List<String>>? languageKeys,
    ModelFieldValue<List<String>>? languageTexts
  }) {
    return I18nString._internal(
      languageKeys: languageKeys == null ? this.languageKeys : languageKeys.value,
      languageTexts: languageTexts == null ? this.languageTexts : languageTexts.value
    );
  }
  
  I18nString.fromJson(Map<String, dynamic> json)  
    : _languageKeys = json['languageKeys']?.cast<String>(),
      _languageTexts = json['languageTexts']?.cast<String>();
  
  Map<String, dynamic> toJson() => {
    'languageKeys': _languageKeys, 'languageTexts': _languageTexts
  };
  
  Map<String, Object?> toMap() => {
    'languageKeys': _languageKeys,
    'languageTexts': _languageTexts
  };

  static var schema = amplify_core.Model.defineSchema(define: (amplify_core.ModelSchemaDefinition modelSchemaDefinition) {
    modelSchemaDefinition.name = "I18nString";
    modelSchemaDefinition.pluralName = "I18nStrings";
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.customTypeField(
      fieldName: 'languageKeys',
      isRequired: true,
      isArray: true,
      ofType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.collection, ofModelName: amplify_core.ModelFieldTypeEnum.string.name)
    ));
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.customTypeField(
      fieldName: 'languageTexts',
      isRequired: true,
      isArray: true,
      ofType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.collection, ofModelName: amplify_core.ModelFieldTypeEnum.string.name)
    ));
  });
}