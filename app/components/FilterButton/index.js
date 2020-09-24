import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AppColors from '../../config/colors';

type Props = {
  onPress: void,
};

export default class FilterButton extends React.Component<Props> {
  _onPress = () => {
    if (this.props.onPress) {
      this.props.onPress();
    }
  };

  render() {
    return (
      <TouchableOpacity activeOpacity={1} onPress={this._onPress}>
        <Icon name={'filter-outline'} size={30} color={AppColors.white} />
      </TouchableOpacity>
    );
  }
}
