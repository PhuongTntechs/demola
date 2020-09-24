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
import {AppTextInput} from '../../../components/AppInputs';
import AppLang from '../../../config/lang';
import AppButton from '../../../components/AppButton';
import getAppVersion from '../../../lib/getAppVersion';
import IonIcons from 'react-native-vector-icons/Ionicons';
import AppColors from '../../../config/colors';
import * as RootNavigation from '../../../navigation/RootNavigation';

type Props = {
  navigation: any,
  submitForgot: void,
  showForgotError: void,
};

type State = {
  username: string,
};

export default class AuthForgotView extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    };
  }

  _submit = () => {
    Keyboard.dismiss();
    const {username} = this.state;
    if (username.trim().length === 0) {
      this.props.showForgotError(
        500,
        AppLang.screens.auth.errors.emptyUsername,
      );
      return;
    }
    this.props.submitForgot(username, () =>
      RootNavigation.navigate('AuthReset', {username}),
    );
  };

  _backLogin = () => {
    Keyboard.dismiss();
    this.props.navigation.goBack();
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
                  onPress={this._backLogin}
                  style={Styles.buttonBack}>
                  <IonIcons
                    name={'ios-chevron-back'}
                    size={30}
                    color={AppColors.primary}
                  />
                </TouchableOpacity>
                <Text style={Styles.pageTitleTextWithBloc}>
                  {AppLang.screens.auth.forgotTitle}
                </Text>
                <View style={Styles.buttonBack} />
              </View>
              <AppTextInput
                style={Styles.inputBloc}
                inputProps={{
                  placeholder: AppLang.screens.auth.mans,
                  returnKeyType: 'done',
                  value: this.state.username,
                  onChangeText: (username) => this.setState({username}),
                  onSubmitEditing: () => this._submit(),
                }}
              />
              <AppButton
                label={AppLang.screens.auth.buttons.accept}
                onPress={this._submit}
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
