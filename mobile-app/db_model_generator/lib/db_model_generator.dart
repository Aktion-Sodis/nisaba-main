import 'dart:convert';
import 'package:source_gen/source_gen.dart';
import 'package:build/build.dart';
import 'package:analyzer/dart/element/element.dart';
import 'package:analyzer/dart/element/type.dart';

import 'db_model_annotations.dart';

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
      throw Exception("Annotation must be applied to a class");
    }

    bool subtype =
        annotation.computeConstantValue()!.getField("subtype")!.toBoolValue()!;

    return subtype;
  }

  ElementAnnotation? _getDBModelAnnotation(ClassElement classElement) {
    if (classElement.metadata.isEmpty) {
      return null;
    }
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
    print("getClassType");
    var annotation = _getDBModelAnnotation(classElement);
    print("getClassType: 1");
    if (annotation == null) {
      print("getClassType: 2");
      return _ClassType.NONE;
    } else {
      print("getClassType: 3");
      bool subtype = _getSubtypeFlag(classElement);
      print("getClassType: 4");

      if (subtype) {
        return _ClassType.SUBTYPE;
      } else {
        return _ClassType.TYPE;
      }
    }
  }

  bool _isSimpleType(DartType type) {
    print("isSimpleType");
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
    print("getName");
    return element.name;
  }

  Map<String, dynamic> _translateClassElement(ClassElement classElement) {
    print("translateClassElement");
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

  Map<String, dynamic>? _translateList(DartType type) {
    print("translateList");
    var genericTypes = getGenericTypes(type);
    if (genericTypes.length != 1) {
      throw Exception("List must have one generic type");
    }

    var genericType = genericTypes.first;
    if (_isSimpleType(genericType)) {
      return null;
    }

    var genericClassElement = genericType.element as ClassElement;
    return {"items": _translateClassElement(genericClassElement)};
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
      print("1++++++++++");
      return MapEntry(_getName(value), null);
    } else if (_getClassType(classElement) == _ClassType.TYPE) {
      print("2++++++++++");
      return MapEntry(_getName(value), null);
    } else if (_getClassType(classElement) == _ClassType.SUBTYPE) {
      print("3++++++++++");
      return MapEntry(_getName(value), _translateClassElement(classElement));
    } else if (value.type.isDartCoreList) {
      return MapEntry(_getName(value), _translateList(value.type));
    } else {
      print(value.type.getDisplayString(withNullability: true));

      throw Exception("Unknown type");
    }
  }

  Iterable<DartType> getGenericTypes(DartType type) {
    print("getGenericTypes");
    return type is ParameterizedType ? type.typeArguments : const [];
  }
}

enum _ClassType { TYPE, SUBTYPE, NONE }
