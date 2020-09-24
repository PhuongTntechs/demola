import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Styles from './styles';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import pixel from '../../../../lib/pixel';
import AppColors from '../../../../config/colors';

interface Props {
  rate: number;
  onChangeRate: void;
}

const RateView = (props: Props) => {
  const _onRate = (rate) => {
    const {onChangeRate} = props;
    if (onChangeRate) {
      onChangeRate(rate);
    }
  };

  const _getRate = () => props.rate ?? 0;

  return (
    <View style={Styles.container}>
      <TouchableOpacity activeOpacity={1} onPress={() => _onRate(1)}>
        <AwesomeIcon
          name={_getRate() >= 1 ? 'star' : 'star-o'}
          size={pixel(20)}
          color={_getRate() >= 1 ? AppColors.secondary2 : AppColors.black}
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => _onRate(2)}
        style={Styles.button}>
        <AwesomeIcon
          name={_getRate() >= 2 ? 'star' : 'star-o'}
          size={pixel(20)}
          color={_getRate() >= 2 ? AppColors.secondary2 : AppColors.black}
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => _onRate(3)}
        style={Styles.button}>
        <AwesomeIcon
          name={_getRate() >= 3 ? 'star' : 'star-o'}
          size={pixel(20)}
          color={_getRate() >= 3 ? AppColors.secondary2 : AppColors.black}
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => _onRate(4)}
        style={Styles.button}>
        <AwesomeIcon
          name={_getRate() >= 4 ? 'star' : 'star-o'}
          size={pixel(20)}
          color={_getRate() >= 4 ? AppColors.secondary2 : AppColors.black}
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => _onRate(5)}
        style={Styles.button}>
        <AwesomeIcon
          name={_getRate() >= 5 ? 'star' : 'star-o'}
          size={pixel(20)}
          color={_getRate() >= 5 ? AppColors.secondary2 : AppColors.black}
        />
      </TouchableOpacity>
    </View>
  );
};

export default RateView;
