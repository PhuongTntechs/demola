import React from 'react';
import TestScreen from '../features/test/containers';
import AuthInitContainer from '../features/auth/containers/AuthInitContainer';
import AuthLoginContainer from '../features/auth/containers/AuthLoginContainer';
import AuthForgotContainer from '../features/auth/containers/AuthForgotContainer';
import AuthResetPasswordContainer from '../features/auth/containers/AuthResetPasswordContainer';
import HomeWelcomeContainer from '../features/home/containers/HomeWelcomeContainer';
import HomeContainer from '../features/home/containers/HomeContainer';
import ChangeEmailContainer from '../features/profile/containers/ChangeEmailContainer';
import DocumentDetailsContainer from '../features/document/containers/DocumentDetailsContainer';
import SalaryMonthContainer from '../features/salary/containers/SalaryMonthContainer';
import ProfileOverviewContainer from '../features/profile/containers/ProfileOverviewContainer';
import ChangePhoneContainer from '../features/profile/containers/ChangePhoneContainer';
import ChangePasswordContainer from '../features/profile/containers/ChangePasswordContainer';
import NewsListContainer from '../features/news/containers/NewsListContainer';
import NewsDetailsContainer from '../features/news/containers/NewsDetailsContainer';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {View} from 'react-native';
import AppStyles from '../config/styles';

const EmptyScreen = () => <View style={AppStyles.container} />;

function NavigationStack() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName={'AuthInit'}
      headerMode="none"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      {<Stack.Screen name={'Test'} component={TestScreen} />}
      <Stack.Screen name={'AuthInit'} component={AuthInitContainer} />
      <Stack.Screen name={'AuthLogin'} component={AuthLoginContainer} />
      <Stack.Screen name={'AuthForgot'} component={AuthForgotContainer} />
      <Stack.Screen name={'AuthReset'} component={AuthResetPasswordContainer} />
      <Stack.Screen name={'Welcome'} component={HomeWelcomeContainer} />
      <Stack.Screen name={'Home'} component={HomeContainer} />
      <Stack.Screen name={'ChangeEmail'} component={ChangeEmailContainer} />
      <Stack.Screen name={'CalendarDetail'} component={EmptyScreen} />
      <Stack.Screen
        name={'DocumentDetails'}
        component={DocumentDetailsContainer}
      />
      <Stack.Screen name={'TodoDetails'} component={EmptyScreen} />
      <Stack.Screen name={'Report'} component={EmptyScreen} />
      <Stack.Screen name={'ReportSX'} component={EmptyScreen} />
      <Stack.Screen name={'ReportKD'} component={EmptyScreen} />
      <Stack.Screen name={'CBC'} component={EmptyScreen} />
      <Stack.Screen name={'SalaryMonth'} component={SalaryMonthContainer} />
      <Stack.Screen name={'Profile'} component={ProfileOverviewContainer} />
      <Stack.Screen name={'ChangePhone'} component={ChangePhoneContainer} />
      <Stack.Screen
        name={'ChangePassword'}
        component={ChangePasswordContainer}
      />
      <Stack.Screen name={'NewsList'} component={NewsListContainer} />
      <Stack.Screen name={'NewsDetail'} component={NewsDetailsContainer} />
    </Stack.Navigator>
  );
}

export default NavigationStack;
