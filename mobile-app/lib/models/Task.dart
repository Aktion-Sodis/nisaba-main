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


/** This is an auto generated class representing the Task type in your schema. */
class Task extends amplify_core.Model {
  static const classType = const _TaskModelType();
  final String id;
  final String? _title;
  final String? _text;
  final amplify_core.TemporalDateTime? _dueDate;
  final amplify_core.TemporalDateTime? _finishedDate;
  final Location? _location;
  final User? _user;
  final String? _userID;
  final Entity? _entity;
  final AppliedIntervention? _appliedIntervention;
  final ExecutedSurvey? _executedSurvey;
  final int? _schemeVersion;
  final List<int>? _picIDs;
  final List<int>? _audioIDs;
  final amplify_core.TemporalDateTime? _createdAt;
  final amplify_core.TemporalDateTime? _updatedAt;
  final String? _taskUserId;
  final String? _taskEntityId;
  final String? _taskAppliedInterventionId;
  final String? _taskExecutedSurveyId;

  @override
  getInstanceType() => classType;
  
  @Deprecated('[getId] is being deprecated in favor of custom primary key feature. Use getter [modelIdentifier] to get model identifier.')
  @override
  String getId() => id;
  
  TaskModelIdentifier get modelIdentifier {
      return TaskModelIdentifier(
        id: id
      );
  }
  
  String get title {
    try {
      return _title!;
    } catch(e) {
      throw amplify_core.AmplifyCodeGenModelException(
          amplify_core.AmplifyExceptionMessages.codeGenRequiredFieldForceCastExceptionMessage,
          recoverySuggestion:
            amplify_core.AmplifyExceptionMessages.codeGenRequiredFieldForceCastRecoverySuggestion,
          underlyingException: e.toString()
          );
    }
  }
  
  String? get text {
    return _text;
  }
  
  amplify_core.TemporalDateTime? get dueDate {
    return _dueDate;
  }
  
  amplify_core.TemporalDateTime? get finishedDate {
    return _finishedDate;
  }
  
  Location? get location {
    return _location;
  }
  
  User get user {
    try {
      return _user!;
    } catch(e) {
      throw amplify_core.AmplifyCodeGenModelException(
          amplify_core.AmplifyExceptionMessages.codeGenRequiredFieldForceCastExceptionMessage,
          recoverySuggestion:
            amplify_core.AmplifyExceptionMessages.codeGenRequiredFieldForceCastRecoverySuggestion,
          underlyingException: e.toString()
          );
    }
  }
  
  String get userID {
    try {
      return _userID!;
    } catch(e) {
      throw amplify_core.AmplifyCodeGenModelException(
          amplify_core.AmplifyExceptionMessages.codeGenRequiredFieldForceCastExceptionMessage,
          recoverySuggestion:
            amplify_core.AmplifyExceptionMessages.codeGenRequiredFieldForceCastRecoverySuggestion,
          underlyingException: e.toString()
          );
    }
  }
  
  Entity? get entity {
    return _entity;
  }
  
  AppliedIntervention? get appliedIntervention {
    return _appliedIntervention;
  }
  
  ExecutedSurvey? get executedSurvey {
    return _executedSurvey;
  }
  
  int? get schemeVersion {
    return _schemeVersion;
  }
  
  List<int> get picIDs {
    try {
      return _picIDs!;
    } catch(e) {
      throw amplify_core.AmplifyCodeGenModelException(
          amplify_core.AmplifyExceptionMessages.codeGenRequiredFieldForceCastExceptionMessage,
          recoverySuggestion:
            amplify_core.AmplifyExceptionMessages.codeGenRequiredFieldForceCastRecoverySuggestion,
          underlyingException: e.toString()
          );
    }
  }
  
  List<int> get audioIDs {
    try {
      return _audioIDs!;
    } catch(e) {
      throw amplify_core.AmplifyCodeGenModelException(
          amplify_core.AmplifyExceptionMessages.codeGenRequiredFieldForceCastExceptionMessage,
          recoverySuggestion:
            amplify_core.AmplifyExceptionMessages.codeGenRequiredFieldForceCastRecoverySuggestion,
          underlyingException: e.toString()
          );
    }
  }
  
  amplify_core.TemporalDateTime? get createdAt {
    return _createdAt;
  }
  
  amplify_core.TemporalDateTime? get updatedAt {
    return _updatedAt;
  }
  
  String get taskUserId {
    try {
      return _taskUserId!;
    } catch(e) {
      throw amplify_core.AmplifyCodeGenModelException(
          amplify_core.AmplifyExceptionMessages.codeGenRequiredFieldForceCastExceptionMessage,
          recoverySuggestion:
            amplify_core.AmplifyExceptionMessages.codeGenRequiredFieldForceCastRecoverySuggestion,
          underlyingException: e.toString()
          );
    }
  }
  
  String? get taskEntityId {
    return _taskEntityId;
  }
  
  String? get taskAppliedInterventionId {
    return _taskAppliedInterventionId;
  }
  
  String? get taskExecutedSurveyId {
    return _taskExecutedSurveyId;
  }
  
  const Task._internal({required this.id, required title, text, dueDate, finishedDate, location, required user, required userID, entity, appliedIntervention, executedSurvey, schemeVersion, required picIDs, required audioIDs, createdAt, updatedAt, required taskUserId, taskEntityId, taskAppliedInterventionId, taskExecutedSurveyId}): _title = title, _text = text, _dueDate = dueDate, _finishedDate = finishedDate, _location = location, _user = user, _userID = userID, _entity = entity, _appliedIntervention = appliedIntervention, _executedSurvey = executedSurvey, _schemeVersion = schemeVersion, _picIDs = picIDs, _audioIDs = audioIDs, _createdAt = createdAt, _updatedAt = updatedAt, _taskUserId = taskUserId, _taskEntityId = taskEntityId, _taskAppliedInterventionId = taskAppliedInterventionId, _taskExecutedSurveyId = taskExecutedSurveyId;
  
  factory Task({String? id, required String title, String? text, amplify_core.TemporalDateTime? dueDate, amplify_core.TemporalDateTime? finishedDate, Location? location, required User user, required String userID, Entity? entity, AppliedIntervention? appliedIntervention, ExecutedSurvey? executedSurvey, int? schemeVersion, required List<int> picIDs, required List<int> audioIDs, required String taskUserId, String? taskEntityId, String? taskAppliedInterventionId, String? taskExecutedSurveyId}) {
    return Task._internal(
      id: id == null ? amplify_core.UUID.getUUID() : id,
      title: title,
      text: text,
      dueDate: dueDate,
      finishedDate: finishedDate,
      location: location,
      user: user,
      userID: userID,
      entity: entity,
      appliedIntervention: appliedIntervention,
      executedSurvey: executedSurvey,
      schemeVersion: schemeVersion,
      picIDs: picIDs != null ? List<int>.unmodifiable(picIDs) : picIDs,
      audioIDs: audioIDs != null ? List<int>.unmodifiable(audioIDs) : audioIDs,
      taskUserId: taskUserId,
      taskEntityId: taskEntityId,
      taskAppliedInterventionId: taskAppliedInterventionId,
      taskExecutedSurveyId: taskExecutedSurveyId);
  }
  
  bool equals(Object other) {
    return this == other;
  }
  
  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is Task &&
      id == other.id &&
      _title == other._title &&
      _text == other._text &&
      _dueDate == other._dueDate &&
      _finishedDate == other._finishedDate &&
      _location == other._location &&
      _user == other._user &&
      _userID == other._userID &&
      _entity == other._entity &&
      _appliedIntervention == other._appliedIntervention &&
      _executedSurvey == other._executedSurvey &&
      _schemeVersion == other._schemeVersion &&
      DeepCollectionEquality().equals(_picIDs, other._picIDs) &&
      DeepCollectionEquality().equals(_audioIDs, other._audioIDs) &&
      _taskUserId == other._taskUserId &&
      _taskEntityId == other._taskEntityId &&
      _taskAppliedInterventionId == other._taskAppliedInterventionId &&
      _taskExecutedSurveyId == other._taskExecutedSurveyId;
  }
  
  @override
  int get hashCode => toString().hashCode;
  
  @override
  String toString() {
    var buffer = new StringBuffer();
    
    buffer.write("Task {");
    buffer.write("id=" + "$id" + ", ");
    buffer.write("title=" + "$_title" + ", ");
    buffer.write("text=" + "$_text" + ", ");
    buffer.write("dueDate=" + (_dueDate != null ? _dueDate!.format() : "null") + ", ");
    buffer.write("finishedDate=" + (_finishedDate != null ? _finishedDate!.format() : "null") + ", ");
    buffer.write("location=" + (_location != null ? _location!.toString() : "null") + ", ");
    buffer.write("userID=" + "$_userID" + ", ");
    buffer.write("schemeVersion=" + (_schemeVersion != null ? _schemeVersion!.toString() : "null") + ", ");
    buffer.write("picIDs=" + (_picIDs != null ? _picIDs!.toString() : "null") + ", ");
    buffer.write("audioIDs=" + (_audioIDs != null ? _audioIDs!.toString() : "null") + ", ");
    buffer.write("createdAt=" + (_createdAt != null ? _createdAt!.format() : "null") + ", ");
    buffer.write("updatedAt=" + (_updatedAt != null ? _updatedAt!.format() : "null") + ", ");
    buffer.write("taskUserId=" + "$_taskUserId" + ", ");
    buffer.write("taskEntityId=" + "$_taskEntityId" + ", ");
    buffer.write("taskAppliedInterventionId=" + "$_taskAppliedInterventionId" + ", ");
    buffer.write("taskExecutedSurveyId=" + "$_taskExecutedSurveyId");
    buffer.write("}");
    
    return buffer.toString();
  }
  
  Task copyWith({String? title, String? text, amplify_core.TemporalDateTime? dueDate, amplify_core.TemporalDateTime? finishedDate, Location? location, User? user, String? userID, Entity? entity, AppliedIntervention? appliedIntervention, ExecutedSurvey? executedSurvey, int? schemeVersion, List<int>? picIDs, List<int>? audioIDs, String? taskUserId, String? taskEntityId, String? taskAppliedInterventionId, String? taskExecutedSurveyId}) {
    return Task._internal(
      id: id,
      title: title ?? this.title,
      text: text ?? this.text,
      dueDate: dueDate ?? this.dueDate,
      finishedDate: finishedDate ?? this.finishedDate,
      location: location ?? this.location,
      user: user ?? this.user,
      userID: userID ?? this.userID,
      entity: entity ?? this.entity,
      appliedIntervention: appliedIntervention ?? this.appliedIntervention,
      executedSurvey: executedSurvey ?? this.executedSurvey,
      schemeVersion: schemeVersion ?? this.schemeVersion,
      picIDs: picIDs ?? this.picIDs,
      audioIDs: audioIDs ?? this.audioIDs,
      taskUserId: taskUserId ?? this.taskUserId,
      taskEntityId: taskEntityId ?? this.taskEntityId,
      taskAppliedInterventionId: taskAppliedInterventionId ?? this.taskAppliedInterventionId,
      taskExecutedSurveyId: taskExecutedSurveyId ?? this.taskExecutedSurveyId);
  }
  
  Task copyWithModelFieldValues({
    ModelFieldValue<String>? title,
    ModelFieldValue<String?>? text,
    ModelFieldValue<amplify_core.TemporalDateTime?>? dueDate,
    ModelFieldValue<amplify_core.TemporalDateTime?>? finishedDate,
    ModelFieldValue<Location?>? location,
    ModelFieldValue<User>? user,
    ModelFieldValue<String>? userID,
    ModelFieldValue<Entity?>? entity,
    ModelFieldValue<AppliedIntervention?>? appliedIntervention,
    ModelFieldValue<ExecutedSurvey?>? executedSurvey,
    ModelFieldValue<int?>? schemeVersion,
    ModelFieldValue<List<int>>? picIDs,
    ModelFieldValue<List<int>>? audioIDs,
    ModelFieldValue<String>? taskUserId,
    ModelFieldValue<String?>? taskEntityId,
    ModelFieldValue<String?>? taskAppliedInterventionId,
    ModelFieldValue<String?>? taskExecutedSurveyId
  }) {
    return Task._internal(
      id: id,
      title: title == null ? this.title : title.value,
      text: text == null ? this.text : text.value,
      dueDate: dueDate == null ? this.dueDate : dueDate.value,
      finishedDate: finishedDate == null ? this.finishedDate : finishedDate.value,
      location: location == null ? this.location : location.value,
      user: user == null ? this.user : user.value,
      userID: userID == null ? this.userID : userID.value,
      entity: entity == null ? this.entity : entity.value,
      appliedIntervention: appliedIntervention == null ? this.appliedIntervention : appliedIntervention.value,
      executedSurvey: executedSurvey == null ? this.executedSurvey : executedSurvey.value,
      schemeVersion: schemeVersion == null ? this.schemeVersion : schemeVersion.value,
      picIDs: picIDs == null ? this.picIDs : picIDs.value,
      audioIDs: audioIDs == null ? this.audioIDs : audioIDs.value,
      taskUserId: taskUserId == null ? this.taskUserId : taskUserId.value,
      taskEntityId: taskEntityId == null ? this.taskEntityId : taskEntityId.value,
      taskAppliedInterventionId: taskAppliedInterventionId == null ? this.taskAppliedInterventionId : taskAppliedInterventionId.value,
      taskExecutedSurveyId: taskExecutedSurveyId == null ? this.taskExecutedSurveyId : taskExecutedSurveyId.value
    );
  }
  
  Task.fromJson(Map<String, dynamic> json)  
    : id = json['id'],
      _title = json['title'],
      _text = json['text'],
      _dueDate = json['dueDate'] != null ? amplify_core.TemporalDateTime.fromString(json['dueDate']) : null,
      _finishedDate = json['finishedDate'] != null ? amplify_core.TemporalDateTime.fromString(json['finishedDate']) : null,
      _location = json['location']?['serializedData'] != null
        ? Location.fromJson(new Map<String, dynamic>.from(json['location']['serializedData']))
        : null,
      _user = json['user']?['serializedData'] != null
        ? User.fromJson(new Map<String, dynamic>.from(json['user']['serializedData']))
        : null,
      _userID = json['userID'],
      _entity = json['entity']?['serializedData'] != null
        ? Entity.fromJson(new Map<String, dynamic>.from(json['entity']['serializedData']))
        : null,
      _appliedIntervention = json['appliedIntervention']?['serializedData'] != null
        ? AppliedIntervention.fromJson(new Map<String, dynamic>.from(json['appliedIntervention']['serializedData']))
        : null,
      _executedSurvey = json['executedSurvey']?['serializedData'] != null
        ? ExecutedSurvey.fromJson(new Map<String, dynamic>.from(json['executedSurvey']['serializedData']))
        : null,
      _schemeVersion = (json['schemeVersion'] as num?)?.toInt(),
      _picIDs = (json['picIDs'] as List?)?.map((e) => (e as num).toInt()).toList(),
      _audioIDs = (json['audioIDs'] as List?)?.map((e) => (e as num).toInt()).toList(),
      _createdAt = json['createdAt'] != null ? amplify_core.TemporalDateTime.fromString(json['createdAt']) : null,
      _updatedAt = json['updatedAt'] != null ? amplify_core.TemporalDateTime.fromString(json['updatedAt']) : null,
      _taskUserId = json['taskUserId'],
      _taskEntityId = json['taskEntityId'],
      _taskAppliedInterventionId = json['taskAppliedInterventionId'],
      _taskExecutedSurveyId = json['taskExecutedSurveyId'];
  
  Map<String, dynamic> toJson() => {
    'id': id, 'title': _title, 'text': _text, 'dueDate': _dueDate?.format(), 'finishedDate': _finishedDate?.format(), 'location': _location?.toJson(), 'user': _user?.toJson(), 'userID': _userID, 'entity': _entity?.toJson(), 'appliedIntervention': _appliedIntervention?.toJson(), 'executedSurvey': _executedSurvey?.toJson(), 'schemeVersion': _schemeVersion, 'picIDs': _picIDs, 'audioIDs': _audioIDs, 'createdAt': _createdAt?.format(), 'updatedAt': _updatedAt?.format(), 'taskUserId': _taskUserId, 'taskEntityId': _taskEntityId, 'taskAppliedInterventionId': _taskAppliedInterventionId, 'taskExecutedSurveyId': _taskExecutedSurveyId
  };
  
  Map<String, Object?> toMap() => {
    'id': id,
    'title': _title,
    'text': _text,
    'dueDate': _dueDate,
    'finishedDate': _finishedDate,
    'location': _location,
    'user': _user,
    'userID': _userID,
    'entity': _entity,
    'appliedIntervention': _appliedIntervention,
    'executedSurvey': _executedSurvey,
    'schemeVersion': _schemeVersion,
    'picIDs': _picIDs,
    'audioIDs': _audioIDs,
    'createdAt': _createdAt,
    'updatedAt': _updatedAt,
    'taskUserId': _taskUserId,
    'taskEntityId': _taskEntityId,
    'taskAppliedInterventionId': _taskAppliedInterventionId,
    'taskExecutedSurveyId': _taskExecutedSurveyId
  };

  static final amplify_core.QueryModelIdentifier<TaskModelIdentifier> MODEL_IDENTIFIER = amplify_core.QueryModelIdentifier<TaskModelIdentifier>();
  static final ID = amplify_core.QueryField(fieldName: "id");
  static final TITLE = amplify_core.QueryField(fieldName: "title");
  static final TEXT = amplify_core.QueryField(fieldName: "text");
  static final DUEDATE = amplify_core.QueryField(fieldName: "dueDate");
  static final FINISHEDDATE = amplify_core.QueryField(fieldName: "finishedDate");
  static final LOCATION = amplify_core.QueryField(fieldName: "location");
  static final USER = amplify_core.QueryField(
    fieldName: "user",
    fieldType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.model, ofModelName: 'User'));
  static final USERID = amplify_core.QueryField(fieldName: "userID");
  static final ENTITY = amplify_core.QueryField(
    fieldName: "entity",
    fieldType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.model, ofModelName: 'Entity'));
  static final APPLIEDINTERVENTION = amplify_core.QueryField(
    fieldName: "appliedIntervention",
    fieldType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.model, ofModelName: 'AppliedIntervention'));
  static final EXECUTEDSURVEY = amplify_core.QueryField(
    fieldName: "executedSurvey",
    fieldType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.model, ofModelName: 'ExecutedSurvey'));
  static final SCHEMEVERSION = amplify_core.QueryField(fieldName: "schemeVersion");
  static final PICIDS = amplify_core.QueryField(fieldName: "picIDs");
  static final AUDIOIDS = amplify_core.QueryField(fieldName: "audioIDs");
  static final TASKUSERID = amplify_core.QueryField(fieldName: "taskUserId");
  static final TASKENTITYID = amplify_core.QueryField(fieldName: "taskEntityId");
  static final TASKAPPLIEDINTERVENTIONID = amplify_core.QueryField(fieldName: "taskAppliedInterventionId");
  static final TASKEXECUTEDSURVEYID = amplify_core.QueryField(fieldName: "taskExecutedSurveyId");
  static var schema = amplify_core.Model.defineSchema(define: (amplify_core.ModelSchemaDefinition modelSchemaDefinition) {
    modelSchemaDefinition.name = "Task";
    modelSchemaDefinition.pluralName = "Tasks";
    
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
    
    modelSchemaDefinition.indexes = [
      amplify_core.ModelIndex(fields: const ["userID"], name: "byUser")
    ];
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.id());
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.field(
      key: Task.TITLE,
      isRequired: true,
      ofType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.string)
    ));
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.field(
      key: Task.TEXT,
      isRequired: false,
      ofType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.string)
    ));
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.field(
      key: Task.DUEDATE,
      isRequired: false,
      ofType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.dateTime)
    ));
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.field(
      key: Task.FINISHEDDATE,
      isRequired: false,
      ofType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.dateTime)
    ));
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.embedded(
      fieldName: 'location',
      isRequired: false,
      ofType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.embedded, ofCustomTypeName: 'Location')
    ));
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.hasOne(
      key: Task.USER,
      isRequired: true,
      ofModelName: (User).toString(),
      associatedKey: User.ID
    ));
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.field(
      key: Task.USERID,
      isRequired: true,
      ofType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.string)
    ));
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.hasOne(
      key: Task.ENTITY,
      isRequired: false,
      ofModelName: (Entity).toString(),
      associatedKey: Entity.ID
    ));
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.hasOne(
      key: Task.APPLIEDINTERVENTION,
      isRequired: false,
      ofModelName: (AppliedIntervention).toString(),
      associatedKey: AppliedIntervention.ID
    ));
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.hasOne(
      key: Task.EXECUTEDSURVEY,
      isRequired: false,
      ofModelName: (ExecutedSurvey).toString(),
      associatedKey: ExecutedSurvey.ID
    ));
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.field(
      key: Task.SCHEMEVERSION,
      isRequired: false,
      ofType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.int)
    ));
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.field(
      key: Task.PICIDS,
      isRequired: true,
      isArray: true,
      ofType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.collection, ofModelName: amplify_core.ModelFieldTypeEnum.int.name)
    ));
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.field(
      key: Task.AUDIOIDS,
      isRequired: true,
      isArray: true,
      ofType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.collection, ofModelName: amplify_core.ModelFieldTypeEnum.int.name)
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
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.field(
      key: Task.TASKUSERID,
      isRequired: true,
      ofType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.string)
    ));
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.field(
      key: Task.TASKENTITYID,
      isRequired: false,
      ofType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.string)
    ));
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.field(
      key: Task.TASKAPPLIEDINTERVENTIONID,
      isRequired: false,
      ofType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.string)
    ));
    
    modelSchemaDefinition.addField(amplify_core.ModelFieldDefinition.field(
      key: Task.TASKEXECUTEDSURVEYID,
      isRequired: false,
      ofType: amplify_core.ModelFieldType(amplify_core.ModelFieldTypeEnum.string)
    ));
  });
}

class _TaskModelType extends amplify_core.ModelType<Task> {
  const _TaskModelType();
  
  @override
  Task fromJson(Map<String, dynamic> jsonData) {
    return Task.fromJson(jsonData);
  }
}

/**
 * This is an auto generated class representing the model identifier
 * of [Task] in your schema.
 */
class TaskModelIdentifier implements amplify_core.ModelIdentifier<Task> {
  final String id;

  /** Create an instance of TaskModelIdentifier using [id] the primary key. */
  const TaskModelIdentifier({
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
  String toString() => 'TaskModelIdentifier(id: $id)';
  
  @override
  bool operator ==(Object other) {
    if (identical(this, other)) {
      return true;
    }
    
    return other is TaskModelIdentifier &&
      id == other.id;
  }
  
  @override
  int get hashCode =>
    id.hashCode;
}