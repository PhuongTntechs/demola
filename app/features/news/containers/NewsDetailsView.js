import React from 'react';
import Styles from './styles';
import {KeyboardAvoidingView, Platform, ScrollView, View} from 'react-native';
import DetailNormal from '../components/NewsDetail/DetailNormal';
import CommentsView from '../components/CommentsView';
import ReplyNews from '../components/ReplyNews';

type Props = {
  NewsDetailsReducer: any,
  route: any,
  getNewsDetail: void,
  onChangeRateDetail: void,
  getComments: void,
  getChildComments: void,
  addComment: void,
  deleteComment: void,
};

type State = {
  detail: any,
};

export default class NewsDetailsView extends React.Component<Props, State> {
  state = {
    detail: null,
    comments: [],
    childComments: {},
  };

  componentDidMount(): void {
    const {id} = this.props.route.params.news;
    this.props.getNewsDetail(id, this._setDetail);
    this.props.getComments(id, false);
  }

  _setDetail = (detail) => this.setState({detail});

  _onChangeRate = (rate) => {
    const {id} = this.props.route.params.news;
    const {detail} = this.state;
    this.props.onChangeRateDetail(id, rate, () => {
      const detailObj = {...detail, rate};
      this.setState({detail: detailObj});
    });
  };

  _onScroll = ({nativeEvent}) => {
    const {contentOffset, layoutMeasurement, contentSize} = nativeEvent;
    if (contentOffset.y + layoutMeasurement.height >= contentSize.height) {
      const {id} = this.props.route.params.news;
      this.props.getComments(id, true);
    }
  };

  _getChildComment = (id, onSuccess) =>
    this.props.getChildComments(id, onSuccess);

  _onReply = (parent) => {
    if (this._setParentReply) {
      this._setParentReply(parent);
    }
  };

  _onDelete = (comment) => this.props.deleteComment(comment);

  _sendMessage = (message, onSuccess) => {
    const {id} = this.props.route.params.news;
    const data = {
      ...message,
      tinTucID: id,
    };
    this.props.addComment(data, onSuccess);
  };

  render() {
    const {detail} = this.state;
    if (!detail) {
      return <View style={Styles.container} />;
    }
    let content = null;
    if (detail.loai === 0) {
      content = (
        <DetailNormal data={detail} onChangeRate={this._onChangeRate} />
      );
    }
    const {comments, childComments} = this.props.NewsDetailsReducer;
    return (
      <KeyboardAvoidingView
        //keyboardVerticalOffset={100}
        style={Styles.flex}
        enabled={Platform.OS === 'ios'}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={Styles.container}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={0}
            onScroll={this._onScroll}>
            <View style={Styles.content}>
              {content}
              <CommentsView
                data={comments.results ?? []}
                user={this.props.AuthReducer.user ?? {}}
                child={childComments}
                onGetChild={this._getChildComment}
                onReply={this._onReply}
                onDelete={this._onDelete}
              />
            </View>
          </ScrollView>
          <ReplyNews
            setParent={(c) => {
              this._setParentReply = c;
            }}
            sendMessage={this._sendMessage}
            user={this.props.AuthReducer.user ?? {}}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}
