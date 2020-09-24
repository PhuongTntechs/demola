import React from 'react';
import {Image, Platform, Text, TouchableOpacity, View} from 'react-native';
import Styles from './styles';
import AppImages from '../../../config/imges';
import AppLang from '../../../config/lang';
import AppButton from '../../../components/AppButton';
import {getVersion} from 'react-native-device-info';
import AppModal from '../../../components/AppModal';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import pixel from '../../../lib/pixel';
import AppColors from '../../../config/colors';
import * as RootNavigation from '../../../navigation/RootNavigation';
import InAppReview from 'react-native-in-app-review';

type Props = {
  doLogout: void,
  requestingMenuStart: void,
  requestingMenuStop: void,
  showMenuError: void,
};

type State = {
  askLogout: boolean,
};

class MenuOverviewView extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      askLogout: false,
    };
  }

  _rateApp = () => InAppReview.RequestInAppReview();

  _askLogout = () => this.setState({askLogout: true});

  _confirmLogout = () => {
    this.setState({askLogout: false}, () => {
      this.props.requestingMenuStart();
      this.props.doLogout(
        () => this.props.requestingMenuStop(),
        (code, message) => this.props.showMenuError(code, message),
      );
    });
  };

  _gotoProfile = () => RootNavigation.navigate('Profile');

  render() {
    return (
      <View style={Styles.content}>
        <View style={Styles.flex}>
          <View>{this._renderUserOverview()}</View>
          <ButtonItem
            iconName={'pie-chart'}
            label={AppLang.screens.menu.functions.report}
            screen={'Report'}
            iconRight={false}
          />
          <ButtonItem
            iconName={'cogs'}
            label={AppLang.screens.menu.functions.qltbi}
            screen={null}
            iconRight={false}
          />
          <ButtonItem
            iconName={'rss'}
            label={AppLang.screens.menu.functions.news}
            screen={'NewsList'}
            iconRight={false}
          />
          {Platform.OS === 'android' ? (
            <ButtonItem
              iconName={'smile-o'}
              label={AppLang.screens.menu.functions.rate}
              screen={null}
              iconRight={false}
              onPress={this._rateApp}
            />
          ) : null}
        </View>
        <AppButton
          label={AppLang.common.logout.title}
          onPress={this._askLogout}
          style={Styles.buttonLogout}
        />
        <View style={Styles.versionBloc}>
          <Text>Version {getVersion()}</Text>
        </View>
        {this.state.askLogout ? (
          <AppModal
            visible={this.state.askLogout}
            icon={'warning'}
            showTitle={true}
            title={AppLang.common.logout.title}
            message={AppLang.common.logout.body}
            showConfirmButton
            showCancelButton
            onConfirm={this._confirmLogout}
            onCancel={() => this.setState({askLogout: false})}
          />
        ) : null}
      </View>
    );
  }

  _renderUserOverview() {
    const {user} = this.props.AuthReducer;
    const {hoDem, ten, maNS} = user ?? {};
    const fullName = `${hoDem ?? ''} ${ten ?? ''}`.trim();
    const userAvatar =
      user &&
      user.avatarUrl &&
      user.avatarUrl.length > 0 &&
      user.avatarUrl.toUpperCase() !== 'NULL'
        ? {uri: user.avatarUrl}
        : AppImages.userIcon;
    return (
      <TouchableOpacity activeOpacity={1} onPress={this._gotoProfile}>
        <View style={Styles.profileBloc}>
          <Image
            source={userAvatar}
            style={Styles.avatar}
            resizeMode={'cover'}
          />
          <View style={Styles.profileInfo}>
            <Text style={Styles.fullName}>{fullName}</Text>
            <Text style={Styles.maNhanSu}>{maNS}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default MenuOverviewView;

type ButtonProps = {
  iconName: string,
  iconRight?: boolean,
  label: string,
  screen: string,
  onPress?: void,
};

class ButtonItem extends React.PureComponent<ButtonProps> {
  static defaultProps = {
    iconRight: true,
    screen: '',
  };

  _onPress = () => {
    const {screen, onPress} = this.props;
    if (onPress) {
      onPress();
    } else if (screen && screen.length > 0) {
      RootNavigation.navigate(screen);
    }
  };

  render() {
    const {iconName, label, iconRight} = this.props;
    return (
      <TouchableOpacity activeOpacity={1} onPress={this._onPress}>
        <View style={Styles.buttonItem}>
          <View style={Styles.itemInfo}>
            <View style={Styles.itemIconBloc}>
              <AwesomeIcon
                name={iconName}
                size={pixel(25)}
                color={AppColors.primary}
              />
            </View>
            <Text style={Styles.labelItem}>{label}</Text>
          </View>
          {iconRight ? (
            <AwesomeIcon
              name={'chevron-right'}
              size={pixel(25)}
              color={AppColors.primary}
            />
          ) : null}
        </View>
      </TouchableOpacity>
    );
  }
}
