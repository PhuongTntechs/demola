import React from 'react';
import AppScreen from '../../../components/AppScreen';
import SalaryListView from './SalaryListView';
import Loader from '../../../components/Loader';
import AppModal from '../../../components/AppModal';
import {connect} from 'react-redux';
import * as actions from '../actions';
import PageHeader from '../../../components/PageHeader';
import AppLang from '../../../config/lang';
import AppColors from '../../../config/colors';

type Props = {
  SalaryReducer: any,
  dismissSalaryMessage: void,
};

class SalaryListContainer extends React.Component<Props> {
  render() {
    const {requesting, errorCode, errorMessage} = this.props.SalaryReducer;
    return (
      <AppScreen
        forceInset={{bottom: 'always', top: 'never'}}
        backgroundColor={AppColors.secondary2}>
        <PageHeader title={AppLang.screens.welcome.functions.salary} />
        <SalaryListView {...this.props} />
        <Loader show={requesting} />
        <AppModal
          visible={errorMessage.length > 0}
          icon={'error'}
          showTitle
          title={errorCode}
          message={errorMessage}
          showConfirmButton
          showCancelButton={false}
          onConfirm={() => this.props.dismissSalaryMessage()}
        />
      </AppScreen>
    );
  }
}

export default connect((state) => {
  return {
    SalaryReducer: state.SalaryReducer,
  };
}, actions)(SalaryListContainer);
