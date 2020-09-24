import React from 'react';
import {Text, View} from 'react-native';
import Styles from './styles';
import moment from 'moment';
import RateView from '../RateView';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import pixel from '../../../../lib/pixel';
import AppColors from '../../../../config/colors';
import HyperText from '../../../../lib/HyperText';

interface Props {
  data: any;
  onChangeRate: void;
}

const DetailNormal = (props: Props) => {
  const _onSetRate = (rate) => {
    const {onChangeRate} = props;
    if (onChangeRate) {
      onChangeRate(rate);
    }
  };

  const title = (props.data.tieuDe ?? '').toUpperCase();

  const thoiGian = props.data.confirmTime
    ? moment(props.data.confirmTime).format('DD/MM/YYYY HH:mm')
    : '';

  return (
    <View style={Styles.container}>
      <Text style={Styles.titleText}>{title}</Text>
      <View style={Styles.subTitle}>
        <Text style={Styles.subText}>{thoiGian}</Text>
        <Text style={Styles.subText}>Loại tin: {props.data.nhom}</Text>
      </View>
      <HyperText style={Styles.noiDungText} linkColor={AppColors.secondary2}>
        {props.data.noiDung}
      </HyperText>
      <View style={Styles.bottom}>
        <RateView rate={props.data.rate ?? 0} onChangeRate={_onSetRate} />
        <Text>
          <AwesomeIcon name={'eye'} size={pixel(15)} color={AppColors.black} />{' '}
          {props.data.luotXem}
        </Text>
      </View>
    </View>
  );
};

export default DetailNormal;
