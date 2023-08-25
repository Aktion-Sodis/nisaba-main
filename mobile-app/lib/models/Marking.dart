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


/** This is an auto generated class representing the Marking type in your schema. */
class Marking {
  final double? _x;
  final double? _y;
  final double? _rx;
  final double? _ry;
  final String? _text;

  double get x {
    try {
      return _x!;
    } catch(e) {
      throw amplify_core.AmplifyCodeGenModelException(
          amplify_core.AmplifyExceptionMessages.codeGenRequiredFieldForceCastExceptionMessage,
          recoverySuggestion:
            amplify_core.AmplifyExceptionMessages.codeGenRequiredFieldForceCastRecoverySuggestion,
          underlyingException: e.toString()
          );
    }
  }
  
  double get y {
    try {
      return _y!;
    } catch(e) {
      throw amplify_core.AmplifyCodeGenModelException(
          amplify_core.AmplifyExceptionMessages.codeGenRequiredFieldForceCastExceptionMessage,
          recoverySuggestion:
            amplify_core.AmplifyExceptionMessages.codeGenRequiredFieldForceCastRecoverySuggestion,
          underlyingException: e.toString()
          );
    }
  }
  
  double get rx {
    try {
      return _rx!;
    } catch(e) {
      throw amplify_core.AmplifyCodeGenModelException(
          amplify_core.AmplifyExceptionMessages.codeGenRequiredFieldForceCastExceptionMessage,
          recoverySuggestion:
            amplify_core.AmplifyExceptionMessages.codeGenRequiredFieldForceCastRecoverySuggestion,
          underlyingException: e.toString()
          );
    }
  }
  
  double get ry {
    try {
      return _ry!;
    } catch(e) {
      throw amplify_core.AmplifyCodeGenModelException(
          amplify_core.AmplifyExceptionMessages.codeGenRequiredFieldForceCastExceptionMessage,
          recoverySuggestion:
            amplify_core.AmplifyExceptionMessages.codeGenRequiredFieldForceCastRecoverySuggestion,
          underlyingException: e.toString()
          );
    }
  }
  
  String get text {
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
  
  const Marking._internal({required x, required y, required rx, required ry, required text}): _x = x, _y = y, _rx = rx, _ry = ry, _text = text;
  
  factory Marking({required double x, required double y, required double rx, required double ry, required String text}) {
    return Marking._internal(
      x: x,
      y: y,
      rx: rx,
      ry: ry,
      text: text);
  }
  
  bool equals(Object other) {
    return this == other;
  }
  
  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is Marking &&
      _x == other._x &&
      _y == other._y &&
      _rx == other._rx &&
      _ry == other._ry &&
      _text == other._text;
  }
  
  @override
  int get hashCode => toString().hashCode;
  
  @override
  String toString() {
    var buffer = new StringBuffer();
    
    buffer.write("Marking {");
    buffer.write("x=" + (_x != null ? _x!.toString() : "null") + ", ");
    buffer.write("y=" + (_y != null ? _y!.toString() : "null") + ", ");
    buffer.write("rx=" + (_rx != null ? _rx!.toString() : "null") + ", ");
    buffer.write("ry=" + (_ry != null ? _ry!.toString() : "null") + ", ");
    buffer.write("text=" + "$_text");
    buffer.write("}");
    
    return buffer.toString();
  }
  
  Marking copyWith({double? x, double? y, double? rx, double? ry, String? text}) {
    return Marking._internal(
      x: x ?? this.x,
      y: y ?? this.y,
      rx: rx ?? this.rx,
      ry: ry ?? this.ry,
      text: text ?? this.text);
  }
  
  Marking copyWithModelFieldValues({
    ModelFieldValue<double>? x,
    ModelFieldValue<double>? y,
    ModelFieldValue<double>? rx,
    ModelFieldValue<double>? ry,
    ModelFieldValue<String>? text
  }) {
    return Marking._internal(
      x: x == null ? this.x : x.value,
      y: y == null ? this.y : y.value,
      rx: rx == null ? this.rx : rx.value,
      ry: ry == null ? this.ry : ry.value,
      text: text == null ? this.text : text.value
    );
  }
  
  Marking.fromJson(Map<String, dynamic> json)  
    : _x = (json['x'] as num?)?.toDouble(),
      _y = (json['y'] as num?)?.toDouble(),
      _rx = (json['rx'] as num?)?.toDouble(),
      _ry = (json['ry'] as num?)?.toDouble(),
      _text = json['text'];
  
  Map<String, dynamic> toJson() => {
    'x': _x, 'y': _y, 'rx': _rx, 'ry': _ry, 'text': _text
  };
  
  Map<String, Object?> toMap() => {
    'x': _x,
    'y': _y,
    'rx': _rx,
    'ry': _ry,
    'text': _text
  };

  static var schema = amplify_core.Model.defineSchema(define: (amplify_core.ModelSchemaDefinition modelSchemaDefinition) {
    modelSchemaDefinition.name = "Marking";
    modelSchemaDefinition.pluralName = "Markings";
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.customTypeField(
      fieldName: 'x',
      isRequired: true,
      ofType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.double)
    ));
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.customTypeField(
      fieldName: 'y',
      isRequired: true,
      ofType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.double)
    ));
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.customTypeField(
      fieldName: 'rx',
      isRequired: true,
      ofType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.double)
    ));
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.customTypeField(
      fieldName: 'ry',
      isRequired: true,
      ofType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.double)
    ));
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.customTypeField(
      fieldName: 'text',
      isRequired: true,
      ofType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.string)
    ));
  });
}