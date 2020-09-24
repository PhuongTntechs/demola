import React from 'react';
import Styles from './styles';
import {
  Platform,
  StatusBar,
  Text,
  View,
  Animated,
  Easing,
  TextInput,
} from 'react-native';
import AppColors from '../../../../config/colors';
import SafeAreaView from 'react-native-safe-area-view';
import HomeButton from '../../../../components/HomeButton';
import {IconToggle} from 'react-native-material-ui/src';
import AppLang from '../../../../config/lang';
import AppStyles from '../../../../config/styles';

type Props = {};

export default class DocumentHeaderOld extends React.PureComponent<Props> {
  static defaultProps = {
    colorSet: 'primary',
    backOverwrite: null,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {isSearchActive: false, searchValue: ''};
  }

  onSearchPressed = () => {
    this.setState({isSearchActive: true});
  };
  onSearchTextChanged = (searchValue) => {
    this.setState({searchValue});
  };
  onSearchClearPressed = () => {
    this.onSearchTextChanged('');
  };
  onSearchClosed = () => {
    this.setState({isSearchActive: false, searchValue: ''});
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
    const {isSearchActive, searchValue} = this.state;
    return (
      <View
        style={[
          Styles.container,
          isSearchActive && {backgroundColor: 'white'},
        ]}>
        <StatusBar
          backgroundColor={AppColors.secondary2}
          barStyle={'light-content'}
        />
        <LeftElement
          isSearchActive={isSearchActive}
          onSearchClose={this.onSearchClosed}
        />
        <CenterElement
          title={AppLang.screens.document.title}
          isSearchActive={isSearchActive}
          onSearchTextChange={this.onSearchTextChanged}
          searchValue={searchValue}
        />
        <RightElement
          isSearchActive={isSearchActive}
          onSearchPress={this.onSearchPressed}
          searchValue={searchValue}
          onSearchClear={this.onSearchClearPressed}
        />
      </View>
    );
  }
}

class LeftElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leftElement: 'menu',
      spinValue: new Animated.Value(0),
    };
  }

  componentDidUpdate(prevProps): void {
    if (!prevProps.isSearchActive && this.props.isSearchActive) {
      this.animate({toValue: 1, leftElement: 'arrow-forward'});
    }
    // goes to default look
    if (prevProps.isSearchActive && !this.props.isSearchActive) {
      this.animate({toValue: 0, leftElement: 'menu'});
    }
  }

  animate = ({toValue, leftElement}) => {
    Animated.timing(this.state.spinValue, {
      toValue: 0.5,
      duration: 112,
      easing: Easing.linear,
      useNativeDriver: Platform.OS === 'android',
    }).start(() => {
      this.setState({leftElement});

      Animated.timing(this.state.spinValue, {
        toValue,
        duration: 112,
        easing: Easing.linear,
        useNativeDriver: Platform.OS === 'android',
      }).start();
    });
  };

  render() {
    const {leftElement, spinValue} = this.state;
    const {isSearchActive, onSearchClose} = this.props;
    const spin = spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    });
    return (
      <Animated.View style={[Styles.navLeft, {transform: [{rotate: spin}]}]}>
        <IconToggle
          name={leftElement}
          color={isSearchActive ? AppColors.primary : 'white'}
          onPress={onSearchClose}
        />
      </Animated.View>
    );
  }
}

class RightElement extends React.Component {
  render() {
    const {
      onSearchPress,
      onSearchClear,
      isSearchActive,
      searchValue,
    } = this.props;

    if (isSearchActive && searchValue.length === 0) {
      return null;
    }

    const iconProps = {};

    if (isSearchActive && searchValue.length > 0) {
      iconProps.name = 'clear';
      iconProps.color = AppColors.white;
      iconProps.onPress = onSearchClear;
    } else {
      iconProps.name = 'search';
      iconProps.color = 'white';
      iconProps.onPress = onSearchPress;
    }

    return (
      <View style={Styles.navLeft}>
        <IconToggle {...iconProps} />
      </View>
    );
  }
}

class CenterElement extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      textInput: props.isSearchActive,
      opacityValue: new Animated.Value(1),
    };
  }

  componentDidUpdate(prevProps): void {
    if (prevProps.isSearchActive !== this.props.isSearchActive) {
      this.animateElements(this.props.isSearchActive);
    }
  }

  animateElements = (nextIsSearchActive) => {
    Animated.timing(this.state.opacityValue, {
      toValue: 0,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: Platform.OS === 'android',
    }).start(() => {
      this.setState({
        textInput: nextIsSearchActive,
      });

      Animated.timing(this.state.opacityValue, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: Platform.OS === 'android',
      }).start();
    });
  };

  render() {
    const {title, onSearchTextChange, searchValue, isSearchActive} = this.props;
    const {opacityValue, textInput} = this.state;
    const color = isSearchActive ? AppColors.lightGrey : 'white';
    let content = <Text style={[Styles.headerTitle, {color}]}>{title}</Text>;
    if (textInput) {
      content = <TextInput style={Styles.searchInput} value={searchValue} />;
    }
    return (
      <Animated.View style={[centerStyle, {opacity: opacityValue}]}>
        {content}
      </Animated.View>
    );
  }
}

const centerStyle = {
  flex: 1,
  //alignItems: 'center',
  justifyContent: 'center',
};
