import {StyleSheet} from 'react-native';
import pixel from '../../lib/pixel';
import AppValues from '../../config/values';
import AppFonts from '../../config/fonts';

const Styles = StyleSheet.create({
  container: {
    height: 60, //pixel(60),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    paddingLeft: AppValues.padding,
    paddingRight: AppValues.padding,
  },
  headerTitle: {
    ...AppFonts.bold,
    fontSize: pixel(18),
  },
  navLeft: {
    alignItems: 'flex-start',
  },
  navRight: {
    alignItems: 'flex-end',
  },
});

export default Styles;
