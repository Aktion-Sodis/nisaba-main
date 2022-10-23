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
import 'package:amplify_core/amplify_core.dart';
import 'package:collection/collection.dart';
import 'package:flutter/foundation.dart';


/** This is an auto generated class representing the QuestionAnswer type in your schema. */
@immutable
class QuestionAnswer {
  final String id;
  final String? _questionID;
  final TemporalDateTime? _date;
  final QuestionType? _type;
  final String? _text;
  final int? _intValue;
  final double? _doubleValue;
  final int? _rating;
  final List<QuestionOption>? _questionOptions;
  final List<Marking>? _markings;

  String get questionID {
    try {
      return _questionID!;
    } catch(e) {
      throw new AmplifyCodeGenModelException(
          AmplifyExceptionMessages.codeGenRequiredFieldForceCastExceptionMessage,
          recoverySuggestion:
            AmplifyExceptionMessages.codeGenRequiredFieldForceCastRecoverySuggestion,
          underlyingException: e.toString()
          );
    }
  }
  
  TemporalDateTime get date {
    try {
      return _date!;
    } catch(e) {
      throw new AmplifyCodeGenModelException(
          AmplifyExceptionMessages.codeGenRequiredFieldForceCastExceptionMessage,
          recoverySuggestion:
            AmplifyExceptionMessages.codeGenRequiredFieldForceCastRecoverySuggestion,
          underlyingException: e.toString()
          );
    }
  }
  
  QuestionType get type {
    try {
      return _type!;
    } catch(e) {
      throw new AmplifyCodeGenModelException(
          AmplifyExceptionMessages.codeGenRequiredFieldForceCastExceptionMessage,
          recoverySuggestion:
            AmplifyExceptionMessages.codeGenRequiredFieldForceCastRecoverySuggestion,
          underlyingException: e.toString()
          );
    }
  }
  
  String? get text {
    return _text;
  }
  
  int? get intValue {
    return _intValue;
  }
  
  double? get doubleValue {
    return _doubleValue;
  }
  
  int? get rating {
    return _rating;
  }
  
  List<QuestionOption>? get questionOptions {
    return _questionOptions;
  }
  
  List<Marking>? get markings {
    return _markings;
  }
  
  const QuestionAnswer._internal({required this.id, required questionID, required date, required type, text, intValue, doubleValue, rating, questionOptions, markings}): _questionID = questionID, _date = date, _type = type, _text = text, _intValue = intValue, _doubleValue = doubleValue, _rating = rating, _questionOptions = questionOptions, _markings = markings;
  
  factory QuestionAnswer({String? id, required String questionID, required TemporalDateTime date, required QuestionType type, String? text, int? intValue, double? doubleValue, int? rating, List<QuestionOption>? questionOptions, List<Marking>? markings}) {
    return QuestionAnswer._internal(
      id: id == null ? UUID.getUUID() : id,
      questionID: questionID,
      date: date,
      type: type,
      text: text,
      intValue: intValue,
      doubleValue: doubleValue,
      rating: rating,
      questionOptions: questionOptions != null ? List<QuestionOption>.unmodifiable(questionOptions) : questionOptions,
      markings: markings != null ? List<Marking>.unmodifiable(markings) : markings);
  }
  
  bool equals(Object other) {
    return this == other;
  }
  
  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is QuestionAnswer &&
      id == other.id &&
      _questionID == other._questionID &&
      _date == other._date &&
      _type == other._type &&
      _text == other._text &&
      _intValue == other._intValue &&
      _doubleValue == other._doubleValue &&
      _rating == other._rating &&
      DeepCollectionEquality().equals(_questionOptions, other._questionOptions) &&
      DeepCollectionEquality().equals(_markings, other._markings);
  }
  
  @override
  int get hashCode => toString().hashCode;
  
  @override
  String toString() {
    var buffer = new StringBuffer();
    
    buffer.write("QuestionAnswer {");
    buffer.write("id=" + "$id" + ", ");
    buffer.write("questionID=" + "$_questionID" + ", ");
    buffer.write("date=" + (_date != null ? _date!.format() : "null") + ", ");
    buffer.write("type=" + (_type != null ? enumToString(_type)! : "null") + ", ");
    buffer.write("text=" + "$_text" + ", ");
    buffer.write("intValue=" + (_intValue != null ? _intValue!.toString() : "null") + ", ");
    buffer.write("doubleValue=" + (_doubleValue != null ? _doubleValue!.toString() : "null") + ", ");
    buffer.write("rating=" + (_rating != null ? _rating!.toString() : "null") + ", ");
    buffer.write("questionOptions=" + (_questionOptions != null ? _questionOptions!.toString() : "null") + ", ");
    buffer.write("markings=" + (_markings != null ? _markings!.toString() : "null"));
    buffer.write("}");
    
    return buffer.toString();
  }
  
  QuestionAnswer copyWith({String? id, String? questionID, TemporalDateTime? date, QuestionType? type, String? text, int? intValue, double? doubleValue, int? rating, List<QuestionOption>? questionOptions, List<Marking>? markings}) {
    return QuestionAnswer._internal(
      id: id ?? this.id,
      questionID: questionID ?? this.questionID,
      date: date ?? this.date,
      type: type ?? this.type,
      text: text ?? this.text,
      intValue: intValue ?? this.intValue,
      doubleValue: doubleValue ?? this.doubleValue,
      rating: rating ?? this.rating,
      questionOptions: questionOptions ?? this.questionOptions,
      markings: markings ?? this.markings);
  }
  
  QuestionAnswer.fromJson(Map<String, dynamic> json)  
    : id = json['id'],
      _questionID = json['questionID'],
      _date = json['date'] != null ? TemporalDateTime.fromString(json['date']) : null,
      _type = enumFromString<QuestionType>(json['type'], QuestionType.values),
      _text = json['text'],
      _intValue = (json['intValue'] as num?)?.toInt(),
      _doubleValue = (json['doubleValue'] as num?)?.toDouble(),
      _rating = (json['rating'] as num?)?.toInt(),
      _questionOptions = json['questionOptions'] is List
        ? (json['questionOptions'] as List)
          .where((e) => e != null)
          .map((e) => QuestionOption.fromJson(new Map<String, dynamic>.from(e['serializedData'])))
          .toList()
        : null,
      _markings = json['markings'] is List
        ? (json['markings'] as List)
          .where((e) => e != null)
          .map((e) => Marking.fromJson(new Map<String, dynamic>.from(e['serializedData'])))
          .toList()
        : null;
  
  Map<String, dynamic> toJson() => {
    'id': id, 'questionID': _questionID, 'date': _date?.format(), 'type': enumToString(_type), 'text': _text, 'intValue': _intValue, 'doubleValue': _doubleValue, 'rating': _rating, 'questionOptions': _questionOptions?.map((QuestionOption? e) => e?.toJson()).toList(), 'markings': _markings?.map((Marking? e) => e?.toJson()).toList()
  };

  static var schema = Model.defineSchema(define: (ModelSchemaDefinition modelSchemaDefinition) {
    modelSchemaDefinition.name = "QuestionAnswer";
    modelSchemaDefinition.pluralName = "QuestionAnswers";
    
    modelSchemaDefinition.addField(ModelFieldDefinition.customTypeField(
      fieldName: 'id',
      isRequired: true,
      ofType: ModelFieldType(ModelFieldTypeEnum.string)
    ));
    
    modelSchemaDefinition.addField(ModelFieldDefinition.customTypeField(
      fieldName: 'questionID',
      isRequired: true,
      ofType: ModelFieldType(ModelFieldTypeEnum.string)
    ));
    
    modelSchemaDefinition.addField(ModelFieldDefinition.customTypeField(
      fieldName: 'date',
      isRequired: true,
      ofType: ModelFieldType(ModelFieldTypeEnum.dateTime)
    ));
    
    modelSchemaDefinition.addField(ModelFieldDefinition.customTypeField(
      fieldName: 'type',
      isRequired: true,
      ofType: ModelFieldType(ModelFieldTypeEnum.enumeration)
    ));
    
    modelSchemaDefinition.addField(ModelFieldDefinition.customTypeField(
      fieldName: 'text',
      isRequired: false,
      ofType: ModelFieldType(ModelFieldTypeEnum.string)
    ));
    
    modelSchemaDefinition.addField(ModelFieldDefinition.customTypeField(
      fieldName: 'intValue',
      isRequired: false,
      ofType: ModelFieldType(ModelFieldTypeEnum.int)
    ));
    
    modelSchemaDefinition.addField(ModelFieldDefinition.customTypeField(
      fieldName: 'doubleValue',
      isRequired: false,
      ofType: ModelFieldType(ModelFieldTypeEnum.double)
    ));
    
    modelSchemaDefinition.addField(ModelFieldDefinition.customTypeField(
      fieldName: 'rating',
      isRequired: false,
      ofType: ModelFieldType(ModelFieldTypeEnum.int)
    ));
    
    modelSchemaDefinition.addField(ModelFieldDefinition.embedded(
      fieldName: 'questionOptions',
      isRequired: false,
      isArray: true,
      ofType: ModelFieldType(ModelFieldTypeEnum.embeddedCollection, ofCustomTypeName: 'QuestionOption')
    ));
    
    modelSchemaDefinition.addField(ModelFieldDefinition.embedded(
      fieldName: 'markings',
      isRequired: false,
      isArray: true,
      ofType: ModelFieldType(ModelFieldTypeEnum.embeddedCollection, ofCustomTypeName: 'Marking')
    ));
  });
}