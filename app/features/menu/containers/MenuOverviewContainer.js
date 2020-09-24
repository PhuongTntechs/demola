import React from 'react';
import MenuOverviewView from './MenuOverviewView';
import Loader from '../../../components/Loader';
import AppScreen from '../../../components/AppScreen';
import {connect} from 'react-redux';
import * as actions from '../actions';
import {doLogout} from '../../auth/actions';
import AppModal from '../../../components/AppModal';
import AppColors from '../../../config/colors';
import AppLang from '../../../config/lang';
import PageHeader from '../../../components/PageHeader';
import HomeButton from '../../../components/HomeButton';
import AppStyles from '../../../config/styles';
import {View} from 'react-native';

type Props = {
  MenuReducer: any,
  dismissMenuMessage: void,
};

class MenuOverviewContainer extends React.Component<Props> {
  render() {
    const {requesting, errorCode, errorMessage} = this.props.MenuReducer;
    return (
      <AppScreen
        forceInset={{bottom: 'always', top: 'never'}}
        backgroundColor={AppColors.secondary2}>
        <PageHeader
          title={AppLang.screens.menu.title}
          navLeft={<HomeButton />}
        />
        <MenuOverviewView {...this.props} />
        <View style={AppStyles.bottomTab} />
        <Loader show={requesting} />
        <AppModal
          visible={errorMessage.length > 0}
          icon={'error'}
          showTitle
          title={errorCode}
          message={errorMessage}
          showConfirmButton
          showCancelButton={false}
          onConfirm={() => this.props.dismissMenuMessage()}
        />
      </AppScreen>
    );
  }
}

export default connect(
  (state) => {
    return {
      AuthReducer: state.AuthReducer,
      MenuReducer: state.MenuReducer,
    };
  },
  {...actions, doLogout},
)(MenuOverviewContainer);
