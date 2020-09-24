import React from 'react';
import {Image, Text, View} from 'react-native';
import AppImages from '../../config/imges';
import pixel from '../../lib/pixel';
import AppColors from '../../config/colors';
import AppFonts from '../../config/fonts';

type Props = {
  message?: string,
};

export default class ComingScreen extends React.PureComponent<Props> {
  render() {
    const message = this.props.message
      ? this.props.message
      : 'Chức năng đang được xây dụng';
    return (
      <View style={styles.container}>
        <Image
          source={AppImages.sorryIcon}
          style={styles.icon}
          resizeMode="stretch"
        />
        <Text style={styles.message}>{message}</Text>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: pixel(60),
    height: pixel(60),
  },
  message: {
    ...AppFonts.medium,
    fontSize: pixel(18),
    textAlign: 'center',
    marginTop: pixel(10),
    color: AppColors.primary,
  },
};
