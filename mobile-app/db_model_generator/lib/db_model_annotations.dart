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
