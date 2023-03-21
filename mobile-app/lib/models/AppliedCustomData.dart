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
import 'package:flutter/foundation.dart';


/** This is an auto generated class representing the AppliedCustomData type in your schema. */
@immutable
class AppliedCustomData {
  final String? _customDataID;
  final Type? _type;
  final I18nString? _name;
  final int? _intValue;
  final String? _stringValue;

  String get customDataID {
    try {
      return _customDataID!;
    } catch(e) {
      throw new AmplifyCodeGenModelException(
          AmplifyExceptionMessages.codeGenRequiredFieldForceCastExceptionMessage,
          recoverySuggestion:
            AmplifyExceptionMessages.codeGenRequiredFieldForceCastRecoverySuggestion,
          underlyingException: e.toString()
          );
    }
  }
  
  Type get type {
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
  
  I18nString get name {
    try {
      return _name!;
    } catch(e) {
      throw new AmplifyCodeGenModelException(
          AmplifyExceptionMessages.codeGenRequiredFieldForceCastExceptionMessage,
          recoverySuggestion:
            AmplifyExceptionMessages.codeGenRequiredFieldForceCastRecoverySuggestion,
          underlyingException: e.toString()
          );
    }
  }
  
  int? get intValue {
    return _intValue;
  }
  
  String? get stringValue {
    return _stringValue;
  }
  
  const AppliedCustomData._internal({required customDataID, required type, required name, intValue, stringValue}): _customDataID = customDataID, _type = type, _name = name, _intValue = intValue, _stringValue = stringValue;
  
  factory AppliedCustomData({required String customDataID, required Type type, required I18nString name, int? intValue, String? stringValue}) {
    return AppliedCustomData._internal(
      customDataID: customDataID,
      type: type,
      name: name,
      intValue: intValue,
      stringValue: stringValue);
  }
  
  bool equals(Object other) {
    return this == other;
  }
  
  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is AppliedCustomData &&
      _customDataID == other._customDataID &&
      _type == other._type &&
      _name == other._name &&
      _intValue == other._intValue &&
      _stringValue == other._stringValue;
  }
  
  @override
  int get hashCode => toString().hashCode;
  
  @override
  String toString() {
    var buffer = new StringBuffer();
    
    buffer.write("AppliedCustomData {");
    buffer.write("customDataID=" + "$_customDataID" + ", ");
    buffer.write("type=" + (_type != null ? enumToString(_type)! : "null") + ", ");
    buffer.write("name=" + (_name != null ? _name!.toString() : "null") + ", ");
    buffer.write("intValue=" + (_intValue != null ? _intValue!.toString() : "null") + ", ");
    buffer.write("stringValue=" + "$_stringValue");
    buffer.write("}");
    
    return buffer.toString();
  }
  
  AppliedCustomData copyWith({String? customDataID, Type? type, I18nString? name, int? intValue, String? stringValue}) {
    return AppliedCustomData._internal(
      customDataID: customDataID ?? this.customDataID,
      type: type ?? this.type,
      name: name ?? this.name,
      intValue: intValue ?? this.intValue,
      stringValue: stringValue ?? this.stringValue);
  }
  
  AppliedCustomData.fromJson(Map<String, dynamic> json)  
    : _customDataID = json['customDataID'],
      _type = enumFromString<Type>(json['type'], Type.values),
      _name = json['name']?['serializedData'] != null
        ? I18nString.fromJson(new Map<String, dynamic>.from(json['name']['serializedData']))
        : null,
      _intValue = (json['intValue'] as num?)?.toInt(),
      _stringValue = json['stringValue'];
  
  Map<String, dynamic> toJson() => {
    'customDataID': _customDataID, 'type': enumToString(_type), 'name': _name?.toJson(), 'intValue': _intValue, 'stringValue': _stringValue
  };
  
  Map<String, Object?> toMap() => {
    'customDataID': _customDataID, 'type': _type, 'name': _name, 'intValue': _intValue, 'stringValue': _stringValue
  };

  static var schema = Model.defineSchema(define: (ModelSchemaDefinition modelSchemaDefinition) {
    modelSchemaDefinition.name = "AppliedCustomData";
    modelSchemaDefinition.pluralName = "AppliedCustomData";
    
    modelSchemaDefinition.addField(ModelFieldDefinition.customTypeField(
      fieldName: 'customDataID',
      isRequired: true,
      ofType: ModelFieldType(ModelFieldTypeEnum.string)
    ));
    
    modelSchemaDefinition.addField(ModelFieldDefinition.customTypeField(
      fieldName: 'type',
      isRequired: true,
      ofType: ModelFieldType(ModelFieldTypeEnum.enumeration)
    ));
    
    modelSchemaDefinition.addField(ModelFieldDefinition.embedded(
      fieldName: 'name',
      isRequired: true,
      ofType: ModelFieldType(ModelFieldTypeEnum.embedded, ofCustomTypeName: 'I18nString')
    ));
    
    modelSchemaDefinition.addField(ModelFieldDefinition.customTypeField(
      fieldName: 'intValue',
      isRequired: false,
      ofType: ModelFieldType(ModelFieldTypeEnum.int)
    ));
    
    modelSchemaDefinition.addField(ModelFieldDefinition.customTypeField(
      fieldName: 'stringValue',
      isRequired: false,
      ofType: ModelFieldType(ModelFieldTypeEnum.string)
    ));
  });
}