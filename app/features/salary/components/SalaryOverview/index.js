import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import pixel from '../../../../lib/pixel';
import AppColors from '../../../../config/colors';
import AppValues from '../../../../config/values';
import AppFonts from '../../../../config/fonts';
import formatMoney from '../../../../lib/formatMoney';

type Props = {
  data: any,
  onPress: void,
};

export default class SalaryOverview extends React.PureComponent<Props> {
  _onPress = () => {
    const {data, onPress} = this.props;
    if (onPress) {
      onPress(data);
    }
  };

  render() {
    const {thang, luongCB, tongThuNhap} = this.props.data;
    return (
      <TouchableOpacity activeOpacity={1} onPress={this._onPress}>
        <View style={styles.container}>
          <View style={styles.col1}>
            <Text style={styles.labelText}>{thang}</Text>
          </View>
          <View style={styles.col2}>
            <Text style={styles.labelText}>{formatMoney(luongCB)}</Text>
          </View>
          <View style={styles.col3}>
            <Text style={styles.labelText}>{formatMoney(tongThuNhap)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: AppColors.primary,
  },
  col1: {
    alignItems: 'center',
    width: pixel(50),
    borderRightWidth: 0.5,
    borderRightColor: AppColors.primary,
    paddingVertical: AppValues.padding / 2,
    paddingHorizontal: pixel(5),
  },
  col2: {
    flex: 1,
    alignItems: 'flex-end',
    borderRightWidth: 0.5,
    borderRightColor: AppColors.primary,
    paddingVertical: AppValues.padding / 2,
    paddingHorizontal: pixel(5),
  },
  col3: {
    flex: 1,
    alignItems: 'flex-end',
    paddingVertical: AppValues.padding / 2,
    paddingHorizontal: pixel(5),
  },
  labelText: {
    ...AppFonts.regular,
    fontSize: pixel(14),
    color: AppColors.black,
  },
});
