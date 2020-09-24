import React from 'react';
import {
  Image,
  Keyboard,
  Text,
  View,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import Styles from './styles';
import AppImages from '../../../config/imges';
import {AppPasswordInput, AppTextInput} from '../../../components/AppInputs';
import AppLang from '../../../config/lang';
import AppButton from '../../../components/AppButton';
import getAppVersion from '../../../lib/getAppVersion';
import * as RootNavigation from '../../../navigation/RootNavigation';

type Props = {
  showLoginError: void,
  submitLogin: void,
};

type State = {
  username: string,
  password: string,
};

export default class AuthLoginView extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  _submitLogin = () => {
    Keyboard.dismiss();
    const {username, password} = this.state;
    if (username.trim().length === 0 || password.length === 0) {
      const message = AppLang.common.errors.allFieldsRequired;
      this.props.showLoginError(500, message);
      return;
    }
    this.props.submitLogin(username, password);
  };

  _forgotPassword = () => {
    const {username} = this.state;
    RootNavigation.navigate('AuthForgot', {username});
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={Styles.container}>
          <KeyboardAvoidingView
            style={Styles.container}
            keyboardShouldPersistTaps="handled"
            //enableOnAndroid={false}
            enableOnAndroid={true}
            enableAutomaticScroll={Platform.OS === 'ios'}
            bounces={false}>
            <View style={Styles.content}>
              <View style={Styles.logoBloc}>
                <Image
                  source={AppImages.appLogo}
                  style={Styles.appLogo}
                  resizeMode={'contain'}
                />
              </View>
              <Text style={Styles.pageTitle}>
                {AppLang.screens.auth.loginTitle}
              </Text>
              <AppTextInput
                style={Styles.inputBloc}
                inputProps={{
                  placeholder: AppLang.screens.auth.mans,
                  returnKeyType: 'next',
                  value: this.state.username,
                  onChangeText: (username) => this.setState({username}),
                  onSubmitEditing: () => this._passInput.focus(),
                }}
              />
              <AppPasswordInput
                style={Styles.inputBloc}
                inputProps={{
                  ref: (comp) => (this._passInput = comp),
                  placeholder: AppLang.screens.auth.password,
                  returnKeyType: 'done',
                  value: this.state.password,
                  onChangeText: (password) => this.setState({password}),
                  onSubmitEditing: () => this._submitLogin(),
                }}
              />
              <AppButton
                label={AppLang.screens.auth.buttons.login}
                onPress={this._submitLogin}
              />
              <AppButton
                label={AppLang.screens.auth.buttons.forgotPassword}
                colorSet={'trans'}
                onPress={this._forgotPassword}
              />
            </View>
          </KeyboardAvoidingView>
          <View style={Styles.versionBloc}>
            <Text style={Styles.versionText}>{getAppVersion()}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
