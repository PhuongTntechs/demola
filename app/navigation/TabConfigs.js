import {TabsConfigsType} from 'curved-bottom-navigation-bar';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AppColors from '../config/colors';
import React from 'react';

export const tabsConfigs: TabsConfigsType = {
  Documents: {
    icon: ({progress}) => (
      <AwesomeIcon name={'file-pdf-o'} size={22} color={AppColors.white} />
    ),
  },
  Calendar: {
    icon: ({progress}) => (
      <AwesomeIcon name={'calendar'} size={22} color={AppColors.white} />
    ),
  },
  Todo: {
    icon: ({progress}) => (
      <AwesomeIcon name={'list-ol'} size={22} color={AppColors.white} />
    ),
  },
  Salary: {
    icon: ({progress}) => (
      <AwesomeIcon name={'usd'} size={22} color={AppColors.white} />
    ),
  },
  Menu: {
    icon: ({progress}) => (
      <AwesomeIcon name={'bars'} size={22} color={AppColors.white} />
    ),
  },
};

export const tabsConfigsCN: TabsConfigsType = {
  News: {
    icon: ({progress}) => (
      <AwesomeIcon name={'rss'} size={22} color={AppColors.white} />
    ),
  },
  Salary: {
    icon: ({progress}) => (
      <AwesomeIcon name={'usd'} size={22} color={AppColors.white} />
    ),
  },
  Menu: {
    icon: ({progress}) => (
      <AwesomeIcon name={'bars'} size={22} color={AppColors.white} />
    ),
  },
};
