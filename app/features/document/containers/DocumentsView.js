import React from 'react';
import {View} from 'react-native';
import Styles from './styles';
import DocumentOverview from '../components/DocumentOverview';
import SectionListView from '../../../components/SectionListView';
import moment from 'moment';
import AppLang from '../../../config/lang';
import * as RootNavigation from '../../../navigation/RootNavigation';

type Props = {
  DocumentsReducer: any,
  showDocumentsError: void,
  getListVBNoiBo: void,
  getFileVBNB: void,
};

class DocumentsView extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  componentDidMount(): void {
    this.props.getListVBNoiBo();
  }

  _onRefresh = () => {
    this.props.getListVBNoiBo();
  };

  _onLoadMore = () => {
    const {requesting} = this.props.DocumentsReducer;
    if (!requesting) {
      this.props.getListVBNoiBo(true);
    }
  };

  _onPressItem = (data) => {
    RootNavigation.navigate('DocumentDetails', {data});
  };

  _onDownLoad = (item) => {
    this.props.getFileVBNB(item.id, item.trichYeu);
  };

  _prepareData() {
    const {results} = this.props.DocumentsReducer.vbnb;
    if ((results ?? []).length === 0) {
      return [];
    }
    const keyGetter = (item) => moment(item.ngayVB).format('YYYY-MM-DD');
    return this._groupByTime(results, keyGetter);
  }

  _groupByTime = (list, keyGetter) => {
    const map = new Map();
    list.forEach((item) => {
      const keyGr = keyGetter(item);
      const collection = map.get(keyGr);
      if (!collection) {
        map.set(keyGr, [item]);
      } else {
        collection.push(item);
      }
    });
    let arr = [];
    for (let [key, value] of map) {
      const title = moment(key).format('DD/MM/YYYY').toUpperCase();
      arr.push({title, data: value});
    }
    return arr;
  };

  render() {
    const {requesting} = this.props.DocumentsReducer;
    return (
      <View style={Styles.container}>
        <SectionListView
          style={Styles.sectionList}
          titleSectionStyle={Styles.sectionListTitle}
          data={this._prepareData()}
          onRefresh={this._onRefresh}
          onLoadMore={this._onLoadMore}
          renderItem={this._renderItem}
          renderItemSeparator={() => <View style={Styles.separatorSection} />}
          emptyText={requesting ? '' : AppLang.screens.document.emptyList}
        />
      </View>
    );
  }

  _renderItem = ({item}) => {
    return (
      <DocumentOverview
        data={item}
        onPress={this._onPressItem}
        onDownload={this._onDownLoad}
      />
    );
  };
}

export default DocumentsView;
