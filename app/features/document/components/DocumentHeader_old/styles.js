import {StyleSheet} from 'react-native';
import pixel from '../../../../lib/pixel';
import AppValues from '../../../../config/values';
import AppFonts from '../../../../config/fonts';
import AppColors from '../../../../config/colors';

const Styles = StyleSheet.create({
  container: {
    height: 60, //pixel(60),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: AppColors.secondary2,
    paddingLeft: AppValues.padding,
    paddingRight: AppValues.padding,
    elevation: 5,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  headerTitle: {
    ...AppFonts.bold,
    fontSize: pixel(18),
    color: AppColors.white,
    textAlign: 'center',
  },
  navLeft: {
    width: pixel(30),
  },
  searchInput: {
    flex: 1,
    borderWidth: 0.5,
    marginTop: pixel(5),
    marginBottom: pixel(10),
  },
});

export default Styles;
