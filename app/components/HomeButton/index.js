import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AppColors from '../../config/colors';
import * as RootNavigation from '../../navigation/RootNavigation';

type Props = {
  style?: any,
  size?: number,
};

export default class HomeButton extends React.PureComponent<Props> {
  _onPress = () => {
    RootNavigation.reset('Welcome');
  };

  render() {
    const size = this.props.size ?? 22;
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={this._onPress}
        style={this.props.style}>
        <Icon name={'home'} size={size} color={AppColors.white} />
      </TouchableOpacity>
    );
  }
}
