import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Styles from './styles';
import AppLang from '../../../config/lang';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import AppColors from '../../../config/colors';

type Props = {
  route: any,
  DocumentDetailReducer: any,
  getDocumentDetail: void,
  showFileInDetail: void,
};

type State = {
  detail: null,
  files: any,
};

class DocumentDetailsView extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      detail: null,
      files: [],
    };
  }

  componentDidMount(): void {
    const {data} = this.props.route.params;
    this.props.getDocumentDetail(data.id, (detail, files) =>
      this.setState({detail, files}),
    );
  }

  _downloadFile = (file) => {
    const {id, tenTaiLieu} = file;
    this.props.showFileInDetail(id, tenTaiLieu);
  };

  render() {
    const {detail, files} = this.state;
    if (detail === null) {
      return <View style={Styles.content} />;
    }
    console.log(detail);
    return (
      <View style={Styles.content}>
        <View style={Styles.infoRow}>
          <View style={Styles.infoRowLeft}>
            <Text style={Styles.labelText}>
              {AppLang.screens.documentDetails.soCongVan}
            </Text>
          </View>
          <Text style={Styles.labelText}>{detail.soVB}</Text>
        </View>
        <View style={Styles.infoRow}>
          <View style={Styles.infoRowLeft}>
            <Text style={Styles.labelText}>
              {AppLang.screens.documentDetails.ngayCongVan}
            </Text>
          </View>
          <Text style={Styles.labelText}>
            {moment(detail.ngayVB).format('DD/MM/YYYY')}
          </Text>
        </View>
        <View style={Styles.infoRow}>
          <View style={Styles.infoRowLeft}>
            <Text style={Styles.labelText}>
              {AppLang.screens.documentDetails.loaiVanBan}
            </Text>
          </View>
          <Text style={Styles.labelText}>{detail.loaiVanBan}</Text>
        </View>
        <View style={Styles.infoRow}>
          <View style={Styles.infoRowLeft}>
            <Text style={Styles.labelText}>
              {AppLang.screens.documentDetails.nhomVanBan}
            </Text>
          </View>
          <Text style={Styles.labelText}>{detail.nhomVanBan}</Text>
        </View>
        <View style={Styles.infoRow}>
          <View style={Styles.infoRowLeft}>
            <Text style={Styles.labelText}>
              {AppLang.screens.documentDetails.noiBanHanh}
            </Text>
          </View>
          <Text style={Styles.labelText}>{detail.noiBanHanh1}</Text>
        </View>
        <View style={Styles.infoRow}>
          <View style={Styles.infoRowLeft}>
            <Text style={Styles.labelText}>
              {AppLang.screens.documentDetails.nguoiChuTri}
            </Text>
          </View>
          <Text style={Styles.labelText}>{detail.nguoiXuLy}</Text>
        </View>
        <View style={Styles.infoRow}>
          <View style={Styles.infoRowLeft}>
            <Text style={Styles.labelText}>
              {AppLang.screens.documentDetails.doKhan}
            </Text>
          </View>
          <Text style={Styles.labelText}>{detail.doKhan}</Text>
        </View>
        <Text style={Styles.labelText}>
          {AppLang.screens.documentDetails.trichYeu}:
        </Text>
        <Text style={Styles.trichYeuText}>{detail.trichYeu}</Text>
        {files.length > 0 ? (
          <>
            <Text style={Styles.taiLieuText}>
              {AppLang.screens.documentDetails.taiLieu}
            </Text>
            <View style={Styles.filesBloc}>
              {files.map((obj, index) => this._renderFile(obj, index))}
            </View>
          </>
        ) : null}
      </View>
    );
  }

  _renderFile(file, index) {
    return (
      <View style={Styles.fileRow} key={`${index}`}>
        <Text>{file.tenTaiLieu}</Text>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => this._downloadFile(file)}
          style={Styles.buttonFile}>
          <Icon
            name={'cloud-download-outline'}
            size={20}
            color={AppColors.primary}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default DocumentDetailsView;
