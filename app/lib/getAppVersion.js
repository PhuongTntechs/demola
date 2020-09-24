import DeviceInfo from 'react-native-device-info';

export default function () {
  let versionName = DeviceInfo.getVersion();
  return `Version ${versionName}`;
}
