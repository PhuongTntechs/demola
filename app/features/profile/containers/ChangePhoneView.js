import React from 'react';
import {Keyboard, TouchableWithoutFeedback, View} from 'react-native';
import Styles from './styles';
import AppLang from '../../../config/lang';
import {AppTextInput} from '../../../components/AppInputs';
import AppButton from '../../../components/AppButton';
import AppModal from '../../../components/AppModal';

type Props = {
  AuthReducer: any,
  showUpdatePhoneError: void,
  submitUpdatePhone: void,
};

type State = {
  phone: string,
  updateSuccess: boolean,
};

export default class ChangePhoneView extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    const {user} = this.props.AuthReducer;
    this.state = {
      phone: user.phoneNumber ?? '',
      updateSuccess: false,
    };
  }

  _changePhone = (phone) => {
    this.setState({phone});
  };

  _submit = () => {
    const {phone} = this.state;
    let phoneNumber = phone ? phone.trim() : phone;
    if (!phoneNumber || phoneNumber.length === 0) {
      const message = AppLang.screens.profile.errors.emptyPhone;
      this.props.showUpdatePhoneError(500, message);
      return;
    } else if (
      (phoneNumber.indexOf(0).toString() === '0' &&
        phoneNumber.length !== 10) ||
      (phoneNumber.indexOf(0).toString() !== '0' && phoneNumber.length !== 9)
    ) {
      const message = AppLang.screens.profile.errors.invalidPhone;
      this.props.showUpdatePhoneError(500, message);
      return;
    }
    this.props.submitUpdatePhone(phoneNumber, () =>
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
            <AppTextInput
              style={Styles.inputBloc}
              label={AppLang.screens.profile.phoneNumber.toUpperCase()}
              inputProps={{
                placeholder: AppLang.screens.profile.phoneNumber,
                keyboardType: 'phone-pad',
                autoCapitalize: 'none',
                returnKeyType: 'done',
                value: this.state.phone,
                onChangeText: (phone) => this._changePhone(phone),
                onSubmitEditing: () => this._submit(),
              }}
            />
          </View>
          <AppButton label={buttonText} onPress={this._submit} />
          <AppModal
            visible={this.state.updateSuccess}
            icon={'success'}
            showTitle={false}
            message={AppLang.screens.profile.messages.updatePhoneSuccess}
            showConfirmButton
            showCancelButton={false}
            onConfirm={this._onSubmitSuccess}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
