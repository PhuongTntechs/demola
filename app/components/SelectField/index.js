import React from 'react';
import debounce from 'lodash.debounce';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Styles from './styles';
import Icons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import AppStyles from '../../config/styles';
import AppColors from '../../config/colors';
import AppButton from '../AppButton';
import {AppTextInput} from '../AppInputs';

type Props = {
  label?: string,
  searchLabel?: string,
  searchPlaceholder?: string,
  placeholder?: string,
  errorMessage?: string,
  allowSearch?: boolean,
  items?: any,
  remote?: any, //{url, transform}
  onSelected?: any,
  style?: any,
  multiple?: boolean,
  selectedItems?: any,
  renderSelectedText?: any,
  renderItemText?: any,
  checkSelected?: any,
  onSubmitKeyword?: any,
  separatorSelectedText?: string,
  dontDetectDeepLink?: boolean,
};

type State = {
  showModal: boolean,
  keyword: string,
  remoteItems: string,
  requesting: boolean,
};

const defaultSelectProps = {
  label: '',
  searchLabel: 'Keyword to search',
  searchPlaceholder: 'Enter keyword to search...',
  placeholder: '',
  errorMessage: null,
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
  dontDetectDeepLink: false,
};

export default class SelectField extends React.PureComponent<Props, State> {
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

  _showModal = () => {
    this.setState({showModal: true});
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

  _keyExtractor = (item, index) => {
    return `${index}}`;
  };

  _getValueText = () => {
    const {
      selectedItems,
      renderSelectedText,
      separatorSelectedText,
    } = this.props;
    let text = '';
    if (selectedItems.length) {
      selectedItems.forEach((item, index) => {
        if (index > 0) {
          text = text + separatorSelectedText;
        }
        const txt = renderSelectedText(item, index);
        text = text + '' + txt;
      });
    }
    return text;
  };

  _search = () => {
    const {remote} = this.props;
    const isRemote = remote.fetchFunc !== null;
    if (isRemote) {
      this.debounceFunc();
    }
  };

  _requestSearch = () => {
    const {remote, remotePassive} = this.props;
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
      style,
      label,
      searchLabel,
      errorMessage,
      placeholder,
      searchPlaceholder,
      allowSearch,
      items,
      selectedItems,
      multiple,
      renderItemText,
      remote,
      onSubmitKeyword,
    } = this.props;
    const isRemote = remote.fetchFunc !== null;
    const value = this._getValueText();
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
      <View style={[Styles.container, style]}>
        {label && label.length > 0 && errorMessage ? (
          <View style={Styles.labelWrapper}>
            <Text style={Styles.label}>{label}</Text>
            {this.props.errorMessage ? (
              <Text style={Styles.error}>
                {this.props.errorMessage}
                {'  '}
                <Icons name={'md-information-circle-outline'} />
              </Text>
            ) : null}
          </View>
        ) : null}
        <View style={Styles.inputNoText}>
          {value ? (
            <Text numberOfLines={1} style={Styles.inputText}>
              {value}
            </Text>
          ) : (
            <Text
              numberOfLines={1}
              style={[Styles.inputText, Styles.inputTextPH]}>
              {placeholder}
            </Text>
          )}
        </View>
        <TouchableOpacity onPress={this._showModal} style={Styles.pressZone} />
        <View style={Styles.dropIconBlock}>
          <Icons name={'caret-down'} style={Styles.dropIcon} />
        </View>
        <Modal
          avoidKeyboard
          isVisible={showModal}
          backdropTransitionOutTiming={0}
          onBackButtonPress={this._hideModal}
          onBackdropPress={this._hideModal}
          onModalShow={this._showKeyboard}
          style={Styles.modalWrapper}>
          <View style={[Styles.modal, allowSearch && Styles.modalSearch]}>
            {allowSearch ? (
              <AppTextInput
                value={keyword}
                inputProps={{
                  selectTextOnFocus: true,
                  ref: (ref) => {
                    this.searchInput = ref;
                  },
                  onChangeText: (val) => {
                    this.setState({keyword: val}, this._search);
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
                keyboardDismissMode={'none'}
                keyboardShouldPersistTaps={'handled'}
                style={Styles.selectList}
                contentContainerStyle={Styles.selectListWrapper}
                data={itemList}
                extraData={selectedItems}
                renderItem={this._renderItem}
                keyExtractor={this._keyExtractor}
              />
              {multiple ? (
                <AppButton
                  colorSet={'grey'}
                  style={Styles.selectDone}
                  onPress={this._hideModal}
                  label={'Done'}
                />
              ) : null}
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
