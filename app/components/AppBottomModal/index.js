import React from 'react';
import Styles from './styles';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AppStyles from '../../config/styles';
import AppColors from '../../config/colors';
import AppButton from '../AppButton';
import Modal from 'react-native-modal';
import {AppTextInput} from '../AppInputs';
import debounce from 'lodash.debounce';

type Props = {
  allowSearch: boolean,
  enable?: boolean,
  searchLabel?: string,
  searchPlaceholder?: string,
  items?: any,
  remote?: any, //{url, transform}
  onSelected?: any,
  style?: any,
  modalStyle?: any,
  selectedStyle?: any,
  multiple?: boolean,
  selectedItems?: any,
  renderSelectedText?: any,
  selectedTextStyle?: any,
  renderItemText?: any,
  checkSelected?: any,
  onSubmitKeyword?: any,
  separatorSelectedText?: string,
};

type State = {
  showModal: boolean,
  keyword: string,
  remoteItems: string,
  requesting: boolean,
};

const defaultSelectProps = {
  enable: true,
  searchLabel: 'Tìm kiếm',
  searchPlaceholder: 'Nhập từ khoá để tìm kiếm...',
  allowSearch: false,
  items: [],
  multiple: false,
  selectedItems: [],
  onSelected: (selectedItems, selectedItem, index) => {},
  style: {},
  renderItemText: (item, index) => {
    return 'Item ' + index;
  },
  renderSelectedText: (selectedItem, index) => {
    return 'Item ' + index;
  },
  selectedTextStyle: {},
  checkSelected: (selectedItems, itemToCheck) => {
    return false;
  },
  remote: {
    fetchFunc: null,
    transformFunc: null,
  },
  remotePassive: false,
  onSubmitKeyword: (keyword) => {},
  separatorSelectedText: ', ',
};

export default class AppBottomModal extends React.Component<Props, State> {
  static defaultProps = defaultSelectProps;

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      keyword: '',
      remoteItems: [],
      requesting: false,
    };
    this.debounceFunc = debounce(this._requestSearch, 500);
  }

  showModal = () => {
    if (this.props.enable) {
      this.setState({showModal: true});
    }
  };

  _showModal = () => {
    if (this.props.enable) {
      this.setState({showModal: true});
    }
  };

  _hideModal = () => {
    this.setState({showModal: false});
  };

  _showKeyboard = () => {
    if (this.searchInput) {
      this.searchInput.focus();
    }
  };

  _onSelected = (item, index) => {
    const {selectedItems, checkSelected, multiple, onSelected} = this.props;
    let newSelectedItems = [];
    let exist = checkSelected(selectedItems, item);
    //
    if (!multiple) {
      if (!exist) {
        newSelectedItems.push(item);
      }
      onSelected(newSelectedItems, item, index);
      this._hideModal();
      return;
    }
    //
    newSelectedItems = selectedItems.filter((it) => {
      return !checkSelected([{...item}], it);
    });
    if (!exist) {
      newSelectedItems.push(item);
    }
    onSelected([...newSelectedItems], item, index);
  };

  _renderItem = ({item, index}) => {
    const {renderItemText, selectedItems, checkSelected} = this.props;
    const active = checkSelected(selectedItems, item);
    return (
      <View style={[Styles.selectItem, active && Styles.selectItemActive]}>
        <TouchableOpacity
          onPress={() => {
            this._onSelected(item, index);
          }}
          style={Styles.selectItemWrapper}>
          <Text style={Styles.selectItemText}>
            {renderItemText(item, index)}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  _keyExtractor = (item, index) => `${item.id}.${index}}`;

  _search = () => {
    const {remote} = this.props;
    const isRemote = remote.fetchFunc !== null;
    if (isRemote) {
      this.debounceFunc();
    }
  };

  _requestSearch = () => {
    const {remote} = this.props;
    const {keyword, remoteItems} = this.state;
    const keywordText = keyword.trim();
    if (keywordText.length < 3) {
      this.setState({
        remoteItems: [],
      });
      return;
    }
    const {fetchFunc, transformFunc} = remote;
    let transformedData = remoteItems;
    this.setState(
      {
        requesting: true,
      },
      async () => {
        try {
          const rq = await fetchFunc(keywordText);
          const {data} = rq;
          // console.log(data);
          transformedData = transformFunc(data);
        } catch (e) {
          console.log(e);
        } finally {
          this.setState({
            remoteItems: transformedData,
            requesting: false,
          });
        }
      },
    );
  };

  render() {
    const {showModal, keyword, remoteItems, requesting} = this.state;
    const {
      searchLabel,
      searchPlaceholder,
      allowSearch,
      items,
      selectedItems,
      multiple,
      renderItemText,
      remote,
      onSubmitKeyword,
      modalStyle,
    } = this.props;
    const isRemote = remote.fetchFunc !== null;
    let keywordText = keyword.trim();
    let keywordTextLow = keywordText.toLowerCase();
    let itemList = [];
    if (isRemote) {
      itemList = remoteItems;
    } else {
      itemList = keywordTextLow
        ? items.filter((it, idx) => {
            const text = renderItemText(it, idx).toLowerCase();
            return text.includes(keywordTextLow);
          })
        : items;
    }
    return (
      <Modal
        avoidKeyboard
        isVisible={showModal}
        backdropTransitionOutTiming={0}
        onBackButtonPress={this._hideModal}
        onBackdropPress={this._hideModal}
        onModalShow={this._showKeyboard}
        useNativeDriver
        style={Styles.modalWrapper}>
        <View
          style={[Styles.modal, allowSearch && Styles.modalSearch, modalStyle]}>
          {allowSearch ? (
            <AppTextInput
              value={keyword}
              inputProps={{
                selectTextOnFocus: true,
                ref: (ref) => {
                  this.searchInput = ref;
                },
                onChangeText: (text) => {
                  this.setState({text}, this._search);
                },
                onSubmitEditing: () => {
                  onSubmitKeyword(keyword);
                },
              }}
              label={searchLabel}
              placeholder={searchPlaceholder}
            />
          ) : null}
          <View style={AppStyles.flex}>
            {requesting ? (
              <View style={Styles.dateOverlay}>
                <ActivityIndicator color={AppColors.primary} />
              </View>
            ) : null}
            <FlatList
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              keyboardDismissMode={'none'}
              keyboardShouldPersistTaps={'handled'}
              style={Styles.selectList}
              data={itemList}
              extraData={selectedItems}
              renderItem={this._renderItem}
              keyExtractor={this._keyExtractor}
            />
            {multiple ? (
              <AppButton
                style={Styles.selectDone}
                onPress={this._hideModal}
                label={'Done'}
              />
            ) : null}
          </View>
        </View>
      </Modal>
    );
  }
}
