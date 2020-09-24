import React from 'react';
import {View} from 'react-native';
import AppScreen from '../../../components/AppScreen';
import PageHeader from '../../../components/PageHeader';
import AppLang from '../../../config/lang';
import AppColors from '../../../config/colors';
import Styles from './styles';
import ComingScreen from '../../../components/ComingScreen';

export default class SalaryContainer extends React.Component<> {
  render() {
    return (
      <AppScreen
        forceInset={{bottom: 'always', top: 'never'}}
        backgroundColor={AppColors.secondary2}>
        <PageHeader title={AppLang.screens.welcome.functions.salary} />
        <View style={Styles.container}>
          <ComingScreen message={AppLang.common.functionUpdating} />
        </View>
      </AppScreen>
    );
  }
}
