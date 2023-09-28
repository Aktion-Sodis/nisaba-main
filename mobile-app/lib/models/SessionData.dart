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


/** This is an auto generated class representing the SessionData type in your schema. */
class SessionData extends amplify_core.Model {
  static const classType = const _SessionDataModelType();
  final String id;
  final amplify_core.TemporalDateTime? _date;
  final String? _userID;
  final String? _app;
  final String? _version;
  final String? _buildNumber;
  final String? _remoteConfig;
  final String? _platform;
  final amplify_core.TemporalDateTime? _createdAt;
  final amplify_core.TemporalDateTime? _updatedAt;

  @override
  getInstanceType() => classType;
  
  @Deprecated('[getId] is being deprecated in favor of custom primary key feature. Use getter [modelIdentifier] to get model identifier.')
  @override
  String getId() => id;
  
  SessionDataModelIdentifier get modelIdentifier {
      return SessionDataModelIdentifier(
        id: id
      );
  }
  
  amplify_core.TemporalDateTime get date {
    try {
      return _date!;
    } catch(e) {
      throw amplify_core.AmplifyCodeGenModelException(
          amplify_core.AmplifyExceptionMessages.codeGenRequiredFieldForceCastExceptionMessage,
          recoverySuggestion:
            amplify_core.AmplifyExceptionMessages.codeGenRequiredFieldForceCastRecoverySuggestion,
          underlyingException: e.toString()
          );
    }
  }
  
  String? get userID {
    return _userID;
  }
  
  String? get app {
    return _app;
  }
  
  String? get version {
    return _version;
  }
  
  String? get buildNumber {
    return _buildNumber;
  }
  
  String? get remoteConfig {
    return _remoteConfig;
  }
  
  String? get platform {
    return _platform;
  }
  
  amplify_core.TemporalDateTime? get createdAt {
    return _createdAt;
  }
  
  amplify_core.TemporalDateTime? get updatedAt {
    return _updatedAt;
  }
  
  const SessionData._internal({required this.id, required date, userID, app, version, buildNumber, remoteConfig, platform, createdAt, updatedAt}): _date = date, _userID = userID, _app = app, _version = version, _buildNumber = buildNumber, _remoteConfig = remoteConfig, _platform = platform, _createdAt = createdAt, _updatedAt = updatedAt;
  
  factory SessionData({String? id, required amplify_core.TemporalDateTime date, String? userID, String? app, String? version, String? buildNumber, String? remoteConfig, String? platform}) {
    return SessionData._internal(
      id: id == null ? amplify_core.UUID.getUUID() : id,
      date: date,
      userID: userID,
      app: app,
      version: version,
      buildNumber: buildNumber,
      remoteConfig: remoteConfig,
      platform: platform);
  }
  
  bool equals(Object other) {
    return this == other;
  }
  
  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is SessionData &&
      id == other.id &&
      _date == other._date &&
      _userID == other._userID &&
      _app == other._app &&
      _version == other._version &&
      _buildNumber == other._buildNumber &&
      _remoteConfig == other._remoteConfig &&
      _platform == other._platform;
  }
  
  @override
  int get hashCode => toString().hashCode;
  
  @override
  String toString() {
    var buffer = new StringBuffer();
    
    buffer.write("SessionData {");
    buffer.write("id=" + "$id" + ", ");
    buffer.write("date=" + (_date != null ? _date!.format() : "null") + ", ");
    buffer.write("userID=" + "$_userID" + ", ");
    buffer.write("app=" + "$_app" + ", ");
    buffer.write("version=" + "$_version" + ", ");
    buffer.write("buildNumber=" + "$_buildNumber" + ", ");
    buffer.write("remoteConfig=" + "$_remoteConfig" + ", ");
    buffer.write("platform=" + "$_platform" + ", ");
    buffer.write("createdAt=" + (_createdAt != null ? _createdAt!.format() : "null") + ", ");
    buffer.write("updatedAt=" + (_updatedAt != null ? _updatedAt!.format() : "null"));
    buffer.write("}");
    
    return buffer.toString();
  }
  
  SessionData copyWith({amplify_core.TemporalDateTime? date, String? userID, String? app, String? version, String? buildNumber, String? remoteConfig, String? platform}) {
    return SessionData._internal(
      id: id,
      date: date ?? this.date,
      userID: userID ?? this.userID,
      app: app ?? this.app,
      version: version ?? this.version,
      buildNumber: buildNumber ?? this.buildNumber,
      remoteConfig: remoteConfig ?? this.remoteConfig,
      platform: platform ?? this.platform);
  }
  
  SessionData copyWithModelFieldValues({
    ModelFieldValue<amplify_core.TemporalDateTime>? date,
    ModelFieldValue<String?>? userID,
    ModelFieldValue<String?>? app,
    ModelFieldValue<String?>? version,
    ModelFieldValue<String?>? buildNumber,
    ModelFieldValue<String?>? remoteConfig,
    ModelFieldValue<String?>? platform
  }) {
    return SessionData._internal(
      id: id,
      date: date == null ? this.date : date.value,
      userID: userID == null ? this.userID : userID.value,
      app: app == null ? this.app : app.value,
      version: version == null ? this.version : version.value,
      buildNumber: buildNumber == null ? this.buildNumber : buildNumber.value,
      remoteConfig: remoteConfig == null ? this.remoteConfig : remoteConfig.value,
      platform: platform == null ? this.platform : platform.value
    );
  }
  
  SessionData.fromJson(Map<String, dynamic> json)  
    : id = json['id'],
      _date = json['date'] != null ? amplify_core.TemporalDateTime.fromString(json['date']) : null,
      _userID = json['userID'],
      _app = json['app'],
      _version = json['version'],
      _buildNumber = json['buildNumber'],
      _remoteConfig = json['remoteConfig'],
      _platform = json['platform'],
      _createdAt = json['createdAt'] != null ? amplify_core.TemporalDateTime.fromString(json['createdAt']) : null,
      _updatedAt = json['updatedAt'] != null ? amplify_core.TemporalDateTime.fromString(json['updatedAt']) : null;
  
  Map<String, dynamic> toJson() => {
    'id': id, 'date': _date?.format(), 'userID': _userID, 'app': _app, 'version': _version, 'buildNumber': _buildNumber, 'remoteConfig': _remoteConfig, 'platform': _platform, 'createdAt': _createdAt?.format(), 'updatedAt': _updatedAt?.format()
  };
  
  Map<String, Object?> toMap() => {
    'id': id,
    'date': _date,
    'userID': _userID,
    'app': _app,
    'version': _version,
    'buildNumber': _buildNumber,
    'remoteConfig': _remoteConfig,
    'platform': _platform,
    'createdAt': _createdAt,
    'updatedAt': _updatedAt
  };

  static final amplify_core.QueryModelIdentifier<SessionDataModelIdentifier> MODEL_IDENTIFIER = amplify_core.QueryModelIdentifier<SessionDataModelIdentifier>();
  static final ID = amplify_core.QueryField(fieldName: "id");
  static final DATE = amplify_core.QueryField(fieldName: "date");
  static final USERID = amplify_core.QueryField(fieldName: "userID");
  static final APP = amplify_core.QueryField(fieldName: "app");
  static final VERSION = amplify_core.QueryField(fieldName: "version");
  static final BUILDNUMBER = amplify_core.QueryField(fieldName: "buildNumber");
  static final REMOTECONFIG = amplify_core.QueryField(fieldName: "remoteConfig");
  static final PLATFORM = amplify_core.QueryField(fieldName: "platform");
  static var schema = amplify_core.Model.defineSchema(define: (amplify_core.ModelSchemaDefinition modelSchemaDefinition) {
    modelSchemaDefinition.name = "SessionData";
    modelSchemaDefinition.pluralName = "SessionData";
    
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
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.field(
      key: SessionData.DATE,
      isRequired: true,
      ofType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.dateTime)
    ));
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.field(
      key: SessionData.USERID,
      isRequired: false,
      ofType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.string)
    ));
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.field(
      key: SessionData.APP,
      isRequired: false,
      ofType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.string)
    ));
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.field(
      key: SessionData.VERSION,
      isRequired: false,
      ofType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.string)
    ));
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.field(
      key: SessionData.BUILDNUMBER,
      isRequired: false,
      ofType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.string)
    ));
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.field(
      key: SessionData.REMOTECONFIG,
      isRequired: false,
      ofType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.string)
    ));
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.field(
      key: SessionData.PLATFORM,
      isRequired: false,
      ofType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.string)
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

class _SessionDataModelType extends amplify_core.ModelType<SessionData> {
  const _SessionDataModelType();
  
  @override
  SessionData fromJson(Map<String, dynamic> jsonData) {
    return SessionData.fromJson(jsonData);
  }
  
  @override
  String modelName() {
    return 'SessionData';
  }
}

/**
 * This is an auto generated class representing the model identifier
 * of [SessionData] in your schema.
 */
class SessionDataModelIdentifier implements amplify_core.ModelIdentifier<SessionData> {
  final String id;

  /** Create an instance of SessionDataModelIdentifier using [id] the primary key. */
  const SessionDataModelIdentifier({
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
  String toString() => 'SessionDataModelIdentifier(id: $id)';
  
  @override
  bool operator ==(Object other) {
    if (identical(this, other)) {
      return true;
    }
    
    return other is SessionDataModelIdentifier &&
      id == other.id;
  }
  
  @override
  int get hashCode =>
    id.hashCode;
}