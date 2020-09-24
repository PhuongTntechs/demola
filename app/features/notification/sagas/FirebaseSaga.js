import {put, select} from 'redux-saga/effects';
import * as actions from '../actions';
import messaging from '@react-native-firebase/messaging';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import {Platform} from 'react-native';
import * as RootNavigation from '../../../navigation/RootNavigation';

const getAuthState = (state) => state.AuthReducer;

export function* registerID() {
  try {
    const authStatus = yield messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      //PushNotification.cancelAllLocalNotifications();
      const token = yield messaging().getToken();
      console.log('registerID', token);
      PushNotification.configure({
        onRegister: function (token) {
          console.log('TOKEN: ', token);
        },
        // (required) Called when a remote is received or opened, or local notification is opened
        onNotification: function (notification) {
          if (Platform.OS === 'ios' || notification.userInteraction) {
            handleOpenNotification(notification);
          }
          // (required) Called when a remote is received or opened, or local notification is opened
          notification.finish(PushNotificationIOS.FetchResult.NoData);
        },
        permissions: {
          alert: true,
          badge: true,
          sound: true,
        },
        requestPermissions: true,
        popInitialNotification: true,
      });
      const {user} = yield select(getAuthState);
      if (user && user.maNS) {
        yield messaging().subscribeToTopic(user.maNS);
      }
      if (user && user.isNhanVien) {
        yield messaging().subscribeToTopic('internal_documents');
      }
      messaging().onMessage(async (remoteMessage) => {
        console.log('A new FCM message arrived!', remoteMessage);
        showLocalMessage(remoteMessage);
      });
      messaging().setBackgroundMessageHandler(async (remoteMessage) => {
        console.log('Message handled in the background!', remoteMessage);
        showLocalMessage(remoteMessage);
      });
      messaging().onNotificationOpenedApp((remoteMessage) => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
      });
      const remoteMessage = yield messaging().getInitialNotification();
      if (remoteMessage) {
        handleOpenNotification(remoteMessage);
      }
      /*
      PushNotification.localNotificationSchedule({
        //... You can use all the options from localNotifications
        soundName: 'default',
        message: 'My Notification Message', // (required)
        date: new Date(Date.now() + 5000), // in 5 secs
        //repeatType: 'time',
        //repeatTime: 15000,
      });
       */
    }
  } catch (e) {
    console.log(e);
  }
}

function showLocalMessage(remoteMessage) {
  try {
    const {notification, data} = remoteMessage;
    if (Platform.OS === 'android') {
      PushNotification.localNotification({
        userInfo: data,
        title: notification.title,
        message: notification.message,
        soundName: 'default',
        largeIcon: '',
        smallIcon: '',
        priority: 'high',
        importance: 'high',
        ignoreInForeground: false,
      });
      return;
    }
    const {title, body} = notification;
    PushNotificationIOS.presentLocalNotification({
      alertTitle: title,
      alertBody: body,
      soundName: 'default',
      isSilent: false,
      userInfo: data,
    });
  } catch (e) {
    console.log(e);
  }
}

function handleOpenNotification(notification) {
  console.log('NOTIFICATION OPENED: ', notification);
  const {data} = notification;
  if (data && data.data) {
    const dataObj = JSON.parse(data.data);
    if (dataObj.type === 'vbnb') {
      RootNavigation.navigate('DocumentDetails', {data: dataObj});
    } else if (dataObj.type === 'todo') {
      const obj = {id: dataObj.id, tenCongViec: dataObj.tenCongViec};
      RootNavigation.navigate('TodoDetails', {notiData: obj});
    }
  }
}

export function* deRegisterID() {
  try {
    const {user} = yield select(getAuthState);
    if (user && user.maNS) {
      yield messaging().unsubscribeFromTopic(user.maNS);
    }
    yield messaging().unsubscribeFromTopic('internal_documents');
    if (Platform.OS === 'ios') {
      PushNotificationIOS.removeAllDeliveredNotifications();
    }
  } catch (e) {
    console.log(e);
  }
}
