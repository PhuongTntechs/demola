import React from 'react';
import Styles from './styles';
import {
  Platform,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AppColors from '../../../../config/colors';
import SafeAreaView from 'react-native-safe-area-view';
import HomeButton from '../../../../components/HomeButton';
import AppLang from '../../../../config/lang';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  onSearch: void,
};

type State = {
  text: string,
};

export default class DocumentHeader extends React.PureComponent<Props, State> {
  static defaultProps = {
    colorSet: 'primary',
    backOverwrite: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  _onSearch = () => {
    const {text} = this.state;
    if (this.props.onSearch) {
      this.props.onSearch(text);
    }
  };

  _clearText = () => {
    this.setState({text: ''}, () => {
      if (this.props.onSearch) {
        this.props.onSearch('');
      }
    });
  };

  render() {
    if (Platform.OS === 'ios') {
      return (
        <SafeAreaView forceInset={{top: 'always'}}>
          {this._renderContent()}
        </SafeAreaView>
      );
    }
    return this._renderContent();
  }

  _renderContent() {
    let bg = AppColors.secondary2;
    let barColor = AppColors.secondary2;
    let barStyle = 'light-content';
    return (
      <View style={[Styles.container, {backgroundColor: bg}]}>
        <StatusBar backgroundColor={barColor} barStyle={barStyle} />
        <HomeButton />
        <Text style={[Styles.headerTitle]}>
          {AppLang.screens.document.title}
        </Text>
        <View style={Styles.searchBloc}>
          <TextInput
            style={Styles.searchInput}
            underlineColorAndroid={'transparent'}
            returnKeyType={'search'}
            placeholder={AppLang.screens.document.placeholderSearch}
            //clearButtonMode={'while-editing'}
            value={this.state.text}
            onChangeText={(text) => this.setState({text})}
            onSubmitEditing={this._onSearch}
          />
          {this.state.text.length > 0 ? (
            <TouchableOpacity
              activeOpacity={1}
              onPress={this._clearText}
              style={Styles.buttonClose}>
              <Icon
                name={'ios-close-outline'}
                size={16}
                color={AppColors.white}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  }
}
