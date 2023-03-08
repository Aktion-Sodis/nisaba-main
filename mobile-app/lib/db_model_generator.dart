import 'dart:convert';

import 'package:build/src/builder/build_step.dart';
import 'package:analyzer/dart/element/element.dart';
import 'package:source_gen/source_gen.dart';
import 'package:build/build.dart';
import 'package:source_gen/source_gen.dart';
import 'package:analyzer/dart/constant/value.dart';

/// Annotation to mark a class as a DBModel, and to generate the
/// corresponding DBModel.queryFields() method.
class DBModelAnnotation {
  final bool subtype;
  const DBModelAnnotation([this.subtype = false]);
}

/// Annotation to mark a field as ignored by the DBModelGenerator.
class DBModelIgnore {
  const DBModelIgnore();
}

class DBModelGenerator extends GeneratorForAnnotation<DBModelAnnotation> {
  @override
  generateForAnnotatedElement(
      Element element, ConstantReader annotation, BuildStep buildStep) {
    if (element is! ClassElement) {
      throw Exception("Annotation must be applied to a class");
    }

    final classElement = element as ClassElement;

    String name = classElement.name;

    Map<String, dynamic> map = _translateClassElement(classElement);
    String stringMap = jsonEncode(map);

    return "Map<String, dynamic> _\$$name = $stringMap;";
  }

  bool _getSubtypeFlag(ClassElement classElement) {
    var annotation = _getDBModelAnnotation(classElement);

    if (annotation == null) {
      throw Exception("Annotation must be applied to a class");
    }

    bool subtype =
        annotation.computeConstantValue()!.getField("subtype")!.toBoolValue()!;

    return subtype;
  }

  ElementAnnotation? _getDBModelAnnotation(ClassElement classElement) {
    ElementAnnotation? annotation = classElement.metadata.firstWhere((element) {
      Element? elementElement = element.element;

      if (elementElement != null && elementElement is ConstructorElement) {
        if (elementElement.returnType.toString() == "DBModelAnnotation") {
          return true;
        }
      }
      return false;
    });

    return annotation;
  }

  ElementAnnotation? _getAnnotation(
      FieldElement fieldElement, String annotationName) {
    if (fieldElement.metadata.isEmpty) {
      return null;
    }

    ElementAnnotation annotation = fieldElement.metadata.firstWhere((element) {
      Element? elementElement = element.element;

      if (elementElement != null && elementElement is ConstructorElement) {
        if (elementElement.returnType.toString() == annotationName) {
          return true;
        }
      }
      return false;
    });

    return annotation;
  }

  /// It is NONE, if the type does not have annotation DBModelAnnotation.
  /// It is TYPE, if the type has annotation DBModelAnnotation and subtype is false.
  /// It is SUBTYPE, if the type has annotation DBModelAnnotation and subtype is true.
  _ClassType _getClassType(ClassElement classElement) {
    // Check if the class has annotation DBModelAnnotation
    var annotation = _getDBModelAnnotation(classElement);

    if (annotation == null) {
      return _ClassType.NONE;
    } else {
      bool subtype = _getSubtypeFlag(classElement);

      if (subtype) {
        return _ClassType.SUBTYPE;
      } else {
        return _ClassType.TYPE;
      }
    }
  }

  bool _isSimpleType(FieldElement element) {
    // Get the class name of the field as a string
    String? className = element.type.element?.name;
    if (className == "DateTime") {
      return true;
    }

    return element.type.isDartCoreBool ||
        element.type.isDartCoreDouble ||
        element.type.isDartCoreInt ||
        element.type.isDartCoreString ||
        //element.type.isDartCoreList ||
        element.type.isDartCoreMap ||
        element.type.isDartCoreEnum;
    // TODO: rest of types
  }

  String _getName(FieldElement element) {
    return element.name;
  }

  Map<String, dynamic> _translateClassElement(ClassElement classElement) {
    var fields = classElement.fields;
    Map<String, dynamic> map = {};
    fields
        .map((e) => _translateFieldElement(e))
        .where((element) => element != null)
        .forEach((element) {
      map[element!.key] = element.value;
    });

    return map;
  }

  MapEntry<String, dynamic>? _translateFieldElement(FieldElement value) {
    var classElement = value.type.element as ClassElement;

    if (_getAnnotation(value, "DBModelIgnore") != null) {
      return null;
    } else if (_isSimpleType(value)) {
      return MapEntry(_getName(value), null);
    } else if (_getClassType(classElement) == _ClassType.TYPE) {
      return MapEntry(_getName(value), null);
    } else if (_getClassType(classElement) == _ClassType.SUBTYPE) {
      return MapEntry(_getName(value), _translateClassElement(classElement));
    } else if (value.type.isDartCoreList) {
      // Get generic type of value.type
      throw UnimplementedError("Translation of list is not implemented yet");
    } else {
      throw Exception("Unknown type");
    }
  }
}

enum _ClassType { TYPE, SUBTYPE, NONE }

LibraryBuilder dbModelLibraryBuilder(BuilderOptions options) {
  return LibraryBuilder(
    DBModelGenerator(),
    generatedExtension: ".db_model.dart",
  );
}
