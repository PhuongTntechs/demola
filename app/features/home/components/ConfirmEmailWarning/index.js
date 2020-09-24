import React from 'react';
import {View, Text} from 'react-native';
import Styles from './styles';
import AppButton from '../../../../components/AppButton';

type Props = {
  confirm: boolean,
  onPress: void,
};

type State = {
  hidden: boolean,
};

export default class ConfirmEmailWarning extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      hidden: false,
    };
  }

  _onHidden = () => {
    this.setState({hidden: true});
  };

  render() {
    if (this.props.confirm || this.state.hidden) {
      return null;
    }
    return (
      <View style={Styles.container} forceInset={{top: 'always'}}>
        <Text style={Styles.message}>
          Để thay đổi và tạo lại mật khẩu dễ dàng hơn.{'\n'}Vui lòng xác minh
          email của bạn
        </Text>
        <View style={Styles.buttons}>
          <AppButton
            label={'Để sau'}
            colorSet={'secondary'}
            onPress={this._onHidden}
            style={Styles.button}
            textStyle={Styles.buttonText}
          />
          <AppButton
            label={'Xác minh'}
            colorSet={'secondary'}
            onPress={this.props.onPress}
            style={Styles.button}
            textStyle={Styles.buttonText}
          />
        </View>
      </View>
    );
  }
}
