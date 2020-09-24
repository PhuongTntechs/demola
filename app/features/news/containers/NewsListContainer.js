import React from 'react';
import AppScreen from '../../../components/AppScreen';
import NewsListView from './NewsListView';
import Loader from '../../../components/Loader';
import AppModal from '../../../components/AppModal';
import {connect} from 'react-redux';
import * as actions from '../actions';
import PageHeader from '../../../components/PageHeader';
import AppLang from '../../../config/lang';
import AppColors from '../../../config/colors';
import HomeButton from '../../../components/HomeButton';

type Props = {
  NewsReducer: any,
  dismissNewsMessage: void,
};

class NewsListContainer extends React.Component<Props> {
  render() {
    const {requesting, errorCode, errorMessage} = this.props.NewsReducer;
    return (
      <AppScreen
        forceInset={{bottom: 'always', top: 'never'}}
        backgroundColor={AppColors.secondary2}>
        <PageHeader
          title={AppLang.screens.welcome.functions.news}
          navLeft={<HomeButton />}
        />
        <NewsListView {...this.props} />
        <Loader show={requesting} />
        <AppModal
          visible={errorMessage.length > 0}
          icon={'error'}
          showTitle
          title={errorCode}
          message={errorMessage}
          showConfirmButton
          showCancelButton={false}
          onConfirm={() => this.props.dismissNewsMessage()}
        />
      </AppScreen>
    );
  }
}

export default connect((state) => {
  return {
    NewsReducer: state.NewsReducer,
  };
}, actions)(NewsListContainer);
