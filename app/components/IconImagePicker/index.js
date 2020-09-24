import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import AppColors from '../../config/colors';
import ImagePicker from 'react-native-image-crop-picker';
import IonIcons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import Styles from './styles';

type Props = {
  size: number,
  style?: any,
  onSelectedImage: void,
  includeFunctions?: any,
  onPressFunction?: void,
};

type State = {
  showModal: boolean,
};

export default class IconImagePicker extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  showOption = () => {
    this.setState({showModal: !this.state.showModal});
  };

  _onPress = () => {
    this.setState({showModal: !this.state.showModal});
  };

  _hideModal = () => {
    this.setState({showModal: false});
  };

  _onSelected = (type) => {
    this.setState({showModal: false}, () => {
      setTimeout(() => {
        if (type === 0) {
          ImagePicker.openPicker({
            cropping: true,
            mediaType: 'photo',
            forceJpg: true,
            cropperCircleOverlay: true,
            showCropGuidelines: false,
            width: 400,
            height: 400,
          }).then((image) => {
            this.props.onSelectedImage(image);
          });
        } else {
          ImagePicker.openCamera({
            width: 400,
            height: 400,
            cropping: true,
            forceJpg: true,
            cropperCircleOverlay: true,
            showCropGuidelines: false,
          }).then((image) => {
            this.props.onSelectedImage(image);
          });
        }
      }, 500);
    });
  };

  render() {
    const {size, style, includeFunctions} = this.props;
    return (
      <View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={this._onPress}
          style={style}>
          <IonIcons
            name={'ios-camera-outline'}
            size={size}
            color={AppColors.primary}
          />
        </TouchableOpacity>
        <Modal
          avoidKeyboard
          isVisible={this.state.showModal}
          // isVisible
          backdropTransitionOutTiming={0}
          // swipeDirection={'down'}
          onBackButtonPress={this._hideModal}
          onBackdropPress={this._hideModal}
          // onSwipeComplete={this._hideModal}
          //onModalShow={this._showKeyboard}
          style={Styles.modalWrapper}>
          <View style={Styles.modal}>
            {(includeFunctions ?? []).map((func, index) => {
              return (
                <View style={Styles.selectItem} key={`${index}`}>
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      this.setState({showModal: false}, () => {
                        if (this.props.onPressFunction) {
                          this.props.onPressFunction(func);
                        }
                      });
                    }}
                    style={Styles.selectItemWrapper}>
                    <Text style={Styles.selectItemText}>{func.name}</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
            <View style={Styles.selectItem}>
              <TouchableOpacity
                onPress={() => {
                  this._onSelected(0);
                }}
                style={Styles.selectItemWrapper}>
                <Text style={Styles.selectItemText}>Chọn ảnh có sẵn</Text>
              </TouchableOpacity>
            </View>
            <View style={Styles.selectItem}>
              <TouchableOpacity
                onPress={() => {
                  this._onSelected(1);
                }}
                style={Styles.selectItemWrapper}>
                <Text style={Styles.selectItemText}>Chụp ảnh mới</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
