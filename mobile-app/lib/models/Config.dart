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


/** This is an auto generated class representing the Config type in your schema. */
@immutable
class Config extends Model {
  static const classType = const _ConfigModelType();
  final String id;
  final String? _name;
  final ColorTheme? _colorTheme;
  final int? _schemeVersion;
  final TemporalDateTime? _createdAt;
  final TemporalDateTime? _updatedAt;

  @override
  getInstanceType() => classType;
  
  @Deprecated('[getId] is being deprecated in favor of custom primary key feature. Use getter [modelIdentifier] to get model identifier.')
  @override
  String getId() => id;
  
  ConfigModelIdentifier get modelIdentifier {
      return ConfigModelIdentifier(
        id: id
      );
  }
  
  String get name {
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
  
  ColorTheme? get colorTheme {
    return _colorTheme;
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
  
  const Config._internal({required this.id, required name, colorTheme, schemeVersion, createdAt, updatedAt}): _name = name, _colorTheme = colorTheme, _schemeVersion = schemeVersion, _createdAt = createdAt, _updatedAt = updatedAt;
  
  factory Config({String? id, required String name, ColorTheme? colorTheme, int? schemeVersion}) {
    return Config._internal(
      id: id == null ? UUID.getUUID() : id,
      name: name,
      colorTheme: colorTheme,
      schemeVersion: schemeVersion);
  }
  
  bool equals(Object other) {
    return this == other;
  }
  
  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is Config &&
      id == other.id &&
      _name == other._name &&
      _colorTheme == other._colorTheme &&
      _schemeVersion == other._schemeVersion;
  }
  
  @override
  int get hashCode => toString().hashCode;
  
  @override
  String toString() {
    var buffer = new StringBuffer();
    
    buffer.write("Config {");
    buffer.write("id=" + "$id" + ", ");
    buffer.write("name=" + "$_name" + ", ");
    buffer.write("colorTheme=" + (_colorTheme != null ? _colorTheme!.toString() : "null") + ", ");
    buffer.write("schemeVersion=" + (_schemeVersion != null ? _schemeVersion!.toString() : "null") + ", ");
    buffer.write("createdAt=" + (_createdAt != null ? _createdAt!.format() : "null") + ", ");
    buffer.write("updatedAt=" + (_updatedAt != null ? _updatedAt!.format() : "null"));
    buffer.write("}");
    
    return buffer.toString();
  }
  
  Config copyWith({String? name, ColorTheme? colorTheme, int? schemeVersion}) {
    return Config._internal(
      id: id,
      name: name ?? this.name,
      colorTheme: colorTheme ?? this.colorTheme,
      schemeVersion: schemeVersion ?? this.schemeVersion);
  }
  
  Config.fromJson(Map<String, dynamic> json)  
    : id = json['id'],
      _name = json['name'],
      _colorTheme = json['colorTheme']?['serializedData'] != null
        ? ColorTheme.fromJson(new Map<String, dynamic>.from(json['colorTheme']['serializedData']))
        : null,
      _schemeVersion = (json['schemeVersion'] as num?)?.toInt(),
      _createdAt = json['createdAt'] != null ? TemporalDateTime.fromString(json['createdAt']) : null,
      _updatedAt = json['updatedAt'] != null ? TemporalDateTime.fromString(json['updatedAt']) : null;
  
  Map<String, dynamic> toJson() => {
    'id': id, 'name': _name, 'colorTheme': _colorTheme?.toJson(), 'schemeVersion': _schemeVersion, 'createdAt': _createdAt?.format(), 'updatedAt': _updatedAt?.format()
  };
  
  Map<String, Object?> toMap() => {
    'id': id, 'name': _name, 'colorTheme': _colorTheme, 'schemeVersion': _schemeVersion, 'createdAt': _createdAt, 'updatedAt': _updatedAt
  };

  static final QueryModelIdentifier<ConfigModelIdentifier> MODEL_IDENTIFIER = QueryModelIdentifier<ConfigModelIdentifier>();
  static final QueryField ID = QueryField(fieldName: "id");
  static final QueryField NAME = QueryField(fieldName: "name");
  static final QueryField COLORTHEME = QueryField(fieldName: "colorTheme");
  static final QueryField SCHEMEVERSION = QueryField(fieldName: "schemeVersion");
  static var schema = Model.defineSchema(define: (ModelSchemaDefinition modelSchemaDefinition) {
    modelSchemaDefinition.name = "Config";
    modelSchemaDefinition.pluralName = "Configs";
    
    modelSchemaDefinition.authRules = [
      AuthRule(
        authStrategy: AuthStrategy.OWNER,
        ownerField: "organization_id",
        identityClaim: "custom:organization_id",
        provider: AuthRuleProvider.USERPOOLS,
        operations: [
          ModelOperation.CREATE,
          ModelOperation.UPDATE,
          ModelOperation.DELETE,
          ModelOperation.READ
        ])
    ];
    
    modelSchemaDefinition.addField(ModelFieldDefinition.id());
    
    modelSchemaDefinition.addField(ModelFieldDefinition.field(
      key: Config.NAME,
      isRequired: true,
      ofType: ModelFieldType(ModelFieldTypeEnum.string)
    ));
    
    modelSchemaDefinition.addField(ModelFieldDefinition.embedded(
      fieldName: 'colorTheme',
      isRequired: false,
      ofType: ModelFieldType(ModelFieldTypeEnum.embedded, ofCustomTypeName: 'ColorTheme')
    ));
    
    modelSchemaDefinition.addField(ModelFieldDefinition.field(
      key: Config.SCHEMEVERSION,
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
  });
}

class _ConfigModelType extends ModelType<Config> {
  const _ConfigModelType();
  
  @override
  Config fromJson(Map<String, dynamic> jsonData) {
    return Config.fromJson(jsonData);
  }
  
  @override
  String modelName() {
    return 'Config';
  }
}

/**
 * This is an auto generated class representing the model identifier
 * of [Config] in your schema.
 */
@immutable
class ConfigModelIdentifier implements ModelIdentifier<Config> {
  final String id;

  /** Create an instance of ConfigModelIdentifier using [id] the primary key. */
  const ConfigModelIdentifier({
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
  String toString() => 'ConfigModelIdentifier(id: $id)';
  
  @override
  bool operator ==(Object other) {
    if (identical(this, other)) {
      return true;
    }
    
    return other is ConfigModelIdentifier &&
      id == other.id;
  }
  
  @override
  int get hashCode =>
    id.hashCode;
}