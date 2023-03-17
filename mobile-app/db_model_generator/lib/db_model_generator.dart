import 'dart:convert';
import 'package:db_model_generator/db_model_annotations.dart';
import 'package:source_gen/source_gen.dart';
import 'package:build/build.dart';
import 'package:analyzer/dart/element/element.dart';
import 'package:analyzer/dart/element/type.dart';

PartBuilder dbModelLibraryBuilder(BuilderOptions options) {
  return PartBuilder([DBModelGenerator()], ".db_model.dart");

  /*return LibraryBuilder(
    DBModelGenerator(),
    generatedExtension: ".db_model.dart",
  );*/
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
      throw Exception(
          "Method _getSubtypeFlag should be applied to a class with annotation DBModelAnnotation. Class: ${classElement.name}");
    }

    bool subtype =
        annotation.computeConstantValue()!.getField("subtype")!.toBoolValue()!;

    return subtype;
  }

  ElementAnnotation? _getDBModelAnnotation(ClassElement classElement) {
    if (classElement.metadata.isEmpty) {
      return null;
    }
    List<ElementAnnotation> annotationList =
        classElement.metadata.where((element) {
      Element? elementElement = element.element;

      if (elementElement != null && elementElement is ConstructorElement) {
        if (elementElement.returnType.toString() == "DBModelAnnotation") {
          return true;
        }
      }
      return false;
    }).toList();

    if (annotationList.isEmpty) {
      return null;
    }

    return annotationList.first;
  }

  ElementAnnotation? _getAnnotation(
      FieldElement fieldElement, String annotationName) {
    if (fieldElement.metadata.isEmpty) {
      return null;
    }

    try {
      ElementAnnotation? annotation =
          fieldElement.metadata.firstWhere((element) {
        Element? elementElement = element.element;

        if (elementElement != null && elementElement is ConstructorElement) {
          if (elementElement.returnType.toString() == annotationName) {
            return true;
          }
        }
        return false;
      }, orElse: () => throw Exception("Annotation not found"));

      return annotation;
    } catch (e) {
      return null;
    }
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

  bool _isSimpleType(DartType type) {
    // Get the class name of the field as a string
    String? className = type.element?.name;
    if (className == "DateTime") {
      return true;
    }

    return type.isDartCoreBool ||
        type.isDartCoreDouble ||
        type.isDartCoreInt ||
        type.isDartCoreString ||
        //element.type.isDartCoreList ||
        type.isDartCoreMap ||
        type.isDartCoreEnum;
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

    var classType = _getClassType(classElement);
    if (classType == _ClassType.TYPE) {
      map["id"] = null;
    }

    return map;
  }

  Map<String, dynamic>? _translateList(DartType type) {
    var genericTypes = getGenericTypes(type);
    if (genericTypes.length != 1) {
      throw Exception("List must have one generic type");
    }

    var genericType = genericTypes.first;
    if (_isSimpleType(genericType)) {
      return null;
    }

    var genericClassElement = genericType.element as ClassElement;
    if (_getSubtypeFlag(genericClassElement)) {
      return _translateClassElement(genericClassElement);
    } else {
      return {"items": _translateClassElement(genericClassElement)};
    }
  }

  MapEntry<String, dynamic>? _translateFieldElement(FieldElement value) {
    var annotation = _getAnnotation(value, "DBModelIgnore");
    if (annotation != null) {
      return null;
    }

    // Enum value
    if (value.type.element is EnumElement) {
      return MapEntry(_getName(value), null);
    }

    // Classes
    var classElement = value.type.element as ClassElement;
    if ((value.getter != null && !value.getter!.isSynthetic) ||
        (value.setter != null && !value.setter!.isSynthetic) ||
        value.isStatic) {
      return null;
    } else if (_isSimpleType(value.type)) {
      return MapEntry(_getName(value), null);
      //} else if (_getClassType(classElement) == _ClassType.TYPE) {
      //  return MapEntry(_getName(value), null);
      //} else if (_getClassType(classElement) == _ClassType.SUBTYPE) {
    } else if (_getClassType(classElement) == _ClassType.TYPE ||
        _getClassType(classElement) == _ClassType.SUBTYPE) {
      return MapEntry(_getName(value), _translateClassElement(classElement));
    } else if (value.type.isDartCoreList) {
      return MapEntry(_getName(value), _translateList(value.type));
    } else {
      print(value.type.getDisplayString(withNullability: true));

      throw Exception("Unknown type");
    }
  }

  Iterable<DartType> getGenericTypes(DartType type) {
    return type is ParameterizedType ? type.typeArguments : const [];
  }
}

enum _ClassType { TYPE, SUBTYPE, NONE }
