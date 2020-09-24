import * as UpdateAPK from 'rn-update-apk';
import AppEnv from '../config/env';

let instance = null;

class AppUpdate {
  constructor() {
    this._updater = null;
  }

  initUpdate(downloadApkStart, downloadApkProgress, downloadApkEnd, onError) {
    this._updater = new UpdateAPK.UpdateAPK({
      apkVersionUrl: AppEnv.UPDATE_CONFIGS.FILE_URL,
      apkVersionOptions: {
        method: 'GET',
        headers: {},
      },
      apkOptions: {
        headers: {},
      },
      fileProviderAuthority: AppEnv.UPDATE_CONFIGS.PROVIDER,
      needUpdateApp: (needUpdateApp) => needUpdateApp(),
      downloadApkStart,
      downloadApkProgress,
      downloadApkEnd,
      onError,
    });
  }

  patchSSLProvider() {
    UpdateAPK.patchSSLProvider()
      .then(() => {
        // This means
        console.log('SSL Provider Patch proceeded without error');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  checkUpdate() {
    if (this._updater) {
      this._updater.checkUpdate();
    }
  }

  static getInstance() {
    if (instance === null) {
      instance = new AppUpdate();
    }
    return instance;
  }
}

export default AppUpdate;
