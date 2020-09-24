import React from 'react';
import AppScreen from '../../../components/AppScreen';
import HomeWelcomeView from './HomeWelcomeView';
import Loader from '../../../components/Loader';
import AppModal from '../../../components/AppModal';
import {connect} from 'react-redux';
import * as actions from '../actions';
import {doLogout} from '../../auth/actions';
import AppColors from '../../../config/colors';
import {StatusBar} from 'react-native';

type Props = {
  HomeReducer: any,
  dismissHomeMessage: void,
};

class HomeWelcomeContainer extends React.Component<Props> {
  render() {
    const {requesting, errorCode, errorMessage} = this.props.HomeReducer;
    return (
      <AppScreen forceInset={{bottom: 'always', top: 'never'}}>
        <StatusBar
          backgroundColor={AppColors.secondary2}
          barStyle={'light-content'}
        />
        <HomeWelcomeView {...this.props} />
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
      </AppScreen>
    );
  }
}

export default connect(
  (state) => {
    return {
      AuthReducer: state.AuthReducer,
      HomeReducer: state.HomeReducer,
    };
  },
  {...actions, doLogout},
)(HomeWelcomeContainer);
