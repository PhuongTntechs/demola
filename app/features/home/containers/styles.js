import {StyleSheet} from 'react-native';
import AppColors from '../../../config/colors';
import {hdp, wdp} from '../../../lib/responsive';
import pixel from '../../../lib/pixel';
import AppFonts from '../../../config/fonts';
import AppValues from '../../../config/values';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.grey1,
  },
  flex: {
    flex: 1,
  },
  welcomeHeader: {
    width: wdp(100),
    height: hdp(30),
  },
  userBloc: {
    height: hdp(25),
    alignItems: 'center',
    justifyContent: 'center',
  },
  userAvatar: {
    width: pixel(80),
    height: pixel(80),
    borderRadius: pixel(40),
    //borderWidth: 1,
    borderColor: AppColors.secondary,
    overflow: 'hidden',
    backgroundColor: AppColors.disable,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: pixel(5),
    left: pixel(28),
    width: pixel(24),
    height: pixel(24),
    zIndex: 10,
  },
  userName: {
    ...AppFonts.bold,
    color: AppColors.white,
    fontSize: pixel(17),
    marginTop: pixel(10),
  },
  userCode: {
    ...AppFonts.medium,
    color: AppColors.white,
    fontSize: pixel(17),
    marginTop: pixel(5),
  },
  content: {
    flex: 1,
    padding: AppValues.padding,
    paddingTop: 0,
  },
  row: {
    flexDirection: 'row',
    marginBottom: AppValues.padding,
    justifyContent: 'space-between',
  },
  list: {
    flex: 1,
    borderWidth: 1,
    minHeight: hdp(70),
    paddingTop: 0,
    backgroundColor: AppColors.nothing,
  },
  separator: {
    height: AppValues.padding,
  },
  oddFunc: {
    marginLeft: AppValues.padding,
  },
});

export default Styles;
