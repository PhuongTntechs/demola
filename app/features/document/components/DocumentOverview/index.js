import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Styles from './styles';
import AppColors from '../../../../config/colors';

type Props = {
  data: any,
  onPress: void,
  onDownload: void,
};

export default class DocumentOverview extends React.PureComponent<Props> {
  _onPress = () => {
    const {data, onPress} = this.props;
    if (onPress) {
      onPress(data);
    }
  };

  _onDownload = () => {
    const {data, onDownload} = this.props;
    if (onDownload) {
      onDownload(data);
    }
  };

  render() {
    const {daDoc, soVB, trichYeu} = this.props.data;
    return (
      <TouchableOpacity activeOpacity={1} onPress={this._onPress}>
        <View style={Styles.container}>
          <View style={!daDoc ? Styles.unread : Styles.read} />
          <View style={Styles.content}>
            <View style={Styles.labelBloc}>
              <Text>{soVB}</Text>
            </View>
            <View style={Styles.trichYeuBloc}>
              <Text>{trichYeu}</Text>
            </View>
            <TouchableOpacity activeOpacity={1} onPress={this._onDownload}>
              <View style={Styles.buttonDownload}>
                <Icon
                  name={'cloud-download-outline'}
                  size={20}
                  color={AppColors.primary}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
