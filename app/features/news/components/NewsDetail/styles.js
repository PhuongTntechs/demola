import {StyleSheet} from 'react-native';
import AppColors from '../../../../config/colors';
import AppFonts from '../../../../config/fonts';
import pixel from '../../../../lib/pixel';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  titleText: {
    ...AppFonts.bold,
    fontSize: pixel(17),
    color: AppColors.primary,
    textAlign: 'center',
  },
  subTitle: {
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
  noiDungText: {
    ...AppFonts.regular,
    fontSize: pixel(16),
    color: AppColors.black,
  },
  bottom: {
    borderTopWidth: 0.5,
    borderTopColor: AppColors.lightGray,
    paddingVertical: pixel(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: pixel(10),
  },
});

export default Styles;
