import React from 'react';
import Styles from './styles';
import AuthForgotView from './AuthForgotView';
import Loader from '../../../components/Loader';
import AppScreen from '../../../components/AppScreen';
import {connect} from 'react-redux';
import * as actions from '../actions';
import AppModal from '../../../components/AppModal';

type Props = {
  ForgotReducer: any,
  dismissForgotMessage: void,
};

class AuthForgotContainer extends React.Component<Props> {
  render() {
    const {requesting, errorCode, errorMessage} = this.props.ForgotReducer;
    return (
      <AppScreen style={Styles.container}>
        <AuthForgotView {...this.props} />
        <Loader show={requesting} />
        <AppModal
          visible={errorMessage.length > 0}
          icon={'error'}
          showTitle
          title={errorCode}
          message={errorMessage}
          showConfirmButton
          showCancelButton={false}
          onConfirm={() => this.props.dismissForgotMessage()}
        />
      </AppScreen>
    );
  }
}

export default connect((state) => {
  return {
    ForgotReducer: state.ForgotReducer,
  };
}, actions)(AuthForgotContainer);
