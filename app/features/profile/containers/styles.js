import {StyleSheet} from 'react-native';
import AppColors from '../../../config/colors';
import AppValues from '../../../config/values';
import pixel from '../../../lib/pixel';
import AppFonts from '../../../config/fonts';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  content: {
    flex: 1,
    padding: AppValues.padding,
    backgroundColor: AppColors.white,
  },
  flex: {
    flex: 1,
  },
  inputBloc: {
    marginBottom: AppValues.padding,
  },
  buttonResend: {
    marginBottom: AppValues.padding,
  },
  rowInfo: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: AppValues.padding / 2,
    borderWidth: 1,
    borderColor: AppColors.lightGrey,
    borderRadius: pixel(5),
    marginBottom: AppValues.padding / 2,
  },
  rowInfoLeft: {
    width: 110,
  },
  rowInfoRight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  labelText: {
    ...AppFonts.regular,
    fontSize: pixel(15),
  },
  buttonVerify: {
    alignItems: 'center',
    marginLeft: 10,
  },
  verifyText: {
    ...AppFonts.regular,
    fontSize: pixel(15),
    color: AppColors.secondary2,
  },
});

export default Styles;
