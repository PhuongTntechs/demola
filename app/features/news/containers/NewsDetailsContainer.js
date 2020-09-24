import React from 'react';
import AppScreen from '../../../components/AppScreen';
import NewsDetailsView from './NewsDetailsView';
import Loader from '../../../components/Loader';
import AppModal from '../../../components/AppModal';
import {connect} from 'react-redux';
import * as actions from '../actions';
import PageHeader from '../../../components/PageHeader';
import AppLang from '../../../config/lang';
import AppColors from '../../../config/colors';

type Props = {
  NewsDetailsReducer: any,
  dismissNewsDetailMessage: void,
};

class NewsDetailsContainer extends React.Component<Props> {
  render() {
    const {requesting, errorCode, errorMessage} = this.props.NewsDetailsReducer;
    return (
      <AppScreen
        forceInset={{bottom: 'always', top: 'never'}}
        backgroundColor={AppColors.secondary2}>
        <PageHeader
          title={AppLang.screens.news.detailTitle}
          navigation={this.props.navigation}
        />
        <NewsDetailsView {...this.props} />
        <Loader show={requesting} />
        <AppModal
          visible={errorMessage.length > 0}
          icon={'error'}
          showTitle
          title={errorCode}
          message={errorMessage}
          showConfirmButton
          showCancelButton={false}
          onConfirm={() => this.props.dismissNewsDetailMessage()}
        />
      </AppScreen>
    );
  }
}

export default connect((state) => {
  return {
    AuthReducer: state.AuthReducer,
    NewsDetailsReducer: state.NewsDetailsReducer,
  };
}, actions)(NewsDetailsContainer);
