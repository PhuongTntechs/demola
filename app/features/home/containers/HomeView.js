import React from 'react';
import {View} from 'react-native';
import NavigationTabs from '../../../navigation/NavigationTabs';
import Styles from './styles';

type Props = {};

type State = {};

export default class HomeView extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount(): void {
    const {func} = this.props.route.params ?? {};
    if (func && func.id !== 1) {
      setTimeout(() => {
        this._navigate(func);
      }, 300);
    }
  }

  _navigate = (func) => {
    const navigation = this.props.navigation;
    navigation.navigate('Home', {screen: func.screen});
  };

  render() {
    return (
      <View style={Styles.flex}>
        <NavigationTabs />
      </View>
    );
  }
}
