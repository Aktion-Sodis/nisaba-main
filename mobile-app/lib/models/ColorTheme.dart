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


/** This is an auto generated class representing the ColorTheme type in your schema. */
class ColorTheme {
  final String? _highlight;
  final String? _secondaryHighlight;
  final String? _backgroundOneLight;
  final String? _backgroundTwoLight;
  final String? _backgroundOneDark;
  final String? _backgroundTwoDark;

  String? get highlight {
    return _highlight;
  }
  
  String? get secondaryHighlight {
    return _secondaryHighlight;
  }
  
  String? get backgroundOneLight {
    return _backgroundOneLight;
  }
  
  String? get backgroundTwoLight {
    return _backgroundTwoLight;
  }
  
  String? get backgroundOneDark {
    return _backgroundOneDark;
  }
  
  String? get backgroundTwoDark {
    return _backgroundTwoDark;
  }
  
  const ColorTheme._internal({highlight, secondaryHighlight, backgroundOneLight, backgroundTwoLight, backgroundOneDark, backgroundTwoDark}): _highlight = highlight, _secondaryHighlight = secondaryHighlight, _backgroundOneLight = backgroundOneLight, _backgroundTwoLight = backgroundTwoLight, _backgroundOneDark = backgroundOneDark, _backgroundTwoDark = backgroundTwoDark;
  
  factory ColorTheme({String? highlight, String? secondaryHighlight, String? backgroundOneLight, String? backgroundTwoLight, String? backgroundOneDark, String? backgroundTwoDark}) {
    return ColorTheme._internal(
      highlight: highlight,
      secondaryHighlight: secondaryHighlight,
      backgroundOneLight: backgroundOneLight,
      backgroundTwoLight: backgroundTwoLight,
      backgroundOneDark: backgroundOneDark,
      backgroundTwoDark: backgroundTwoDark);
  }
  
  bool equals(Object other) {
    return this == other;
  }
  
  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is ColorTheme &&
      _highlight == other._highlight &&
      _secondaryHighlight == other._secondaryHighlight &&
      _backgroundOneLight == other._backgroundOneLight &&
      _backgroundTwoLight == other._backgroundTwoLight &&
      _backgroundOneDark == other._backgroundOneDark &&
      _backgroundTwoDark == other._backgroundTwoDark;
  }
  
  @override
  int get hashCode => toString().hashCode;
  
  @override
  String toString() {
    var buffer = new StringBuffer();
    
    buffer.write("ColorTheme {");
    buffer.write("highlight=" + "$_highlight" + ", ");
    buffer.write("secondaryHighlight=" + "$_secondaryHighlight" + ", ");
    buffer.write("backgroundOneLight=" + "$_backgroundOneLight" + ", ");
    buffer.write("backgroundTwoLight=" + "$_backgroundTwoLight" + ", ");
    buffer.write("backgroundOneDark=" + "$_backgroundOneDark" + ", ");
    buffer.write("backgroundTwoDark=" + "$_backgroundTwoDark");
    buffer.write("}");
    
    return buffer.toString();
  }
  
  ColorTheme copyWith({String? highlight, String? secondaryHighlight, String? backgroundOneLight, String? backgroundTwoLight, String? backgroundOneDark, String? backgroundTwoDark}) {
    return ColorTheme._internal(
      highlight: highlight ?? this.highlight,
      secondaryHighlight: secondaryHighlight ?? this.secondaryHighlight,
      backgroundOneLight: backgroundOneLight ?? this.backgroundOneLight,
      backgroundTwoLight: backgroundTwoLight ?? this.backgroundTwoLight,
      backgroundOneDark: backgroundOneDark ?? this.backgroundOneDark,
      backgroundTwoDark: backgroundTwoDark ?? this.backgroundTwoDark);
  }
  
  ColorTheme copyWithModelFieldValues({
    ModelFieldValue<String?>? highlight,
    ModelFieldValue<String?>? secondaryHighlight,
    ModelFieldValue<String?>? backgroundOneLight,
    ModelFieldValue<String?>? backgroundTwoLight,
    ModelFieldValue<String?>? backgroundOneDark,
    ModelFieldValue<String?>? backgroundTwoDark
  }) {
    return ColorTheme._internal(
      highlight: highlight == null ? this.highlight : highlight.value,
      secondaryHighlight: secondaryHighlight == null ? this.secondaryHighlight : secondaryHighlight.value,
      backgroundOneLight: backgroundOneLight == null ? this.backgroundOneLight : backgroundOneLight.value,
      backgroundTwoLight: backgroundTwoLight == null ? this.backgroundTwoLight : backgroundTwoLight.value,
      backgroundOneDark: backgroundOneDark == null ? this.backgroundOneDark : backgroundOneDark.value,
      backgroundTwoDark: backgroundTwoDark == null ? this.backgroundTwoDark : backgroundTwoDark.value
    );
  }
  
  ColorTheme.fromJson(Map<String, dynamic> json)  
    : _highlight = json['highlight'],
      _secondaryHighlight = json['secondaryHighlight'],
      _backgroundOneLight = json['backgroundOneLight'],
      _backgroundTwoLight = json['backgroundTwoLight'],
      _backgroundOneDark = json['backgroundOneDark'],
      _backgroundTwoDark = json['backgroundTwoDark'];
  
  Map<String, dynamic> toJson() => {
    'highlight': _highlight, 'secondaryHighlight': _secondaryHighlight, 'backgroundOneLight': _backgroundOneLight, 'backgroundTwoLight': _backgroundTwoLight, 'backgroundOneDark': _backgroundOneDark, 'backgroundTwoDark': _backgroundTwoDark
  };
  
  Map<String, Object?> toMap() => {
    'highlight': _highlight,
    'secondaryHighlight': _secondaryHighlight,
    'backgroundOneLight': _backgroundOneLight,
    'backgroundTwoLight': _backgroundTwoLight,
    'backgroundOneDark': _backgroundOneDark,
    'backgroundTwoDark': _backgroundTwoDark
  };

  static var schema = amplify_core.Model.defineSchema(define: (amplify_core.ModelSchemaDefinition modelSchemaDefinition) {
    modelSchemaDefinition.name = "ColorTheme";
    modelSchemaDefinition.pluralName = "ColorThemes";
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.customTypeField(
      fieldName: 'highlight',
      isRequired: false,
      ofType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.string)
    ));
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.customTypeField(
      fieldName: 'secondaryHighlight',
      isRequired: false,
      ofType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.string)
    ));
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.customTypeField(
      fieldName: 'backgroundOneLight',
      isRequired: false,
      ofType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.string)
    ));
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.customTypeField(
      fieldName: 'backgroundTwoLight',
      isRequired: false,
      ofType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.string)
    ));
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.customTypeField(
      fieldName: 'backgroundOneDark',
      isRequired: false,
      ofType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.string)
    ));
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.customTypeField(
      fieldName: 'backgroundTwoDark',
      isRequired: false,
      ofType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.string)
    ));
  });
}