import React from 'react';
import {View} from 'react-native';
import Styles from './styles';
import Modal from 'react-native-modal';
import AppColors from '../../config/colors';
import LottieView from 'lottie-react-native';

const loaderJson = require('app/assets/lottie/loading');

type Props = {
  show?: boolean,
  modal?: boolean,
  noOverlay?: boolean,
};

export default class Loader extends React.PureComponent<Props> {
  static defaultProps = {
    show: false,
    modal: false,
    noOverlay: false,
  };

  render() {
    const {show, modal, noOverlay} = this.props;
    if (modal) {
      return (
        <Modal
          avoidKeyboard
          isVisible={show}
          // isVisible
          animationOutTiming={1}
          animationInTiming={1}
          backdropOpacity={0.3}
          onBackButtonPress={this._hideModal}
          onBackdropPress={this._hideModal}
          onModalShow={this._showKeyboard}
          backdropColor={AppColors.black}
          style={Styles.modalWrapper}>
          <LottieView source={loaderJson} style={Styles.loader} autoPlay loop />
        </Modal>
      );
    }
    if (!modal && show) {
      return (
        <View
          style={[
            Styles.modalWrapperNotBlock,
            noOverlay && Styles.modalWrapperNotBlockNoOverlay,
          ]}>
          <LottieView source={loaderJson} style={Styles.loader} autoPlay loop />
        </View>
      );
    }
    return null;
  }
}
