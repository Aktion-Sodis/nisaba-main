# Android Gradle Version Management Guide

This document outlines the version requirements and compatibility for the mobile app's Android build system.

## Current Versions (as of 2024)

### Required Minimum Versions
- **Gradle**: 8.9.0+ (currently: 8.9) - Required for AGP 8.6.0+
- **Android Gradle Plugin (AGP)**: 8.6.0+ (currently: 8.6.0) - Future-proof version
- **Kotlin**: 2.1.0+ (currently: 2.1.0) - Future-proof version

### Version Compatibility Matrix

| Flutter Version | Gradle Min | AGP Min | Kotlin Min | Notes |
|----------------|------------|---------|------------|-------|
| 3.35.5+ | 8.9.0 | 8.6.0 | 2.1.0 | Current setup (future-proof) |

## File Locations

### Gradle Wrapper Version
**File**: `android/gradle/wrapper/gradle-wrapper.properties`
```properties
distributionUrl=https\://services.gradle.org/distributions/gradle-8.9-bin.zip
```

### Android Gradle Plugin Version
**File**: `android/settings.gradle`
```groovy
plugins {
    id "com.android.application" version "8.6.0" apply false
    id "org.jetbrains.kotlin.android" version "2.1.0" apply false
}
```

**Note**: These are future-proof versions that meet Flutter's upcoming requirements:
- AGP 8.6.0+ (Flutter will soon require this minimum)
- Kotlin 2.1.0+ (Flutter will soon require this minimum)
- Gradle 8.9.0+ (Required for AGP 8.6.0 compatibility)

## How to Update Versions

### 1. Check Flutter Requirements
When updating Flutter, check the minimum requirements:
```bash
flutter --version
flutter doctor -v
```

### 2. Verify Compatibility
- **Gradle ↔ AGP**: Check [AGP compatibility](https://developer.android.com/studio/releases/gradle-plugin)
- **AGP ↔ Kotlin**: Check [Kotlin compatibility](https://kotlinlang.org/docs/gradle.html#plugin-and-versions)
- **Flutter ↔ AGP**: Check Flutter release notes for minimum AGP version

### 3. Update Process
1. Update versions in the files listed above
2. Run `flutter clean`
3. Run `flutter pub get`
4. Test build: `flutter build apk --debug`

### 4. Common Error Messages

#### "Gradle version X is lower than Flutter's minimum"
- **Fix**: Update `gradle-wrapper.properties` to required version

#### "Android Gradle Plugin version X is lower than Flutter's minimum"
- **Fix**: Update AGP version in `settings.gradle`

#### "Unresolved reference: filePermissions" (Kotlin)
- **Fix**: Update Kotlin version to 1.9.0+ (file permissions API added in 1.9.0)

#### "Could not download gradle-X.X.X.jar" (AGP version not found)
- **Fix**: The AGP version doesn't exist. Try:
  - 8.1.4 (stable patch version)
  - 8.2.0 (stable minor version)
  - Check [AGP release notes](https://developer.android.com/studio/releases/gradle-plugin) for available versions

## Sustainable Management Practices

### 1. Regular Updates
- Check for Flutter updates monthly: `flutter upgrade`
- Review dependency updates quarterly
- Test thoroughly after each update

### 2. Version Pinning Strategy
- Use specific versions (not `+` or `latest`) for stability
- Document why each version was chosen
- Update incrementally, not all at once

### 3. Testing Checklist
After updating versions:
- [ ] Clean build succeeds: `flutter clean && flutter build apk --debug`
- [ ] Debug build works: `flutter run`
- [ ] Release build works: `flutter build apk --release`
- [ ] All tests pass: `flutter test`

### 4. Monitoring
- Subscribe to Flutter release notes
- Monitor Gradle and AGP release notes
- Use `flutter pub outdated` to check dependencies

## Troubleshooting

### Build Fails After Update
1. Run `flutter clean`
2. Delete `android/.gradle` folder
3. Delete `android/build` folder
4. Run `flutter pub get`
5. Try build again

### Version Conflicts
If you see version conflicts:
1. Check all `build.gradle` files for version declarations
2. Ensure all use the same version
3. Check for transitive dependency conflicts

### Still Having Issues?
1. Check Flutter GitHub issues for known problems
2. Review Flutter release notes for breaking changes
3. Consider using `--android-skip-build-dependency-validation` flag temporarily (not recommended for production)

## References

- [Flutter Android Setup](https://docs.flutter.dev/deployment/android)
- [Gradle Compatibility Matrix](https://developer.android.com/studio/releases/gradle-plugin#updating-gradle)
- [Kotlin Gradle Plugin](https://kotlinlang.org/docs/gradle.html)
- [Flutter Release Notes](https://docs.flutter.dev/release/breaking-changes)

