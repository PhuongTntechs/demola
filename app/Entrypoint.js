import React, {Component} from 'react';
import Navigator from './navigation';
import {Provider} from 'react-redux';
import store from './store';
import {
  StatusBar,
  NativeModules,
  LogBox,
  AppState,
  Platform,
  Linking,
} from 'react-native';
import AppColors from './config/colors';
import SplashScreen from 'react-native-splash-screen';
import AppEnv from './config/env';
import AppModal from './components/AppModal';
import AppLang from './config/lang';
import DeviceInfo from 'react-native-device-info';

const {UIManager} = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

LogBox.ignoreAllLogs();

type Props = {};

type State = {
  update: boolean,
  updateInfo: any,
};

export default class Entrypoint extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      update: false,
      updateInfo: null,
    };
  }
  componentDidMount() {
    SplashScreen.hide();
    this._checkUpdate();
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'active') {
      this._checkUpdate();
    }
  };

  _checkUpdate = () => {
    fetch(AppEnv.UPDATE_CONFIGS.FILE_URL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: 0,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        const {androidCode, iosBuild} = json;
        let buildNumber = DeviceInfo.getBuildNumber();
        // eslint-disable-next-line radix
        if (Platform.OS === 'ios' && iosBuild > parseInt(buildNumber)) {
          this.setState({update: true, updateInfo: json});
          // eslint-disable-next-line radix
        } else if (androidCode > parseInt(buildNumber)) {
          this.setState({update: true, updateInfo: json});
        }
        console.log(json, buildNumber, androidCode > parseInt(buildNumber));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  _onUpdate = () => {
    this.setState({update: false}, () => {
      const {ipaUrl} = this.state.updateInfo;
      const url =
        Platform.OS === 'ios'
          ? `itms-services://?action=download-manifest&url=${ipaUrl}`
          : 'market://details?id=vn.tng.tngoffice';
      Linking.openURL(url).catch((e) => console.log(e));
    });
  };

  render() {
    const {description} = this.state.updateInfo ?? {};
    let message = `${AppLang.common.update.body}\n${description}`;
    return (
      <Provider store={store}>
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor={AppColors.white}
        />
        <Navigator />
        <AppModal
          visible={this.state.update}
          icon={'info'}
          showTitle
          title={AppLang.common.defaultTitleModal}
          message={message}
          showConfirmButton
          confirmButtonText={AppLang.common.update.title}
          showCancelButton={false}
          onConfirm={this._onUpdate}
        />
      </Provider>
    );
  }
}
