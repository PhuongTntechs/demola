import React from 'react';
import {Text, TouchableWithoutFeedback, View} from 'react-native';
import Styles from './styles';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {wdp} from '../../../../lib/responsive';
import AppColors from '../../../../config/colors';

type Props = {
  data: any,
  onPress: void,
  style?: any,
};

export default class FunctionOverview extends React.Component<Props> {
  _onPress = () => {
    const {data, onPress} = this.props;
    if (onPress) {
      onPress(data);
    }
  };

  render() {
    if (!this.props.data) {
      return null;
    }
    const {name, icon} = this.props.data;
    return (
      <TouchableWithoutFeedback onPress={this._onPress}>
        <View style={[Styles.container, this.props.style]}>
          <AwesomeIcon name={icon} size={wdp(15)} color={AppColors.secondary} />
          <Text style={Styles.label}>{name.toUpperCase()}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
