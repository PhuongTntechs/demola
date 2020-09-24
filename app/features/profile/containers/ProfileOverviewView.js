import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Styles from './styles';
import AppLang from '../../../config/lang';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AppColors from '../../../config/colors';
import * as RootNavigation from '../../../navigation/RootNavigation';

type Props = {
  AuthReducer: any,
  ProfileReducer: any,
};

type State = {};

class ProfileOverviewView extends React.Component<Props, State> {
  constructor(props) {
    super(props);
  }

  _changePhone = () => RootNavigation.navigate('ChangePhone');

  _changeEmail = () => RootNavigation.navigate('ChangeEmail');

  _changePassword = () => RootNavigation.navigate('ChangePassword');

  render() {
    const {
      hoDem,
      ten,
      maNS,
      soCMT,
      ngaySinh,
      tenChucVu,
      tenDonVi,
      phoneNumber,
      email,
      isConfirmEmail,
    } = this.props.AuthReducer.user ?? {};
    return (
      <View style={Styles.content}>
        <View style={Styles.rowInfo}>
          <View style={Styles.rowInfoLeft}>
            <Text style={Styles.labelText}>
              {AppLang.screens.profile.hoTen}
            </Text>
          </View>
          <Text style={Styles.labelText}>
            {hoDem} {ten}
          </Text>
        </View>
        <View style={Styles.rowInfo}>
          <View style={Styles.rowInfoLeft}>
            <Text style={Styles.labelText}>{AppLang.screens.profile.maNS}</Text>
          </View>
          <Text style={Styles.labelText}>{maNS}</Text>
        </View>
        <View style={Styles.rowInfo}>
          <View style={Styles.rowInfoLeft}>
            <Text style={Styles.labelText}>
              {AppLang.screens.profile.chucVu}
            </Text>
          </View>
          <Text style={Styles.labelText}>{tenChucVu}</Text>
        </View>
        <View style={Styles.rowInfo}>
          <View style={Styles.rowInfoLeft}>
            <Text style={Styles.labelText}>
              {AppLang.screens.profile.donVi}
            </Text>
          </View>
          <Text style={Styles.labelText}>{tenDonVi}</Text>
        </View>
        <View style={Styles.rowInfo}>
          <View style={Styles.rowInfoLeft}>
            <Text style={Styles.labelText}>
              {AppLang.screens.profile.soCMT}
            </Text>
          </View>
          <Text style={Styles.labelText}>{soCMT}</Text>
        </View>
        <View style={Styles.rowInfo}>
          <View style={Styles.rowInfoLeft}>
            <Text style={Styles.labelText}>
              {AppLang.screens.profile.ngaySinh}
            </Text>
          </View>
          <Text style={Styles.labelText}>{ngaySinh}</Text>
        </View>
        <View style={Styles.rowInfo}>
          <View style={Styles.rowInfoLeft}>
            <Text style={Styles.labelText}>
              {AppLang.screens.profile.phoneNumber}
            </Text>
          </View>
          <View style={Styles.rowInfoRight}>
            <Text style={Styles.labelText}>{phoneNumber}</Text>
            <TouchableOpacity activeOpacity={1} onPress={this._changePhone}>
              <AwesomeIcon
                name={'edit'}
                size={20}
                color={AppColors.secondary2}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={Styles.rowInfo}>
          <View style={Styles.rowInfoLeft}>
            <Text style={Styles.labelText}>
              {AppLang.screens.profile.email}
            </Text>
          </View>
          <View style={Styles.rowInfoRight}>
            <View style={Styles.flex}>
              <Text
                style={Styles.labelText}
                numberOfLines={1}
                ellipsizeMode={'tail'}>
                {email}
              </Text>
            </View>
            <View>
              {isConfirmEmail ? (
                <TouchableOpacity activeOpacity={1} onPress={this._changeEmail}>
                  <View style={Styles.buttonVerify}>
                    <AwesomeIcon
                      name={'edit'}
                      size={20}
                      color={AppColors.secondary2}
                    />
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity activeOpacity={1} onPress={this._changeEmail}>
                  <View style={Styles.buttonVerify}>
                    <Text style={Styles.verifyText}>
                      {AppLang.screens.profile.verify}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
        <View style={Styles.rowInfo}>
          <View style={Styles.rowInfoLeft}>
            <Text style={Styles.labelText}>
              {AppLang.screens.profile.password}
            </Text>
          </View>
          <View style={Styles.rowInfoRight}>
            <View />
            <TouchableOpacity activeOpacity={1} onPress={this._changePassword}>
              <View style={Styles.buttonVerify}>
                <Text style={Styles.verifyText}>
                  {AppLang.common.buttonUpdate}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default ProfileOverviewView;
