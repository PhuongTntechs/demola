import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Styles from './styles';
import moment from 'moment';
import RateView from '../RateView';
import pixel from '../../../../lib/pixel';
import AppColors from '../../../../config/colors';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

interface Props {
  data: any;
  onPress: void;
  onSetRate: void;
}

const NewsOverview = (props: Props) => {
  const _onPress = () => {
    const {data, onPress} = props;
    if (onPress) {
      onPress(data);
    }
  };

  const thoiGian = props.data.confirmTime
    ? moment(props.data.confirmTime).format('DD/MM/YYYY HH:mm')
    : props.data.createTime
    ? moment(props.data.createTime).format('DD/MM/YYYY HH:mm')
    : 'N/A';

  const _onSetRate = (rate) => {
    const {data, onSetRate} = props;
    if (onSetRate && data.rate !== rate) {
      onSetRate(data, rate);
    }
  };

  return (
    <TouchableOpacity activeOpacity={1} onPress={_onPress}>
      <View style={Styles.container}>
        <View style={Styles.content}>
          <Text style={Styles.title}>{props.data.tieuDe.toUpperCase()}</Text>
          <View style={Styles.subHeader}>
            <Text style={Styles.subText}>{thoiGian}</Text>
            <Text style={Styles.subText}>{props.data.nhom}</Text>
          </View>
          <Text numberOfLines={5} ellipsizeMode={'tail'}>
            {props.data.noiDung ?? ''}
          </Text>
        </View>
        <View style={Styles.bottom}>
          <RateView rate={props.data.rate ?? 0} onChangeRate={_onSetRate} />
          <Text>
            <AwesomeIcon
              name={'eye'}
              size={pixel(15)}
              color={AppColors.black}
            />{' '}
            {props.data.luotXem}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NewsOverview;
