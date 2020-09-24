import React from 'react';
import AppScreen from '../../../components/AppScreen';
import ChangeEmailView from './ChangeEmailView';
import Loader from '../../../components/Loader';
import AppModal from '../../../components/AppModal';
import PageHeader from '../../../components/PageHeader';
import AppLang from '../../../config/lang';
import {connect} from 'react-redux';
import * as actions from '../actions';
import AppColors from '../../../config/colors';

type Props = {
  navigation: any,
  EmailReducer: any,
  dismissUpdateEmailMessage: void,
};

class ChangeEmailContainer extends React.Component<Props> {
  render() {
    const {requesting, errorCode, errorMessage} = this.props.EmailReducer;
    return (
      <AppScreen backgroundColor={AppColors.secondary2}>
        <PageHeader
          title={AppLang.screens.email.title}
          navigation={this.props.navigation}
        />
        <ChangeEmailView {...this.props} />
        <Loader show={requesting} />
        <AppModal
          visible={errorMessage.length > 0}
          icon={'error'}
          showTitle
          title={errorCode}
          message={errorMessage}
          showConfirmButton
          showCancelButton={false}
          onConfirm={() => this.props.dismissUpdateEmailMessage()}
        />
      </AppScreen>
    );
  }
}

export default connect((state) => {
  return {
    AuthReducer: state.AuthReducer,
    EmailReducer: state.EmailReducer,
  };
}, actions)(ChangeEmailContainer);
