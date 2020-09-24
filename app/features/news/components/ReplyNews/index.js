import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View, Image} from 'react-native';
import AppColors from '../../../../config/colors';
import AppLang from '../../../../config/lang';
import Styles from './styles';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AppImages from '../../../../config/imges';
import {canAcceptComment} from '../../../../lib/permissions';

interface Props {
  user: any;
  setParent: void;
  sendMessage: void;
  style?: any;
}

const ReplyNews = (props: Props) => {
  const [text, setMessage] = useState('');
  const [parent, setParent] = useState(null);

  const _sendMessage = () => {
    const {maNS, hoDem, ten, avatarUrl} = props.user;
    const parentId = parent
      ? parent.parentId > 0
        ? parent.parentId
        : parent.id
      : 0;
    const obj = {
      createTime: new Date().getTime(),
      avatarUrl,
      maNS,
      hoTen: `${hoDem} ${ten}`,
      noiDung: text.trim(),
      parentId,
      child: 0,
      duyet: canAcceptComment() || parentId > 0,
    };
    if (props.sendMessage) {
      props.sendMessage(obj, () => {
        setMessage('');
        setParent(null);
      });
    } else {
      setMessage('');
      setParent(null);
    }
  };

  props.setParent((parentObj) => setParent(parentObj));

  const _renderUserAvatar = () => {
    const {avatarUrl} = props.user;
    const source =
      avatarUrl && avatarUrl.length > 0 ? {uri: avatarUrl} : AppImages.userIcon;
    return (
      <View style={Styles.avatarBloc}>
        <Image source={source} style={Styles.avatar} resizeMode={'contain'} />
      </View>
    );
  };

  return (
    <View style={[Styles.container, props.style]}>
      <View style={Styles.content}>
        {parent ? (
          <View style={Styles.parentBloc}>
            <Text style={Styles.parentText}>
              {AppLang.screens.news.replying}{' '}
              <Text style={Styles.parentUser}>{parent.hoTen ?? ''}</Text>
            </Text>
            <TouchableOpacity activeOpacity={1} onPress={() => setParent(null)}>
              <AwesomeIcon name={'close'} size={20} color={AppColors.red} />
            </TouchableOpacity>
          </View>
        ) : null}
        <View style={Styles.innerContent}>
          {_renderUserAvatar()}
          <TextInput
            style={Styles.input}
            autoCorrect
            spellCheck
            textAlignVertical={'top'}
            underlineColorAndroid={'transparent'}
            placeholderTextColor={AppColors.lightGrey}
            placeholder={AppLang.screens.news.enterMessage}
            value={text}
            onChangeText={(value) => setMessage(value)}
            multiline
            maxLength={250}
          />
          {text.length > 0 ? (
            <TouchableOpacity
              activeOpacity={1}
              onPress={_sendMessage}
              style={Styles.buttonSend}>
              <AwesomeIcon
                name={'send'}
                size={20}
                color={AppColors.secondary}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default ReplyNews;
