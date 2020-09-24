import React from 'react';
import {Keyboard, TouchableWithoutFeedback, View} from 'react-native';
import Styles from './styles';
import AppLang from '../../../config/lang';
import {AppPasswordInput} from '../../../components/AppInputs';
import AppButton from '../../../components/AppButton';
import AppModal from '../../../components/AppModal';

type Props = {
  showUpdatePasswordError: void,
  submitUpdatePassword: void,
};

type State = {
  password: string,
  confirmPassword: string,
  updateSuccess: boolean,
};

export default class ChangePasswordView extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirmPassword: '',
      updateSuccess: false,
    };
  }

  _submit = () => {
    const {password, confirmPassword} = this.state;
    if (password.length === 0 || confirmPassword.length === 0) {
      const errorMessage = AppLang.common.errors.allFieldsRequired;
      this.props.showUpdatePasswordError('USER_00', errorMessage);
      return;
    }
    if (password.length < 6) {
      const errorMessage = AppLang.screens.profile.errors.shortPassword;
      this.props.showUpdatePasswordError('USER_00', errorMessage);
      return;
    }
    if (password !== confirmPassword) {
      const errorMessage = AppLang.screens.profile.errors.passwordNotMatch;
      this.props.showUpdatePasswordError('USER_00', errorMessage);
      return;
    }
    this.props.submitUpdatePassword(password, () =>
      this.setState({updateSuccess: true}),
    );
  };

  _onSubmitSuccess = () => {
    this.setState({updateSuccess: false}, () => this.props.navigation.goBack());
  };

  render() {
    const buttonText = AppLang.common.buttonUpdate;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={Styles.content}>
          <View style={Styles.flex}>
            <AppPasswordInput
              style={Styles.inputBloc}
              inputProps={{
                ref: (comp) => (this._passInput = comp),
                placeholder: AppLang.screens.profile.newPassword,
                returnKeyType: 'next',
                value: this.state.password,
                onChangeText: (password) => this.setState({password}),
                onSubmitEditing: () => this._rePassInput.focus(),
              }}
            />
            <AppPasswordInput
              style={Styles.inputBloc}
              inputProps={{
                ref: (comp) => (this._rePassInput = comp),
                placeholder: AppLang.screens.profile.confirmPassword,
                returnKeyType: 'done',
                value: this.state.confirmPassword,
                onChangeText: (confirmPassword) =>
                  this.setState({confirmPassword}),
                onSubmitEditing: () => this._submit(),
              }}
            />
          </View>
          <AppButton label={buttonText} onPress={this._submit} />
          <AppModal
            visible={this.state.updateSuccess}
            icon={'success'}
            showTitle={false}
            message={AppLang.screens.profile.messages.updatePasswordSuccess}
            showConfirmButton
            showCancelButton={false}
            onConfirm={this._onSubmitSuccess}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
