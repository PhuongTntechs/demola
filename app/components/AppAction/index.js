import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AppColors from '../../config/colors';
import AppLang from '../../config/lang';
import AppFonts from '../../config/fonts';
import pixel from '../../lib/pixel';

type Props = {
  onPress: void,
};

export class FilterButton extends React.Component<Props> {
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

export class SaveButton extends React.Component<Props> {
  _onPress = () => {
    if (this.props.onPress) {
      this.props.onPress();
    }
  };

  render() {
    return (
      <TouchableOpacity activeOpacity={1} onPress={this._onPress}>
        <Icon name={'save'} size={22} color={AppColors.white} />
      </TouchableOpacity>
    );
  }
}

export class SaveTextButton extends React.Component<Props> {
  _onPress = () => {
    if (this.props.onPress) {
      this.props.onPress();
    }
  };

  render() {
    return (
      <TouchableOpacity activeOpacity={1} onPress={this._onPress}>
        <Text style={styles.buttonText}>{AppLang.common.buttonSave}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = {
  buttonText: {
    ...AppFonts.medium,
    fontSize: pixel(14),
    color: AppColors.white,
  },
};
