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


/** This is an auto generated class representing the Question type in your schema. */
class Question {
  final String id;
  final I18nString? _text;
  final QuestionType? _type;
  final List<QuestionOption>? _questionOptions;
  final bool? _isFollowUpQuestion;

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
  
  QuestionType get type {
    try {
      return _type!;
    } catch(e) {
      throw amplify_core.AmplifyCodeGenModelException(
          amplify_core.AmplifyExceptionMessages.codeGenRequiredFieldForceCastExceptionMessage,
          recoverySuggestion:
            amplify_core.AmplifyExceptionMessages.codeGenRequiredFieldForceCastRecoverySuggestion,
          underlyingException: e.toString()
          );
    }
  }
  
  List<QuestionOption>? get questionOptions {
    return _questionOptions;
  }
  
  bool get isFollowUpQuestion {
    try {
      return _isFollowUpQuestion!;
    } catch(e) {
      throw amplify_core.AmplifyCodeGenModelException(
          amplify_core.AmplifyExceptionMessages.codeGenRequiredFieldForceCastExceptionMessage,
          recoverySuggestion:
            amplify_core.AmplifyExceptionMessages.codeGenRequiredFieldForceCastRecoverySuggestion,
          underlyingException: e.toString()
          );
    }
  }
  
  const Question._internal({required this.id, required text, required type, questionOptions, required isFollowUpQuestion}): _text = text, _type = type, _questionOptions = questionOptions, _isFollowUpQuestion = isFollowUpQuestion;
  
  factory Question({String? id, required I18nString text, required QuestionType type, List<QuestionOption>? questionOptions, required bool isFollowUpQuestion}) {
    return Question._internal(
      id: id == null ? amplify_core.UUID.getUUID() : id,
      text: text,
      type: type,
      questionOptions: questionOptions != null ? List<QuestionOption>.unmodifiable(questionOptions) : questionOptions,
      isFollowUpQuestion: isFollowUpQuestion);
  }
  
  bool equals(Object other) {
    return this == other;
  }
  
  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is Question &&
      id == other.id &&
      _text == other._text &&
      _type == other._type &&
      DeepCollectionEquality().equals(_questionOptions, other._questionOptions) &&
      _isFollowUpQuestion == other._isFollowUpQuestion;
  }
  
  @override
  int get hashCode => toString().hashCode;
  
  @override
  String toString() {
    var buffer = new StringBuffer();
    
    buffer.write("Question {");
    buffer.write("id=" + "$id" + ", ");
    buffer.write("text=" + (_text != null ? _text!.toString() : "null") + ", ");
    buffer.write("type=" + (_type != null ? amplify_core.enumToString(_type)! : "null") + ", ");
    buffer.write("questionOptions=" + (_questionOptions != null ? _questionOptions!.toString() : "null") + ", ");
    buffer.write("isFollowUpQuestion=" + (_isFollowUpQuestion != null ? _isFollowUpQuestion!.toString() : "null"));
    buffer.write("}");
    
    return buffer.toString();
  }
  
  Question copyWith({String? id, I18nString? text, QuestionType? type, List<QuestionOption>? questionOptions, bool? isFollowUpQuestion}) {
    return Question._internal(
      id: id ?? this.id,
      text: text ?? this.text,
      type: type ?? this.type,
      questionOptions: questionOptions ?? this.questionOptions,
      isFollowUpQuestion: isFollowUpQuestion ?? this.isFollowUpQuestion);
  }
  
  Question copyWithModelFieldValues({
    ModelFieldValue<String>? id,
    ModelFieldValue<I18nString>? text,
    ModelFieldValue<QuestionType>? type,
    ModelFieldValue<List<QuestionOption>>? questionOptions,
    ModelFieldValue<bool>? isFollowUpQuestion
  }) {
    return Question._internal(
      id: id == null ? this.id : id.value,
      text: text == null ? this.text : text.value,
      type: type == null ? this.type : type.value,
      questionOptions: questionOptions == null ? this.questionOptions : questionOptions.value,
      isFollowUpQuestion: isFollowUpQuestion == null ? this.isFollowUpQuestion : isFollowUpQuestion.value
    );
  }
  
  Question.fromJson(Map<String, dynamic> json)  
    : id = json['id'],
      _text = json['text']?['serializedData'] != null
        ? I18nString.fromJson(new Map<String, dynamic>.from(json['text']['serializedData']))
        : null,
      _type = amplify_core.enumFromString<QuestionType>(json['type'], QuestionType.values),
      _questionOptions = json['questionOptions'] is List
        ? (json['questionOptions'] as List)
          .where((e) => e != null)
          .map((e) => QuestionOption.fromJson(new Map<String, dynamic>.from(e['serializedData'])))
          .toList()
        : null,
      _isFollowUpQuestion = json['isFollowUpQuestion'];
  
  Map<String, dynamic> toJson() => {
    'id': id, 'text': _text?.toJson(), 'type': amplify_core.enumToString(_type), 'questionOptions': _questionOptions?.map((QuestionOption? e) => e?.toJson()).toList(), 'isFollowUpQuestion': _isFollowUpQuestion
  };
  
  Map<String, Object?> toMap() => {
    'id': id,
    'text': _text,
    'type': _type,
    'questionOptions': _questionOptions,
    'isFollowUpQuestion': _isFollowUpQuestion
  };

  static var schema = amplify_core.Model.defineSchema(define: (amplify_core.ModelSchemaDefinition modelSchemaDefinition) {
    modelSchemaDefinition.name = "Question";
    modelSchemaDefinition.pluralName = "Questions";
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.customTypeField(
      fieldName: 'id',
      isRequired: true,
      ofType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.string)
    ));
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.embedded(
      fieldName: 'text',
      isRequired: true,
      ofType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.embedded, ofCustomTypeName: 'I18nString')
    ));
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.customTypeField(
      fieldName: 'type',
      isRequired: true,
      ofType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.enumeration)
    ));
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.embedded(
      fieldName: 'questionOptions',
      isRequired: false,
      isArray: true,
      ofType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.embeddedCollection, ofCustomTypeName: 'QuestionOption')
    ));
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.customTypeField(
      fieldName: 'isFollowUpQuestion',
      isRequired: true,
      ofType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.bool)
    ));
  });
}