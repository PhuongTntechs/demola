import {Platform} from 'react-native';
import parseError from '../../../lib/parseError';
import api from '../../../api';
import {getAppstoreAppMetadata} from 'react-native-appstore-version-checker';
import DeviceInfo from 'react-native-device-info';

export function* checkUpdate({payload}) {
  try {
    const {onSuccess} = payload;
    if (Platform.OS === 'ios') {
      const url =
        'https://raw.githubusercontent.com/harrybui2804/tngapp/master/tngoffice.json';
      const res = yield api(url, 'get');
      const {iosBuild} = res.data;
      const buildNumber = DeviceInfo.getBuildNumber();
      // eslint-disable-next-line radix
      if (parseInt(buildNumber) < parseInt(iosBuild)) {
        onSuccess(true);
      } else {
        onSuccess(false);
      }
    } else {
      let versionName = DeviceInfo.getVersion();
      const {version} = yield getAppstoreAppMetadata('vn.tng.tngoffice');
      if (version !== versionName) {
        onSuccess(true);
      } else {
        onSuccess(false);
      }
    }
  } catch (e) {
    const {code, message} = parseError(e);
    console.log(code, message);
  }
}
