import React from 'react';
import AppScreen from '../../../components/AppScreen';
import ChangePasswordView from './ChangePasswordView';
import Loader from '../../../components/Loader';
import AppModal from '../../../components/AppModal';
import PageHeader from '../../../components/PageHeader';
import AppLang from '../../../config/lang';
import {connect} from 'react-redux';
import * as actions from '../actions';
import AppColors from '../../../config/colors';

type Props = {
  PasswordReducer: any,
  dismissUpdatePasswordMessage: void,
};

class ChangePasswordContainer extends React.Component<Props> {
  render() {
    const {requesting, errorCode, errorMessage} = this.props.PasswordReducer;
    return (
      <AppScreen backgroundColor={AppColors.secondary2}>
        <PageHeader
          title={AppLang.screens.profile.updatePassword}
          navigation={this.props.navigation}
        />
        <ChangePasswordView {...this.props} />
        <Loader show={requesting} />
        <AppModal
          visible={errorMessage.length > 0}
          icon={'error'}
          showTitle
          title={errorCode}
          message={errorMessage}
          showConfirmButton
          showCancelButton={false}
          onConfirm={() => this.props.dismissUpdatePasswordMessage()}
        />
      </AppScreen>
    );
  }
}

export default connect((state) => {
  return {
    AuthReducer: state.AuthReducer,
    PasswordReducer: state.PasswordReducer,
  };
}, actions)(ChangePasswordContainer);
