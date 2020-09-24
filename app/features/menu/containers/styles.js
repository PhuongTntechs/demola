import {StyleSheet} from 'react-native';
import AppColors from '../../../config/colors';
import pixel from '../../../lib/pixel';
import AppValues from '../../../config/values';
import AppFonts from '../../../config/fonts';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  content: {
    flex: 1,
    backgroundColor: AppColors.white,
    padding: AppValues.padding,
    //paddingTop: 0,
  },
  flex: {
    flex: 1,
  },
  profileBloc: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: pixel(50),
    height: pixel(50),
    borderRadius: pixel(25),
    //borderWidth: 1,
    borderColor: AppColors.secondary,
    overflow: 'hidden',
  },
  profileInfo: {
    flex: 1,
    height: pixel(50),
    justifyContent: 'space-between',
    paddingLeft: AppValues.padding / 2,
  },
  fullName: {
    ...AppFonts.bold,
    color: AppColors.primary,
    fontSize: pixel(16),
  },
  maNhanSu: {
    ...AppFonts.medium,
    color: AppColors.primary,
    fontSize: pixel(16),
  },
  buttonLogout: {
    marginTop: AppValues.padding * 2,
  },
  versionBloc: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: AppValues.padding,
    paddingBottom: AppValues.padding / 2,
  },
  buttonItem: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: pixel(20),
  },
  itemInfo: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  itemIconBloc: {
    width: pixel(30),
  },
  labelItem: {
    ...AppFonts.medium,
    fontSize: pixel(16),
    color: AppColors.black,
    marginLeft: pixel(10),
  },
});

export default Styles;
