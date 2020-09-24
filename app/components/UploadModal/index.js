import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import Styles from './styles';
import Modal from 'react-native-modal';
import AppLang from '../../config/lang';
import * as Progress from 'react-native-progress';

type Props = {
  visible: boolean,
  percent: number,
};

export default class UploadModal extends React.PureComponent<Props> {
  static defaultProps = {
    visible: false,
    percent: 0,
  };

  render() {
    const {width} = Dimensions.get('window');
    const {percent} = this.props;
    return (
      <Modal
        backdropTransitionOutTiming={0}
        backdropTransitionInTiming={0}
        style={Styles.modal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropOpacity={0.5}
        useNativeDriver
        onModalHide={this._clearMessage}
        isVisible={this.props.visible}>
        <View style={Styles.container}>
          <View style={Styles.titleCom}>
            <Text style={Styles.title}>{AppLang.capNhat}</Text>
          </View>
          <View>
            <Text style={Styles.loadingText}>
              {AppLang.loading} {percent}%
            </Text>
            <Progress.Bar
              progress={percent / 100}
              width={width - 200}
              height={20}
              useNativeDriver
            />
          </View>
        </View>
      </Modal>
    );
  }
}
