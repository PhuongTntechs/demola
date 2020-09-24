import {Dimensions, Platform, StyleSheet} from 'react-native';
import AppValues from '../../../../config/values';
import AppColors from '../../../../config/colors';
import pixel from '../../../../lib/pixel';

function getTopHeight() {
  const dimen = Dimensions.get('window');
  if (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 812 ||
      dimen.width === 812 ||
      dimen.height === 896 ||
      dimen.width === 896)
  ) {
    return 32;
  }
  return 0;
}

const Styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.white,
    position: 'absolute',
    top: getTopHeight(),
    left: AppValues.padding,
    right: AppValues.padding,
    padding: AppValues.padding,
    borderRadius: AppValues.padding / 2,
  },
  message: {
    textAlign: 'center',
  },
  buttons: {
    paddingHorizontal: AppValues.padding * 1.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: AppValues.padding / 2,
  },
  button: {
    width: pixel(80),
    height: pixel(35),
  },
  buttonText: {
    fontSize: pixel(14),
  },
});

export default Styles;
