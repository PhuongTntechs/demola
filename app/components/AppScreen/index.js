import React from 'react';
import AppStyles from '../../config/styles';
import SafeAreaView from 'react-native-safe-area-view';
import AppColors from '../../config/colors';
import {View} from 'react-native';

export default class AppScreen extends React.Component<> {
  render() {
    let backgroundColor = AppColors.white;
    if (this.props.backgroundColor) {
      backgroundColor = this.props.backgroundColor;
    }
    return (
      <SafeAreaView
        style={[AppStyles.container]}
        forceInset={{bottom: 'always', top: 'never'}}
        {...this.props}>
        <View style={[AppStyles.container, {backgroundColor}]}>
          {this.props.children}
        </View>
      </SafeAreaView>
    );
  }
}
