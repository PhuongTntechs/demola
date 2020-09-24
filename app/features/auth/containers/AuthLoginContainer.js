import React from 'react';
import Styles from './styles';
import AuthLoginView from './AuthLoginView';
import Loader from '../../../components/Loader';
import AppScreen from '../../../components/AppScreen';
import {connect} from 'react-redux';
import * as actions from '../actions';
import AppModal from '../../../components/AppModal';

type Props = {
  LoginReducer: any,
  dismissLoginMessage: void,
};

class AuthLoginContainer extends React.Component<Props> {
  render() {
    const {requesting, errorCode, errorMessage} = this.props.LoginReducer;
    return (
      <AppScreen style={Styles.container}>
        <AuthLoginView {...this.props} />
        <Loader show={requesting} />
        <AppModal
          visible={errorMessage.length > 0}
          icon={'error'}
          showTitle
          title={errorCode}
          message={errorMessage}
          showConfirmButton
          showCancelButton={false}
          onConfirm={() => this.props.dismissLoginMessage()}
        />
      </AppScreen>
    );
  }
}

export default connect((state) => {
  return {
    LoginReducer: state.LoginReducer,
  };
}, actions)(AuthLoginContainer);
