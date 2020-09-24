import React from 'react';
import Styles from './styles';
import {Platform, StatusBar, Text, TouchableOpacity, View} from 'react-native';
import AppColors from '../../config/colors';
import IonIcons from 'react-native-vector-icons/Ionicons';
import SafeAreaView from 'react-native-safe-area-view';

type Props = {
  navigation?: any,
  colorSet?: string,
  title: string,
  backOverwrite?: void,
  navLeft?: any,
  navRight?: any,
};

export default class PageHeader extends React.PureComponent<Props> {
  static defaultProps = {
    colorSet: 'primary',
    backOverwrite: null,
  };

  _goBack = () => {
    if (this.props.backOverwrite === null) {
      this.props.navigation.goBack();
    } else {
      this.props.backOverwrite();
    }
  };

  render() {
    const {navigation, title, colorSet, navLeft, navRight} = this.props;
    const canGoBack = navigation && navigation.canGoBack();
    let bg = AppColors.secondary2;
    let textColor = AppColors.white;
    let barColor = AppColors.secondary2;
    let barStyle = 'light-content';
    if (colorSet === 'secondary') {
      bg = AppColors.white;
      textColor = AppColors.black;
      barColor = AppColors.lightGrey;
      barStyle = 'dark-content';
    }
    if (Platform.OS === 'ios') {
      return (
        <SafeAreaView forceInset={{top: 'always'}}>
          <View style={[Styles.container, {backgroundColor: bg}]}>
            <StatusBar backgroundColor={barColor} barStyle={barStyle} />
            <View style={Styles.navLeft}>
              {navLeft ? navLeft : null}
              {canGoBack ? (
                <TouchableOpacity activeOpacity={1} onPress={this._goBack}>
                  <IonIcons
                    name={'ios-chevron-back'}
                    size={30}
                    color={textColor}
                  />
                </TouchableOpacity>
              ) : (
                <View style={Styles.defaultNavButton} />
              )}
            </View>
            <View style={Styles.titleBlock}>
              <Text style={[Styles.headerTitle, {color: textColor}]}>{title}</Text>
            </View>
            <View style={Styles.navRight}>
              {navRight ? navRight : null}
              <View style={Styles.defaultNavButton} />
            </View>
          </View>
        </SafeAreaView>
      );
    }
    return (
      <View style={[Styles.container, {backgroundColor: bg}]}>
        <StatusBar backgroundColor={barColor} barStyle={barStyle} />
        <View style={Styles.navLeft}>
          {navLeft ? navLeft : null}
          {canGoBack ? (
            <TouchableOpacity activeOpacity={1} onPress={this._goBack}>
              <IonIcons name={'ios-chevron-back'} size={30} color={textColor} />
            </TouchableOpacity>
          ) : (
            <View style={Styles.defaultNavButton} />
          )}
        </View>
        <View style={Styles.titleBlock}>
          <Text style={[Styles.headerTitle, {color: textColor}]}>{title}</Text>
        </View>
        <View style={Styles.navRight}>
          {navRight ? navRight : null}
          <View style={Styles.defaultNavButton} />
        </View>
      </View>
    );
  }
}
