import React from 'react';
import {
  View,
  Text,
  SectionList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import Styles from './styles';
import pixel from '../../lib/pixel';
import AppColors from '../../config/colors';

type Props = {
  data: any,
  style?: any,
  sectionListProps?: any,
  emptyText?: string,
  renderItem: void,
  loading?: boolean,
  loadMore?: boolean,
  onRefresh: void,
  onLoadMore: void,
  headerStyle?: any,
  titleSectionStyle?: any,
  renderItemSeparator?: void,
};

type State = {
  startOffset: number,
};

export default class SectionListView extends React.Component<Props, State> {
  static defaultProps = {
    style: undefined,
    sectionListProps: undefined,
    emptyText: 'No data',
    loading: false,
    loadMore: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      startOffset: 0,
    };
  }

  render() {
    const {
      data,
      onRefresh,
      onLoadMore,
      style,
      sectionListProps,
      renderItem,
      renderItemSeparator,
    } = this.props;
    return (
      <View style={[Styles.container, style]}>
        <SectionList
          ref={(list) => {
            this.list = list;
          }}
          refreshControl={
            onRefresh ? (
              <RefreshControl
                colors={[AppColors.primary]}
                tintColor={AppColors.primary}
                refreshing={false}
                onRefresh={onRefresh}
              />
            ) : null
          }
          sections={data}
          keyExtractor={this._keyExtractor}
          renderItem={renderItem ?? this._renderItem}
          renderSectionHeader={({section: {title}}) => (
            <View style={[Styles.headerSection, this.props.headerStyle]}>
              <Text style={this.props.titleSectionStyle}>{title}</Text>
            </View>
          )}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          stickySectionHeadersEnabled={true}
          {...sectionListProps}
          style={[
            Styles.list,
            sectionListProps ? sectionListProps.style : undefined,
          ]}
          ListFooterComponent={this._renderLoadMoreIndicator()}
          ListEmptyComponent={this._renderListEmpty()}
          ItemSeparatorComponent={
            renderItemSeparator ?? this._ItemSeparatorComponent
          }
          renderSectionFooter={() => <View style={Styles.separator} />}
          onScrollBeginDrag={this._checkBeginScroll}
          scrollEventThrottle={400}
          onScroll={onLoadMore ? this._doLoadMore : undefined}
        />
      </View>
    );
  }

  _checkBeginScroll = (e) => {
    this.setState({
      startOffset: e.nativeEvent.contentOffset.y,
    });
  };

  _isScrollEnd = (e) => {
    const {layoutMeasurement, contentOffset, contentSize} = e.nativeEvent;
    const endOffset = contentOffset.y;
    if (endOffset <= this.state.startOffset) {
      return false;
    }
    const paddingToBottom = pixel(50);
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  _doLoadMore = (e) => {
    const canLoadMore = this._isScrollEnd(e);
    if (canLoadMore) {
      if (this.props.onLoadMore) {
        this.props.onLoadMore();
      }
    }
  };

  _keyExtractor = (item, index) => `${index}_${JSON.stringify(item)}`;

  _renderItem = ({item, index}) => {
    return <View data={item} />;
  };

  _ItemSeparatorComponent = () => {
    return <View style={Styles.separator} />;
  };

  _renderLoadMoreIndicator = () => {
    if (!this.props.onLoadMore || !this.props.loadMore) {
      return null;
    }
    return (
      <View style={Styles.indicator}>
        <ActivityIndicator color={AppColors.primary} size="large" />
      </View>
    );
  };

  _renderListEmpty = () => (
    <View style={Styles.listEmpty}>
      <Text style={Styles.listEmptyText}>{this.props.emptyText}</Text>
    </View>
  );
}
