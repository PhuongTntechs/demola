import React from 'react';
import {View, Text, Platform, PermissionsAndroid} from 'react-native';
import Styles, {pdf} from './styles';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Pdf from 'react-native-pdf';
import AppLang from '../../../config/lang';
import AppButton from '../../../components/AppButton';
import RNFetchBlob from 'rn-fetch-blob';

type Props = {
  route: any,
  getSalaryMonth: void,
  showSalaryMonthError: void,
};

type State = {
  data: any,
  pdf: any,
};

class SalaryMonthView extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      pdf: null,
    };
  }

  componentDidMount(): void {
    this._requestWriteFile();
  }

  _requestWriteFile = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);
      if (
        granted[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] ===
          PermissionsAndroid.RESULTS.GRANTED
      ) {
        this._getDetail();
      } else {
        this.props.showSalaryMonthError(
          'SAL_00',
          AppLang.screens.salary.notAllowAccessStorage,
        );
      }
    } else {
      this._getDetail();
    }
  };

  _getDetail = () => {
    const {thang, nam} = this.props.route.params.data;
    this.props.getSalaryMonth(thang, nam, ({detail}) => {
      let options = {
        fileName: `bangluong_${thang}_${nam}`,
        directory: 'Documents',
        html: detail,
        padding: 0,
        width: 595,
        height: 960, //842,
        fitWidth: true,
        fitPolicy: 0,
      };
      setTimeout(async () => {
        let pdf = await RNHTMLtoPDF.convert(options);
        this.setState({
          pdf,
          data: detail,
        });
        console.log(pdf);
      }, 500);
    });
  };

  _exportPDF = async () => {
    if (Platform.OS === 'ios') {
      await RNFetchBlob.ios.openDocument(this.state.pdf.filePath);
    } else {
      await RNFetchBlob.android.actionViewIntent(
        this.state.pdf.filePath,
        'application/pdf',
      );
    }
  };

  render() {
    const {thang, nam} = this.props.route.params.data;
    const {trangThai} = this.state.data ?? {};
    return (
      <View style={Styles.container}>
        <View style={Styles.detailHeader}>
          <Text style={Styles.headerDetailText}>
            {AppLang.screens.salary.details.toUpperCase()} THÁNG {thang}/{nam}
          </Text>
        </View>
        <View style={pdf.pdfViewer}>
          {this.state.pdf ? (
            <View style={pdf.pdfWrapper}>
              <Pdf
                onError={(error) => {
                  console.log(error);
                }}
                onLoadComplete={(numberOfPages, filePath) => {
                  console.log(`number of pages: ${numberOfPages}`);
                }}
                spacing={0}
                fitWidth
                style={pdf.pdf}
                source={{
                  uri: 'file://' + this.state.pdf.filePath,
                }}
              />
            </View>
          ) : null}
        </View>
        {this.state.pdf && trangThai === 5 ? (
          <AppButton
            label={AppLang.screens.salary.exportPDF}
            onPress={this._exportPDF}
            style={pdf.action}
          />
        ) : null}
      </View>
    );
  }
}

export default SalaryMonthView;
