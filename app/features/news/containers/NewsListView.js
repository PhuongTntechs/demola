import React from 'react';
import {View} from 'react-native';
import Styles from './styles';
import VerticalList from '../../../components/VerticalList';
import NewsOverview from '../components/NewsOverview';
import AppLang from '../../../config/lang';
import * as RootNavigation from '../../../navigation/RootNavigation';

type Props = {
  NewsReducer: any,
  getListNews: void,
};

class NewsListView extends React.Component<Props> {
  componentDidMount(): void {
    this.props.getListNews();
  }

  _onRefresh = () => this.props.getListNews();

  _onLoadMore = () => {
    const {requesting} = this.props.NewsReducer;
    if (!requesting) {
      this.props.getListNews(true);
    }
  };

  _onPressNews = (news) => RootNavigation.navigate('NewsDetail', {news});

  _onSetRateNews = (news, rate) => this.props.onChangeRate(news.id, rate);

  render() {
    const {results} = this.props.NewsReducer.data;
    return (
      <View style={Styles.container}>
        <VerticalList
          flatListProps={{style: Styles.flatList}}
          data={results ?? []}
          renderItem={this._renderItem}
          onRefresh={this._onRefresh}
          onLoadMore={this._onLoadMore}
          emptyText={AppLang.screens.news.empty}
          renderItemSeparator={() => <View style={Styles.separator} />}
        />
      </View>
    );
  }

  _renderItem = ({item}) => (
    <NewsOverview
      data={item}
      onPress={this._onPressNews}
      onSetRate={this._onSetRateNews}
    />
  );
}

export default NewsListView;
