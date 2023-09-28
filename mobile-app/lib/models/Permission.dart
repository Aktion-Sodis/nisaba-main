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


/** This is an auto generated class representing the Permission type in your schema. */
class Permission {
  final PermissionType? _permissionType;
  final List<String>? _allowedEntities;

  PermissionType get permissionType {
    try {
      return _permissionType!;
    } catch(e) {
      throw amplify_core.AmplifyCodeGenModelException(
          amplify_core.AmplifyExceptionMessages.codeGenRequiredFieldForceCastExceptionMessage,
          recoverySuggestion:
            amplify_core.AmplifyExceptionMessages.codeGenRequiredFieldForceCastRecoverySuggestion,
          underlyingException: e.toString()
          );
    }
  }
  
  List<String> get allowedEntities {
    try {
      return _allowedEntities!;
    } catch(e) {
      throw amplify_core.AmplifyCodeGenModelException(
          amplify_core.AmplifyExceptionMessages.codeGenRequiredFieldForceCastExceptionMessage,
          recoverySuggestion:
            amplify_core.AmplifyExceptionMessages.codeGenRequiredFieldForceCastRecoverySuggestion,
          underlyingException: e.toString()
          );
    }
  }
  
  const Permission._internal({required permissionType, required allowedEntities}): _permissionType = permissionType, _allowedEntities = allowedEntities;
  
  factory Permission({required PermissionType permissionType, required List<String> allowedEntities}) {
    return Permission._internal(
      permissionType: permissionType,
      allowedEntities: allowedEntities != null ? List<String>.unmodifiable(allowedEntities) : allowedEntities);
  }
  
  bool equals(Object other) {
    return this == other;
  }
  
  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is Permission &&
      _permissionType == other._permissionType &&
      DeepCollectionEquality().equals(_allowedEntities, other._allowedEntities);
  }
  
  @override
  int get hashCode => toString().hashCode;
  
  @override
  String toString() {
    var buffer = new StringBuffer();
    
    buffer.write("Permission {");
    buffer.write("permissionType=" + (_permissionType != null ? amplify_core.enumToString(_permissionType)! : "null") + ", ");
    buffer.write("allowedEntities=" + (_allowedEntities != null ? _allowedEntities!.toString() : "null"));
    buffer.write("}");
    
    return buffer.toString();
  }
  
  Permission copyWith({PermissionType? permissionType, List<String>? allowedEntities}) {
    return Permission._internal(
      permissionType: permissionType ?? this.permissionType,
      allowedEntities: allowedEntities ?? this.allowedEntities);
  }
  
  Permission copyWithModelFieldValues({
    ModelFieldValue<PermissionType>? permissionType,
    ModelFieldValue<List<String>>? allowedEntities
  }) {
    return Permission._internal(
      permissionType: permissionType == null ? this.permissionType : permissionType.value,
      allowedEntities: allowedEntities == null ? this.allowedEntities : allowedEntities.value
    );
  }
  
  Permission.fromJson(Map<String, dynamic> json)  
    : _permissionType = amplify_core.enumFromString<PermissionType>(json['permissionType'], PermissionType.values),
      _allowedEntities = json['allowedEntities']?.cast<String>();
  
  Map<String, dynamic> toJson() => {
    'permissionType': amplify_core.enumToString(_permissionType), 'allowedEntities': _allowedEntities
  };
  
  Map<String, Object?> toMap() => {
    'permissionType': _permissionType,
    'allowedEntities': _allowedEntities
  };

  static var schema = amplify_core.Model.defineSchema(define: (amplify_core.ModelSchemaDefinition modelSchemaDefinition) {
    modelSchemaDefinition.name = "Permission";
    modelSchemaDefinition.pluralName = "Permissions";
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.customTypeField(
      fieldName: 'permissionType',
      isRequired: true,
      ofType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.enumeration)
    ));
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.customTypeField(
      fieldName: 'allowedEntities',
      isRequired: true,
      isArray: true,
      ofType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.collection, ofModelName: amplify_core.ModelFieldTypeEnum.string.name)
    ));
  });
}