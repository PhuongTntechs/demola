import {StyleSheet} from 'react-native';
import AppColors from '../../../config/colors';
import pixel from '../../../lib/pixel';
import AppValues from '../../../config/values';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  flex: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: AppColors.white,
    padding: AppValues.padding,
  },
  flatList: {
    backgroundColor: AppColors.disable,
  },
  separator: {
    height: pixel(10),
  },
  replyBloc: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default Styles;
