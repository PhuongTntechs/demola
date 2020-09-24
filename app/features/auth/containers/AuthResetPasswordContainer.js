import React from 'react';
import AppScreen from '../../../components/AppScreen';
import Styles from './styles';
import AuthResetPasswordView from './AuthResetPasswordView';
import Loader from '../../../components/Loader';
import AppModal from '../../../components/AppModal';
import {connect} from 'react-redux';
import * as actions from '../actions';

type Props = {
  ResetPasswordReducer: any,
  dismissResetMessage: void,
};

class AuthResetPasswordContainer extends React.Component<Props> {
  render() {
    const {
      requesting,
      errorCode,
      errorMessage,
    } = this.props.ResetPasswordReducer;
    return (
      <AppScreen style={Styles.container}>
        <AuthResetPasswordView {...this.props} />
        <Loader show={requesting} />
        <AppModal
          visible={errorMessage.length > 0}
          icon={'error'}
          showTitle
          title={errorCode}
          message={errorMessage}
          showConfirmButton
          showCancelButton={false}
          onConfirm={() => this.props.dismissResetMessage()}
        />
      </AppScreen>
    );
  }
}

export default connect((state) => {
  return {
    ResetPasswordReducer: state.ResetPasswordReducer,
  };
}, actions)(AuthResetPasswordContainer);
