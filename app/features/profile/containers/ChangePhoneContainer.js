import React from 'react';
import AppScreen from '../../../components/AppScreen';
import ChangePhoneView from './ChangePhoneView';
import Loader from '../../../components/Loader';
import AppModal from '../../../components/AppModal';
import PageHeader from '../../../components/PageHeader';
import AppLang from '../../../config/lang';
import {connect} from 'react-redux';
import * as actions from '../actions';
import AppColors from '../../../config/colors';

type Props = {
  PhoneReducer: any,
  dismissUpdatePhoneMessage: void,
};

class ChangePhoneContainer extends React.Component<Props> {
  render() {
    const {requesting, errorCode, errorMessage} = this.props.PhoneReducer;
    return (
      <AppScreen backgroundColor={AppColors.secondary2}>
        <PageHeader
          title={AppLang.screens.profile.updatePhone}
          navigation={this.props.navigation}
        />
        <ChangePhoneView {...this.props} />
        <Loader show={requesting} />
        <AppModal
          visible={errorMessage.length > 0}
          icon={'error'}
          showTitle
          title={errorCode}
          message={errorMessage}
          showConfirmButton
          showCancelButton={false}
          onConfirm={() => this.props.dismissUpdatePhoneMessage()}
        />
      </AppScreen>
    );
  }
}

export default connect((state) => {
  return {
    AuthReducer: state.AuthReducer,
    PhoneReducer: state.PhoneReducer,
  };
}, actions)(ChangePhoneContainer);
