import {StyleSheet} from 'react-native';
import AppFonts from '../../../../config/fonts';
import pixel from '../../../../lib/pixel';
import AppColors from '../../../../config/colors';
import AppValues from '../../../../config/values';

const Styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.white,
  },
  content: {
    flex: 1,
    padding: AppValues.padding,
  },
  title: {
    ...AppFonts.bold,
    fontSize: pixel(17),
    color: AppColors.primary,
  },
  subHeader: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: pixel(10),
    marginBottom: pixel(10),
  },
  subText: {
    ...AppFonts.regular,
    fontSize: pixel(12),
    color: AppColors.deepGrey,
  },
  bottom: {
    borderTopWidth: 0.5,
    borderTopColor: AppColors.lightGray,
    paddingVertical: pixel(10),
    paddingHorizontal: AppValues.padding,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default Styles;
