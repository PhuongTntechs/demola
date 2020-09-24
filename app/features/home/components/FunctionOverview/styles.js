import {StyleSheet} from 'react-native';
import {hdp, wdp} from '../../../../lib/responsive';
import pixel from '../../../../lib/pixel';
import AppValues from '../../../../config/values';
import AppColors from '../../../../config/colors';
import AppFonts from '../../../../config/fonts';

const Styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: AppColors.white,
    width: wdp(50) - pixel(30),
    height: hdp(22),
    padding: AppValues.padding,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: AppValues.padding / 3,
    elevation: 1,
    shadowOpacity: 0.3,
    shadowRadius: 1,
    shadowColor: AppColors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  label: {
    ...AppFonts.bold,
    fontSize: pixel(16),
    color: AppColors.primary,
    textAlign: 'center',
  },
});

export default Styles;
