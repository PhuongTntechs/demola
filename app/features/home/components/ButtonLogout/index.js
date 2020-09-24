import React from 'react';
import {
  Dimensions,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import AppModal from '../../../../components/AppModal';
import AppLang from '../../../../config/lang';
import AppValues from '../../../../config/values';

type Props = {
  onSubmit: void,
};

type State = {
  askLogout: boolean,
};

export default class ButtonLogout extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {askLogout: false};
  }

  _onPress = () => {
    this.setState({askLogout: true});
  };

  _onCancel = () => {
    this.setState({askLogout: false});
  };

  _onLogout = () => {
    this.setState({askLogout: false}, () => {
      if (this.props.onSubmit) {
        this.props.onSubmit();
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity activeOpacity={1} onPress={this._onPress}>
          <IonIcon name={'md-power'} size={30} color={'#ffffff'} />
        </TouchableOpacity>
        <AppModal
          visible={this.state.askLogout}
          icon={'warning'}
          showTitle={true}
          title={AppLang.common.logout.title}
          message={AppLang.common.logout.body}
          showConfirmButton
          showCancelButton
          onConfirm={this._onLogout}
          onCancel={this._onCancel}
        />
      </View>
    );
  }
}

function getTopHeight() {
  const dimen = Dimensions.get('window');
  if (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 812 ||
      dimen.width === 812 ||
      dimen.height === 896 ||
      dimen.width === 896)
  ) {
    return 44;
  }
  return 20;
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? getTopHeight() : 0,
    right: AppValues.padding,
    width: 30,
    height: 30,
    zIndex: 1000,
  },
  flex: {
    flex: 1,
    borderWidth: 1,
  },
});
