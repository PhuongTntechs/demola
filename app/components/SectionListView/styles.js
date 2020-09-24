import {StyleSheet} from 'react-native';
import pixel from '../../lib/pixel';
import AppColors from '../../config/colors';
import AppFonts from '../../config/fonts';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  indicator: {
    marginBottom: pixel(20),
    marginTop: pixel(10),
  },
  separator: {
    height: pixel(20),
  },
  listEmpty: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: pixel(20),
  },
  listEmptyText: {
    ...AppFonts.italic,
    color: AppColors.black,
  },
  headerSection: {
    backgroundColor: AppColors.disable,
    padding: pixel(20),
    paddingBottom: pixel(10),
    paddingTop: pixel(10),
    marginBottom: pixel(10),
  },
});

export default Styles;
