import React from 'react';
import AppScreen from '../../../components/AppScreen';
import HomeView from './HomeView';
import Loader from '../../../components/Loader';
import AppModal from '../../../components/AppModal';
import {connect} from 'react-redux';
import * as actions from '../actions';
import AppStyles from '../../../config/styles';
import {View} from 'react-native';

type Props = {
  HomeReducer: any,
  dismissHomeMessage: void,
};

class HomeContainer extends React.Component<Props> {
  render() {
    const {requesting, errorCode, errorMessage} = this.props.HomeReducer;
    return (
      <View style={AppStyles.flex}>
        <HomeView {...this.props} />
        <Loader show={requesting} />
        <AppModal
          visible={errorMessage.length > 0}
          icon={'error'}
          showTitle
          title={errorCode}
          message={errorMessage}
          showConfirmButton
          showCancelButton={false}
          onConfirm={() => this.props.dismissHomeMessage()}
        />
      </View>
    );
  }
}

export default connect((state) => {
  return {
    AuthReducer: state.AuthReducer,
    HomeReducer: state.HomeReducer,
  };
}, actions)(HomeContainer);
