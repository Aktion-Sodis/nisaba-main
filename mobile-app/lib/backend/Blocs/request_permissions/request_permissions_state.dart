part of 'request_permissions_cubit.dart';

@immutable
abstract class RequestPermissionsState {
  final List<RequiredPermission> acceptedPermissions;
  final List<RequiredPermission> restrictedPermissions;

  const RequestPermissionsState({
    required this.acceptedPermissions,
    required this.restrictedPermissions,
  });
}

class RequestingPermissions extends RequestPermissionsState {
  const RequestingPermissions(
      {super.acceptedPermissions = const [],
      super.restrictedPermissions = const []});
}

class RequestingPermissionsWithDialog extends RequestingPermissions {
  const RequestingPermissionsWithDialog(
      {super.acceptedPermissions,
      super.restrictedPermissions});
}

class RequestedPermissionsAccepted extends RequestPermissionsState {
  const RequestedPermissionsAccepted(
      {super.acceptedPermissions = const [],
      super.restrictedPermissions = const []});
}
