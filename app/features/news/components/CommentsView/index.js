import React, {useState} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Styles from './styles';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AppImages from '../../../../config/imges';
import HyperText from '../../../../lib/HyperText';
import AppColors from '../../../../config/colors';
import moment from 'moment';
import AppLang from '../../../../config/lang';
import {canDeleteComment} from '../../../../lib/permissions';

interface Props {
  user: any;
  data: any;
  child: any;
  onGetChild: void;
  onReply: void;
  onDelete: void;
}

const CommentsView = (props: Props) => {
  const _onGetChild = (id, onSuccess) => {
    if (props.onGetChild) {
      props.onGetChild(id, onSuccess);
    }
  };

  const _onReply = (parent) => {
    if (props.onReply) {
      props.onReply(parent);
    }
  };

  const _onDelete = (comment) => {
    if (props.onDelete) {
      props.onDelete(comment);
    }
  };

  return (
    <View style={Styles.container}>
      {(props.data ?? []).map((obj, index) => (
        <Comment
          user={props.user}
          data={obj}
          key={`${index}_${obj.id}`}
          child={props.child[obj.id] ?? []}
          onGetChild={_onGetChild}
          onReply={_onReply}
          onDelete={_onDelete}
        />
      ))}
    </View>
  );
};

interface CommentProps {
  user: any;
  data: any;
  child: any;
  onGetChild?: void;
  onReply: void;
  onDelete: void;
}

const Comment = (props: CommentProps) => {
  const [showChild, toggleChild] = useState(false);
  const [requesting, toggleRequest] = useState(false);

  const _onReply = () => {
    if (props.onReply) {
      props.onReply(props.data);
    }
  };

  const _onDelete = () => {
    if (props.onDelete) {
      props.onDelete(props.data);
    }
  };

  const _onShowChild = () => {
    if (!props.child || props.child.length === 0) {
      if (props.onGetChild) {
        toggleRequest(true);
        props.onGetChild(props.data.id, () => toggleRequest(false));
      }
    }
    toggleChild(true);
  };

  const _onHideChild = () => {
    toggleChild(false);
  };

  const _canDelete = () => {
    return props.data.maNS === props.user.maNS || canDeleteComment();
  };

  const userAvatar = () => {
    const {avatarUrl} = props.data;
    if (!avatarUrl || avatarUrl.length === 0) {
      return (
        <View style={Styles.avatarBloc}>
          <Image
            source={AppImages.userIcon}
            style={Styles.avatar}
            resizeMode={'contain'}
          />
        </View>
      );
    }
    return (
      <View style={Styles.avatarBloc}>
        <Image
          source={{uri: avatarUrl}}
          style={Styles.avatar}
          resizeMode={'contain'}
        />
      </View>
    );
  };

  const _renderChild = () => {
    if (!showChild) {
      return (
        <View style={Styles.childBloc}>
          <TouchableOpacity activeOpacity={1} onPress={_onShowChild}>
            <Text>Show {props.data.child} comments</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View style={Styles.childBloc}>
        <TouchableOpacity activeOpacity={1} onPress={_onHideChild}>
          <Text>Hide {props.data.child} comments</Text>
        </TouchableOpacity>
        {(props.child ?? []).map((obj, index) => (
          <Comment
            user={props.user}
            data={obj}
            key={`${index}_${obj.id}`}
            child={[]}
            onReply={props.onReply}
            onDelete={props.onDelete}
          />
        ))}
        {requesting ? (
          <ActivityIndicator size="small" color={AppColors.secondary} />
        ) : null}
      </View>
    );
  };

  return (
    <View style={Styles.commentBloc}>
      <View style={Styles.commentContent}>
        {userAvatar()}
        <View style={Styles.contentBloc}>
          <View style={Styles.topBloc}>
            <Text style={Styles.userName}>{props.data.hoTen}</Text>
            {_canDelete() ? (
              <TouchableOpacity activeOpacity={1} onPress={_onDelete}>
                <View style={Styles.buttonReply}>
                  <AwesomeIcon name={'trash'} size={16} color={AppColors.red} />
                </View>
              </TouchableOpacity>
            ) : null}
          </View>
          <HyperText
            style={Styles.messageText}
            linkColor={AppColors.secondary2}>
            {props.data.noiDung}
          </HyperText>
          <View style={Styles.bottomBloc}>
            <Text style={Styles.timeText}>
              {moment(props.data.createTime).format('DD/MM/YYYY HH:mm')}
            </Text>
            {props.data.duyet ? (
              <TouchableOpacity activeOpacity={1} onPress={_onReply}>
                <View style={Styles.buttonReply}>
                  <AwesomeIcon
                    name={'reply'}
                    size={16}
                    color={AppColors.black}
                  />
                  <Text style={Styles.buttonReplyText}>Reply</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <Text style={Styles.notAcceptText}>
                {AppLang.screens.news.waitingAccept}
              </Text>
            )}
          </View>
        </View>
      </View>
      {props.data.child > 0 ? _renderChild() : null}
    </View>
  );
};

export default CommentsView;
