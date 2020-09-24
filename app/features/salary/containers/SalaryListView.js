import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import Styles from './styles';
import AppBottomModal from '../../../components/AppBottomModal';
import IonIcon from 'react-native-vector-icons/Ionicons';
import AppColors from '../../../config/colors';
import SalaryOverview from '../components/SalaryOverview';
import VerticalList from '../../../components/VerticalList';
import * as RootNavigation from '../../../navigation/RootNavigation';

type Props = {
  getListSalary: void,
};

type State = {
  year: number,
  data: any,
};

const now = new Date().getFullYear();
const years = [
  {id: now, name: `Năm ${now}`},
  {id: now - 1, name: `Năm ${now - 1}`},
  {id: now - 2, name: `Năm ${now - 2}`},
  {id: now - 3, name: `Năm ${now - 3}`},
];

class SalaryListView extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      year: new Date().getFullYear(),
      data: [],
    };
  }

  componentDidMount(): void {
    this.props.getListSalary(this.state.year, (data) => {
      this.setState({data});
    });
  }

  _viewBonusYear = () => {};

  _changeYear = () => this._bottomModal.showModal();

  _onSelectedYear = (year) => {
    if (year.length === 0) {
      return;
    }
    this.setState({year: year[0].id, data: []}, () => {
      this.props.getListSalary(year[0].id, (data) => {
        this.setState({data});
      });
    });
  };

  _viewSalaryDetail = (data) => {
    RootNavigation.navigate('SalaryMonth', {data});
  };

  render() {
    return (
      <View style={Styles.content}>
        <TouchableOpacity activeOpacity={1} onPress={this._changeYear}>
          <View style={Styles.buttonYear}>
            <Text>Chọn năm</Text>
            <Text>{this.state.year}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1} onPress={this._viewBonusYear}>
          <View style={Styles.buttonYear}>
            <Text>Xem thưởng năm</Text>
            <IonIcon
              name={'chevron-forward-outline'}
              size={25}
              color={AppColors.primary}
            />
          </View>
        </TouchableOpacity>
        <View style={Styles.headerList}>
          <View style={Styles.headerCol1}>
            <Text style={Styles.headerText}>Tháng</Text>
          </View>
          <View style={Styles.headerCol2}>
            <Text style={Styles.headerText}>Lương CB</Text>
          </View>
          <View style={Styles.headerCol3}>
            <Text style={Styles.headerText}>Tổng thu nhập</Text>
          </View>
        </View>
        <VerticalList
          data={this.state.data}
          renderItem={this._renderItem}
          renderItemSeparator={() => null}
        />
        <AppBottomModal
          ref={(ref) => (this._bottomModal = ref)}
          allowSearch={false}
          multiple={false}
          enable
          items={years}
          style={Styles.selectField}
          selectedStyle={Styles.selectedField}
          selectedTextStyle={Styles.selectedFieldText}
          selectedItems={this.state.year ? [this.state.year] : []}
          renderSelectedText={(item) => (item ? item.name : '')}
          renderItemText={(item) => (item ? item.name : '')}
          onSelected={this._onSelectedYear}
          checkSelected={(selectedItems, itemToCheck) => {
            return itemToCheck.id === this.state.year;
          }}
        />
      </View>
    );
  }

  _renderItem = ({item}) => {
    return <SalaryOverview data={item} onPress={this._viewSalaryDetail} />;
  };
}

export default SalaryListView;
