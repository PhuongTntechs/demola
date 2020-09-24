import React from 'react';
import DocumentDetailsView from './DocumentDetailsView';
import Loader from '../../../components/Loader';
import AppScreen from '../../../components/AppScreen';
import {connect} from 'react-redux';
import * as actions from '../actions';
import AppModal from '../../../components/AppModal';
import PageHeader from '../../../components/PageHeader';
import AppLang from '../../../config/lang';
import AppColors from '../../../config/colors';

type Props = {
  navigation: any,
  DocumentDetailReducer: any,
  dismissDocumentDetailMessage: void,
};

class DocumentDetailsContainer extends React.Component<Props> {
  render() {
    const {
      requesting,
      errorCode,
      errorMessage,
    } = this.props.DocumentDetailReducer;
    return (
      <AppScreen
        forceInset={{bottom: 'always', top: 'never'}}
        backgroundColor={AppColors.secondary2}>
        <PageHeader
          title={AppLang.screens.document.details}
          navigation={this.props.navigation}
        />
        <DocumentDetailsView {...this.props} />
        <Loader show={requesting} />
        <AppModal
          visible={errorMessage.length > 0}
          icon={'error'}
          showTitle
          title={errorCode}
          message={errorMessage}
          showConfirmButton
          showCancelButton={false}
          onConfirm={() => this.props.dismissDocumentDetailMessage()}
        />
      </AppScreen>
    );
  }
}

export default connect((state) => {
  return {
    DocumentDetailReducer: state.DocumentDetailReducer,
  };
}, actions)(DocumentDetailsContainer);
