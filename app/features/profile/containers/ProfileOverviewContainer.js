import React from 'react';
import ProfileOverviewView from './ProfileOverviewView';
import Loader from '../../../components/Loader';
import AppScreen from '../../../components/AppScreen';
import {connect} from 'react-redux';
import * as actions from '../actions';
import AppModal from '../../../components/AppModal';
import PageHeader from '../../../components/PageHeader';
import AppLang from '../../../config/lang';
import AppColors from '../../../config/colors';

type Props = {
  ProfileReducer: any,
  dismissProfileMessage: void,
};

class ProfileOverviewContainer extends React.Component<Props> {
  render() {
    const {requesting, errorCode, errorMessage} = this.props.ProfileReducer;
    return (
      <AppScreen
        forceInset={{bottom: 'always', top: 'never'}}
        backgroundColor={AppColors.secondary2}>
        <PageHeader
          title={AppLang.screens.profile.title}
          navigation={this.props.navigation}
        />
        <ProfileOverviewView {...this.props} />
        <Loader show={requesting} />
        <AppModal
          visible={errorMessage.length > 0}
          icon={'error'}
          showTitle
          title={errorCode}
          message={errorMessage}
          showConfirmButton
          showCancelButton={false}
          onConfirm={() => this.props.dismissProfileMessage()}
        />
      </AppScreen>
    );
  }
}

export default connect((state) => {
  return {
    AuthReducer: state.AuthReducer,
    ProfileReducer: state.ProfileReducer,
  };
}, actions)(ProfileOverviewContainer);
