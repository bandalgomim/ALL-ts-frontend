import DeviceInfo from 'react-native-device-info';

export async function getDeviceVersion() {
  return {
    appVersion: DeviceInfo.getVersion(),        // e.g. "1.3.2"  (CFBundleShortVersionString / versionName)
    buildNumber: DeviceInfo.getBuildNumber(),   // e.g. "45"     (CFBundleVersion / versionCode)
    platform: DeviceInfo.getSystemName().toLowerCase(), // "ios" | "android"
    osVersion: DeviceInfo.getSystemVersion(),   // e.g. "18.0" / "14"
    readable: DeviceInfo.getReadableVersion(),  // e.g. "1.3.2(45)"
  };
}
