import React from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Styles from './styles';
import AppImages from '../../../config/imges';
import {AppPasswordInput, AppTextInput} from '../../../components/AppInputs';
import AppLang from '../../../config/lang';
import AppButton from '../../../components/AppButton';
import getAppVersion from '../../../lib/getAppVersion';
import IonIcons from 'react-native-vector-icons/Ionicons';
import AppColors from '../../../config/colors';
//import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import pixel from '../../../lib/pixel';
import {wdp} from '../../../lib/responsive';
import AppValues from '../../../config/values';
import AppModal from '../../../components/AppModal';

type Props = {
  navigation: any,
  route: any,
  showResetError: void,
  resendResetCode: void,
  submitResetPassword: void,
  requestingResetStart: void,
  requestingResetStop: void,
  submitLogin: void,
};

type State = {
  code: string,
  password: string,
  confirmPassword: string,
  resendSuccess: boolean,
  resetSuccess: boolean,
};

class AuthResetPasswordView extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      password: '',
      confirmPassword: '',
      resendSuccess: false,
      resetSuccess: false,
    };
  }

  _resendCode = () => {
    Keyboard.dismiss();
    const {username} = this.props.route.params;
    this.props.resendResetCode(username, () => {
      this.setState({resendSuccess: true});
    });
  };

  _submit = () => {
    Keyboard.dismiss();
    const {username} = this.props.route.params;
    const {code, password, confirmPassword} = this.state;
    if (
      code.trim().length === 0 ||
      password.length === 0 ||
      confirmPassword.length === 0
    ) {
      const message = AppLang.common.errors.allFieldsRequired;
      this.props.showResetError(500, message);
      return;
    }
    if (code.trim().length !== 6) {
      const message = AppLang.screens.auth.errors.invalidCode;
      this.props.showResetError(500, message);
      return;
    }
    if (password.length < 6) {
      const message = AppLang.screens.auth.errors.shortPassword;
      this.props.showResetError(500, message);
      return;
    }
    if (password !== confirmPassword) {
      const message = AppLang.screens.auth.errors.passwordNotMatch;
      this.props.showResetError(500, message);
      return;
    }
    this.props.submitResetPassword(username, code, password, () =>
      this.setState({resetSuccess: true}),
    );
  };

  _confirmSuccess = () => {
    const {username} = this.props.route.params;
    const {password} = this.state;
    this.setState({resetSuccess: false}, () => {
      this.props.requestingResetStart();
      this.props.submitLogin(
        username,
        password,
        () => this.props.requestingResetStop(),
        (code, message) => this.props.showResetError(code, message),
      );
    });
  };

  _goBack = () => {
    Keyboard.dismiss();
    this.props.navigation.goBack();
  };

  _callCellSize = () => {
    const screenWidth = wdp(100);
    const padding = AppValues.padding;
    const cellNumber = 6;
    const cellSpace = pixel(18);
    return (
      (screenWidth - padding * 2 - cellSpace * (cellNumber - 1)) / cellNumber
    );
  };

  _checkCode = () => {
    Keyboard.dismiss();
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
              <View style={Styles.pageTitleBloc}>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={this._goBack}
                  style={Styles.buttonBack}>
                  <IonIcons
                    name={'ios-chevron-back'}
                    size={30}
                    color={AppColors.primary}
                  />
                </TouchableOpacity>
                <Text style={Styles.pageTitleTextWithBloc}>
                  {AppLang.screens.auth.resetTitle}
                </Text>
                <View style={Styles.buttonBack} />
              </View>
              {/*
            <SmoothPinCodeInput
              codeLength={6}
              containerStyle={Styles.pinContainer}
              cellStyle={Styles.pinCellStyle}
              cellStyleFocused={Styles.pinCellFocusedStyle}
              cellStyleFilled={Styles.pinCellFocusedStyle}
              cellSize={this._callCellSize()}
              cellSpacing={pixel(18)}
              textStyle={Styles.pinTextStyle}
              ref={this.pinInput}
              value={this.state.code}
              onTextChange={(code) => this.setState({code})}
              onFulfill={this._checkCode}
              returnKeyType="done"
            />
            */}
              <AppTextInput
                style={Styles.inputBloc}
                inputProps={{
                  placeholder: AppLang.screens.auth.confirmCode,
                  keyboardType: 'numeric',
                  returnKeyType: 'next',
                  value: this.state.code,
                  onChangeText: (code) => this.setState({code}),
                  onSubmitEditing: () => this._passInput.focus(),
                }}
              />
              <AppPasswordInput
                style={Styles.inputBloc}
                inputProps={{
                  ref: (comp) => (this._passInput = comp),
                  placeholder: AppLang.screens.auth.password,
                  returnKeyType: 'next',
                  value: this.state.password,
                  onChangeText: (password) => this.setState({password}),
                  onSubmitEditing: () => this._confirmInput.focus(),
                }}
              />
              <AppPasswordInput
                style={Styles.inputBloc}
                inputProps={{
                  ref: (comp) => (this._confirmInput = comp),
                  placeholder: AppLang.screens.auth.confirmPassword,
                  returnKeyType: 'done',
                  value: this.state.confirmPassword,
                  onChangeText: (confirmPassword) =>
                    this.setState({confirmPassword}),
                  onSubmitEditing: () => this._submit(),
                }}
              />
              <AppButton
                label={AppLang.screens.auth.buttons.resend}
                colorSet={'trans'}
                onPress={this._resendCode}
              />
              <AppButton
                label={AppLang.screens.auth.buttons.accept}
                onPress={this._submit}
              />
              <View style={Styles.resetNoteBloc}>
                <Text style={Styles.resetNoteText}>
                  {AppLang.screens.auth.resetNote}
                </Text>
              </View>
            </View>
          </KeyboardAvoidingView>
          <View style={Styles.versionBloc}>
            <Text style={Styles.versionText}>{getAppVersion()}</Text>
          </View>
          <AppModal
            visible={this.state.resendSuccess}
            icon={'error'}
            showTitle={false}
            message={AppLang.screens.auth.messages.resent}
            showConfirmButton
            showCancelButton={false}
            onConfirm={() => this.setState({resendSuccess: false})}
          />
          <AppModal
            visible={this.state.resetSuccess}
            icon={'error'}
            showTitle={false}
            message={AppLang.screens.auth.messages.resetSuccess}
            showConfirmButton
            showCancelButton={false}
            onConfirm={this._confirmSuccess}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default AuthResetPasswordView;
