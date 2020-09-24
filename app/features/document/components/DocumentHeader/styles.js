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
    //justifyContent: 'space-between',
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
  defaultNavButton: {
    width: pixel(35),
  },
  titleBlock: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: AppValues.padding,
    paddingRight: AppValues.padding,
  },
  headerTitle: {
    ...AppFonts.bold,
    fontSize: pixel(18),
    color: AppColors.white,
    marginHorizontal: pixel(5),
  },
  navLeft: {
    alignItems: 'flex-start',
  },
  navRight: {
    alignItems: 'flex-end',
  },
  searchBloc: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.white,
    marginHorizontal: AppValues.padding / 2,
    borderRadius: pixel(5),
    height: pixel(32),
    paddingRight: pixel(5),
  },
  searchInput: {
    flex: 1,
    height: pixel(32),
    backgroundColor: AppColors.white,
    borderRadius: pixel(5),
    paddingHorizontal: pixel(5),
    paddingVertical: 0,
  },
  buttonClose: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.lightGrey,
    borderRadius: pixel(8),
    width: pixel(16),
    height: pixel(16),
  },
});

export default Styles;
