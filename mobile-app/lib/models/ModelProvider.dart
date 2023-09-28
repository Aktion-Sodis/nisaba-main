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

import 'package:amplify_core/amplify_core.dart' as amplify_core;
import 'AppliedIntervention.dart';
import 'Config.dart';
import 'Content.dart';
import 'ContentContentTagRelation.dart';
import 'ContentTag.dart';
import 'Entity.dart';
import 'ExecutedSurvey.dart';
import 'Intervention.dart';
import 'InterventionContentRelation.dart';
import 'InterventionInterventionTagRelation.dart';
import 'InterventionTag.dart';
import 'Level.dart';
import 'LevelInterventionRelation.dart';
import 'Organization.dart';
import 'SessionData.dart';
import 'Survey.dart';
import 'SurveySurveyTagRelation.dart';
import 'SurveyTag.dart';
import 'Task.dart';
import 'TestObject.dart';
import 'User.dart';
import 'AppliedCustomData.dart';
import 'ColorTheme.dart';
import 'CustomData.dart';
import 'I18nString.dart';
import 'Location.dart';
import 'Marking.dart';
import 'Permission.dart';
import 'Question.dart';
import 'QuestionAnswer.dart';
import 'QuestionOption.dart';

export 'AppliedCustomData.dart';
export 'AppliedIntervention.dart';
export 'ColorTheme.dart';
export 'Config.dart';
export 'Content.dart';
export 'ContentContentTagRelation.dart';
export 'ContentTag.dart';
export 'CustomData.dart';
export 'Entity.dart';
export 'ExecutedSurvey.dart';
export 'I18nString.dart';
export 'Intervention.dart';
export 'InterventionContentRelation.dart';
export 'InterventionInterventionTagRelation.dart';
export 'InterventionTag.dart';
export 'InterventionType.dart';
export 'Level.dart';
export 'LevelInterventionRelation.dart';
export 'Location.dart';
export 'Marking.dart';
export 'Organization.dart';
export 'Permission.dart';
export 'PermissionType.dart';
export 'Question.dart';
export 'QuestionAnswer.dart';
export 'QuestionOption.dart';
export 'QuestionType.dart';
export 'SessionData.dart';
export 'Survey.dart';
export 'SurveySurveyTagRelation.dart';
export 'SurveyTag.dart';
export 'SurveyType.dart';
export 'Task.dart';
export 'TestObject.dart';
export 'Type.dart';
export 'User.dart';

class ModelProvider implements amplify_core.ModelProviderInterface {
  @override
  String version = "3cb0d27e7c97a6e190622e12087e3b5e";
  @override
  List<amplify_core.ModelSchema> modelSchemas = [AppliedIntervention.schema, Config.schema, Content.schema, ContentContentTagRelation.schema, ContentTag.schema, Entity.schema, ExecutedSurvey.schema, Intervention.schema, InterventionContentRelation.schema, InterventionInterventionTagRelation.schema, InterventionTag.schema, Level.schema, LevelInterventionRelation.schema, Organization.schema, SessionData.schema, Survey.schema, SurveySurveyTagRelation.schema, SurveyTag.schema, Task.schema, TestObject.schema, User.schema];
  @override
  List<amplify_core.ModelSchema> customTypeSchemas = [AppliedCustomData.schema, ColorTheme.schema, CustomData.schema, I18nString.schema, Location.schema, Marking.schema, Permission.schema, Question.schema, QuestionAnswer.schema, QuestionOption.schema];
  static final ModelProvider _instance = ModelProvider();

  static ModelProvider get instance => _instance;
  
  amplify_core.ModelType getModelTypeByModelName(String modelName) {
    switch(modelName) {
      case "AppliedIntervention":
        return AppliedIntervention.classType;
      case "Config":
        return Config.classType;
      case "Content":
        return Content.classType;
      case "ContentContentTagRelation":
        return ContentContentTagRelation.classType;
      case "ContentTag":
        return ContentTag.classType;
      case "Entity":
        return Entity.classType;
      case "ExecutedSurvey":
        return ExecutedSurvey.classType;
      case "Intervention":
        return Intervention.classType;
      case "InterventionContentRelation":
        return InterventionContentRelation.classType;
      case "InterventionInterventionTagRelation":
        return InterventionInterventionTagRelation.classType;
      case "InterventionTag":
        return InterventionTag.classType;
      case "Level":
        return Level.classType;
      case "LevelInterventionRelation":
        return LevelInterventionRelation.classType;
      case "Organization":
        return Organization.classType;
      case "SessionData":
        return SessionData.classType;
      case "Survey":
        return Survey.classType;
      case "SurveySurveyTagRelation":
        return SurveySurveyTagRelation.classType;
      case "SurveyTag":
        return SurveyTag.classType;
      case "Task":
        return Task.classType;
      case "TestObject":
        return TestObject.classType;
      case "User":
        return User.classType;
      default:
        throw Exception("Failed to find model in model provider for model name: " + modelName);
    }
  }
}


class ModelFieldValue<T> {
  const ModelFieldValue.value(this.value);

  final T value;
}
