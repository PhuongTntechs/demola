import React from 'react';
import {View} from 'react-native';
import Styles from './styles';
import AppLang from '../../../config/lang';
import {AppTextInput} from '../../../components/AppInputs';
import AppButton from '../../../components/AppButton';
import validateEmail from '../../../lib/validateEmail';
import AppModal from '../../../components/AppModal';

type Props = {
  AuthReducer: any,
  submitUpdateEmail: void,
  submitVerifyEmail: void,
  resendEmailCode: void,
  showUpdateEmailError: void,
};

type State = {
  email: string,
  showVerify: true,
  code: string,
  updateSuccess: boolean,
  resendSuccess: boolean,
  verifySuccess: boolean,
};

export default class ChangeEmailView extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    const {user} = this.props.AuthReducer;
    this.state = {
      email: user.email ?? '',
      code: '',
      showVerify: user.email && user.email.length > 0 ? true : false,
      updateSuccess: false,
      resendSuccess: false,
      verifySuccess: false,
    };
  }

  _changeEmail = (email) => {
    const {user} = this.props.AuthReducer;
    if (email.trim() === user.email) {
      this.setState({email, showVerify: true});
    } else {
      this.setState({email, showVerify: false});
    }
  };

  _resendCode = () => {
    const {email} = this.state;
    if (!email || email.trim().length === 0) {
      const message = AppLang.screens.email.errors.emptyEmail;
      this.props.showUpdateEmailError(500, message);
      return;
    } else if (!validateEmail(email)) {
      const message = AppLang.screens.email.errors.invalidEmail;
      this.props.showUpdateEmailError(500, message);
      return;
    }
    this.props.resendEmailCode(email, () =>
      this.setState({resendSuccess: true}),
    );
  };

  _submit = () => {
    const {email, code, showVerify} = this.state;
    if (!email || email.trim().length === 0) {
      const message = AppLang.screens.email.errors.emptyEmail;
      this.props.showUpdateEmailError(500, message);
      return;
    } else if (!validateEmail(email)) {
      const message = AppLang.screens.email.errors.invalidEmail;
      this.props.showUpdateEmailError(500, message);
      return;
    }
    if (!showVerify) {
      //UPDATE EMAIL
      this.props.submitUpdateEmail(email, () =>
        this.setState({updateSuccess: true, showVerify: true}),
      );
    } else {
      //VERIFY EMAIL
      if (code.length !== 6) {
        const message = AppLang.screens.email.errors.invalidCode;
        this.props.showUpdateEmailError(500, message);
        return;
      }
      this.props.submitVerifyEmail(email, code, () =>
        this.setState({verifySuccess: true}),
      );
    }
  };

  _onSubmitSuccess = () => {
    this.setState({verifySuccess: false}, () => this.props.navigation.goBack());
  };

  render() {
    const buttonText = !this.state.showVerify
      ? AppLang.screens.email.buttons.update
      : AppLang.screens.email.buttons.verify;
    return (
      <View style={Styles.content}>
        <View style={Styles.flex}>
          <AppTextInput
            style={Styles.inputBloc}
            label={'EMAIL'}
            inputProps={{
              placeholder: AppLang.screens.email.email,
              keyboardType: 'email-address',
              autoCapitalize: 'none',
              returnKeyType: 'next',
              value: this.state.email,
              onChangeText: (email) => this._changeEmail(email),
              onSubmitEditing: () => console.log('onSubmitEditing'),
            }}
          />
          {this.state.showVerify ? (
            <AppTextInput
              style={Styles.inputBloc}
              label={AppLang.screens.email.code.toUpperCase()}
              inputProps={{
                placeholder: AppLang.screens.email.code,
                returnKeyType: 'next',
                value: this.state.code,
                onChangeText: (code) => this.setState({code}),
                onSubmitEditing: () => console.log('onSubmitEditing'),
              }}
            />
          ) : null}
        </View>
        {this.state.showVerify ? (
          <AppButton
            label={AppLang.screens.email.buttons.resend}
            colorSet={'trans'}
            style={Styles.buttonResend}
            onPress={this._resendCode}
          />
        ) : null}
        <AppButton label={buttonText} onPress={this._submit} />
        <AppModal
          visible={this.state.updateSuccess}
          icon={'success'}
          showTitle={false}
          message={AppLang.screens.email.messages.updated}
          showConfirmButton
          showCancelButton={false}
          onConfirm={() => this.setState({updateSuccess: false})}
        />
        <AppModal
          visible={this.state.resendSuccess}
          icon={'success'}
          showTitle={false}
          message={AppLang.screens.email.messages.resent}
          showConfirmButton
          showCancelButton={false}
          onConfirm={() => this.setState({resendSuccess: false})}
        />
        <AppModal
          visible={this.state.verifySuccess}
          icon={'success'}
          showTitle={false}
          message={AppLang.screens.email.messages.verified}
          showConfirmButton
          showCancelButton={false}
          onConfirm={this._onSubmitSuccess}
        />
      </View>
    );
  }
}
