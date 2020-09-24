import React from 'react';
import AppScreen from '../../../components/AppScreen';
import AppColors from '../../../config/colors';
import AppLang from '../../../config/lang';
import HomeButton from '../../../components/HomeButton';
import DocumentsView from './DocumentsView';
import Loader from '../../../components/Loader';
import AppModal from '../../../components/AppModal';
import {connect} from 'react-redux';
import * as actions from '../actions';
import AppStyles from '../../../config/styles';
import {View} from 'react-native';
import DocumentHeader from '../components/DocumentHeader';

type Props = {
  DocumentsReducer: any,
  dismissDocumentsMessage: void,
  changeVBNBFilter: void,
};

class DocumentsContainer extends React.Component<Props> {
  _onSearch = (search) => {
    const filter = {search};
    this.props.changeVBNBFilter(filter);
  };

  render() {
    const {requesting, errorCode, errorMessage} = this.props.DocumentsReducer;
    return (
      <AppScreen
        forceInset={{bottom: 'always', top: 'never'}}
        backgroundColor={AppColors.secondary2}>
        <DocumentHeader
          title={AppLang.screens.document.title}
          onSearch={this._onSearch}
        />
        <DocumentsView {...this.props} />
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
          onConfirm={() => this.props.dismissDocumentsMessage()}
        />
      </AppScreen>
    );
  }
}

export default connect((state) => {
  return {
    DocumentsReducer: state.DocumentsReducer,
  };
}, actions)(DocumentsContainer);
