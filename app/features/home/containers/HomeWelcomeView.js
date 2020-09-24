import React from 'react';
import {
  ImageBackground,
  View,
  Image,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from 'react-native';
import Styles from './styles';
import AppImages from '../../../config/imges';
import IconImagePicker from '../../../components/IconImagePicker';
import pixel from '../../../lib/pixel';
import functions, {functionsCN} from './functions';
import FunctionOverview from '../components/FunctionOverview';
import AppModal from '../../../components/AppModal';
import AppLang from '../../../config/lang';
import * as RootNavigation from '../../../navigation/RootNavigation';
import ConfirmEmailWarning from '../components/ConfirmEmailWarning';
import ButtonLogout from '../components/ButtonLogout';

type Props = {
  AuthReducer: any,
  checkAppUpdate: void,
  uploadAvatar: void,
  doLogout: void,
};

type State = {
  uploadSuccess: boolean,
};

export default class HomeWelcomeView extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      uploadSuccess: false,
    };
  }

  componentDidMount(): void {}

  _onLogout = () => this.props.doLogout();

  _selectImage = () => {
    if (this._cameraIcon) {
      this._cameraIcon.showOption();
    }
  };

  _updateAvatar = (image) => {
    console.log(image);
    this.props.uploadAvatar(image, () => this.setState({uploadSuccess: true}));
  };

  _onCustomFunction = () => {
    RootNavigation.navigate('Profile');
  };

  _changeEmail = () => {
    RootNavigation.navigate('ChangeEmail');
  };

  _onSelectFunction = (func) => {
    const {isNhanVien} = this.props.AuthReducer.user ?? {};
    if (func.id === 3 && isNhanVien) {
      RootNavigation.navigate('Report');
      return;
    } else if (func.id === 6 && isNhanVien) {
      RootNavigation.navigate(func.screen);
      return;
    }
    RootNavigation.navigate('Home', {func});
  };

  render() {
    const {user} = this.props.AuthReducer;
    const {hoDem, ten, maNS, isConfirmEmail, isNhanVien} = user ?? {};
    let lstFunctions = functionsCN;
    if (isNhanVien) {
      lstFunctions = functions;
    }
    const fullName = `${hoDem ?? ''} ${ten ?? ''}`.trim();
    const userAvatar =
      user &&
      user.avatarUrl &&
      user.avatarUrl.length > 0 &&
      user.avatarUrl.toUpperCase() !== 'NULL'
        ? {uri: user.avatarUrl}
        : AppImages.userIcon;
    return (
      <View style={Styles.container}>
        <ImageBackground
          source={AppImages.welcomeHeader}
          style={Styles.welcomeHeader}>
          <SafeAreaView style={Styles.userBloc}>
            <TouchableOpacity activeOpacity={1} onPress={this._selectImage}>
              <>
                <View style={Styles.userAvatar}>
                  <Image
                    source={userAvatar}
                    style={Styles.userAvatar}
                    resizeMode={'contain'}
                  />
                </View>
                <IconImagePicker
                  ref={(ref) => (this._cameraIcon = ref)}
                  size={pixel(24)}
                  style={Styles.cameraIcon}
                  onSelectedImage={this._updateAvatar}
                  includeFunctions={[
                    {id: 0, name: AppLang.screens.welcome.profilePage},
                  ]}
                  onPressFunction={this._onCustomFunction}
                />
              </>
            </TouchableOpacity>
            <Text style={Styles.userName}>{fullName}</Text>
            <Text style={Styles.userCode}>{maNS}</Text>
            <ConfirmEmailWarning
              confirm={isConfirmEmail}
              onPress={this._changeEmail}
            />
            <ButtonLogout onSubmit={this._onLogout} />
          </SafeAreaView>
          <View style={Styles.content}>
            <View style={Styles.row}>
              <FunctionOverview
                data={lstFunctions[0]}
                onPress={this._onSelectFunction}
              />
              <FunctionOverview
                data={lstFunctions[1]}
                onPress={this._onSelectFunction}
              />
            </View>
            <View style={Styles.row}>
              <FunctionOverview
                data={lstFunctions[2]}
                onPress={this._onSelectFunction}
              />
              <FunctionOverview
                data={lstFunctions[3]}
                onPress={this._onSelectFunction}
              />
            </View>
            <View style={Styles.row}>
              <FunctionOverview
                data={lstFunctions[4]}
                onPress={this._onSelectFunction}
              />
              <FunctionOverview
                data={lstFunctions[5]}
                onPress={this._onSelectFunction}
              />
            </View>
          </View>
        </ImageBackground>
        <AppModal
          visible={this.state.uploadSuccess}
          icon={'success'}
          showTitle={false}
          message={AppLang.screens.welcome.uploadAvatarSuccess}
          showConfirmButton
          showCancelButton={false}
          onConfirm={() => this.setState({uploadSuccess: false})}
        />
      </View>
    );
  }
}
