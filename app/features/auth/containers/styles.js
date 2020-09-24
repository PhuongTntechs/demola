import {StyleSheet} from 'react-native';
import AppValues from '../../../config/values';
import AppColors from '../../../config/colors';
import pixel from '../../../lib/pixel';
import AppStyles from '../../../config/styles';
import hexToRgba from 'hex-to-rgba';
import AppFonts from '../../../config/fonts';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  content: {
    flex: 1,
    backgroundColor: AppColors.white,
    paddingLeft: AppValues.padding,
    paddingRight: AppValues.padding,
  },
  logoBloc: {
    marginTop: AppValues.padding,
    marginBottom: AppValues.padding,
    alignItems: 'center',
  },
  appLogo: {
    width: pixel(200),
    height: pixel(100),
  },
  pageTitleBloc: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: AppValues.padding,
    marginBottom: AppValues.padding * 2,
  },
  pageTitleTextWithBloc: {
    ...AppStyles.pageTitle,
    textAlign: 'center',
  },
  pageTitle: {
    ...AppStyles.pageTitle,
    textAlign: 'center',
    marginTop: AppValues.padding,
    marginBottom: AppValues.padding * 2,
  },
  buttonBack: {
    width: 30,
    height: 30,
  },
  inputBloc: {
    marginBottom: AppValues.padding,
  },
  versionBloc: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  versionText: {
    textAlign: 'center',
  },
  pinContainer: {
    width: '100%',
    marginBottom: AppValues.padding,
  },
  pinCellStyle: {
    flex: 1,
    borderColor: hexToRgba(AppColors.primary, 0.5),
    borderWidth: 1,
    borderRadius: pixel(5),
  },
  pinCellFocusedStyle: {
    borderColor: AppColors.accent,
  },
  pinTextStyle: {
    ...AppFonts.medium,
    fontSize: pixel(28),
    color: AppColors.primary,
  },
  resetNoteBloc: {
    alignItems: 'center',
    marginTop: AppValues.padding * 1.5,
  },
  resetNoteText: {
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default Styles;
